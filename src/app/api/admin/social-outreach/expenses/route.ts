import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Expense from "@/models/Expense";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== "ADMIN") {
      return NextResponse.json({ message: "No autorizado" }, { status: 401 });
    }

    await connectDB();
    const { description, amount, date } = await req.json();

    if (!description || !amount || !date) {
      return NextResponse.json({ message: "Datos incompletos" }, { status: 400 });
    }

    const transactionDate = new Date(date + 'T12:00:00');
    const [y, m] = date.split('-').map(Number);
    const month = m;
    const year = y;

    const newExpense = new Expense({
      description,
      amount: Number(amount),
      month,
      year,
      date: transactionDate,
    });

    await newExpense.save();
    return NextResponse.json(newExpense, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: "Error al registrar egreso", error: error.message }, { status: 500 });
  }
}
