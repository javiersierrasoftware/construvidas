import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Donor from "@/models/Donor";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== "ADMIN") {
      return NextResponse.json({ message: "No autorizado" }, { status: 401 });
    }

    await connectDB();
    const donors = await Donor.find({}).sort({ name: 1 });
    return NextResponse.json(donors);
  } catch (error: any) {
    return NextResponse.json({ message: "Error al obtener donantes", error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== "ADMIN") {
      return NextResponse.json({ message: "No autorizado" }, { status: 401 });
    }

    await connectDB();
    const { name, phone } = await req.json();

    if (!name) return NextResponse.json({ message: "El nombre es obligatorio" }, { status: 400 });

    const newDonor = new Donor({ name, phone });
    await newDonor.save();

    return NextResponse.json(newDonor, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: "Error al crear donante", error: error.message }, { status: 500 });
  }
}
