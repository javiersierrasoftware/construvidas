import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Donation from "@/models/Donation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== "ADMIN") {
      return NextResponse.json({ message: "No autorizado" }, { status: 401 });
    }

    await connectDB();
    const { donorId, amount, type, date } = await req.json();

    if (!donorId || !amount || !date) {
      return NextResponse.json({ message: "Datos incompletos" }, { status: 400 });
    }

    const transactionDate = new Date(date + 'T12:00:00');
    const [y, m] = date.split('-').map(Number);
    const month = m;
    const year = y;

    const newDonation = new Donation({
      donorId,
      amount: Number(amount),
      month,
      year,
      type,
      date: transactionDate,
    });

    await newDonation.save();
    return NextResponse.json(newDonation, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: "Error al registrar donativa", error: error.message }, { status: 500 });
  }
}
