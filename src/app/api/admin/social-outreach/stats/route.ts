import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Donation from "@/models/Donation";
import Expense from "@/models/Expense";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== "ADMIN") {
        return NextResponse.json({ message: "No autorizado" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const month = parseInt(searchParams.get("month") || (new Date().getMonth() + 1).toString());
    const year = parseInt(searchParams.get("year") || new Date().getFullYear().toString());

    await connectDB();

    // Current month data
    const donations = await Donation.find({ month, year }).populate("donorId", "name").sort({ date: -1 });
    const expenses = await Expense.find({ month, year }).sort({ date: -1 });

    const totalDonations = donations.reduce((acc, d) => acc + d.amount, 0);
    const totalExpenses = expenses.reduce((acc, e) => acc + e.amount, 0);

    // Previous month total for trends
    let prevMonth = month - 1;
    let prevYear = year;
    if (prevMonth === 0) {
      prevMonth = 12;
      prevYear--;
    }
    
    const prevDonationsRaw = await Donation.find({ month: prevMonth, year: prevYear });
    const prevTotalDonations = prevDonationsRaw.reduce((acc, d) => acc + d.amount, 0);

    // Total Global Balance (Historical)
    const allDonations = await Donation.find({});
    const allExpenses = await Expense.find({});

    const globalIncome = allDonations.reduce((acc, d) => acc + d.amount, 0);
    const globalOutflow = allExpenses.reduce((acc, e) => acc + e.amount, 0);

    return NextResponse.json({
      totalDonations,
      totalExpenses,
      prevTotalDonations,
      balance: globalIncome - globalOutflow, // Global balance
      donations,
      expenses
    });
  } catch (error: any) {
    console.error("Stats error:", error);
    return NextResponse.json({ message: "Error al obtener estadísticas", error: error.message }, { status: 500 });
  }
}
