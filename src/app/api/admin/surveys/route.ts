import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Survey from "@/models/Survey";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== "ADMIN") {
      return NextResponse.json({ message: "No autorizado" }, { status: 401 });
    }

    await connectDB();
    const surveys = await Survey.find({}).sort({ createdAt: -1 });

    return NextResponse.json(surveys);
  } catch (error: any) {
    console.error("Error fetching surveys:", error);
    return NextResponse.json({ message: "Error al obtener las encuestas", error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== "ADMIN") {
      return NextResponse.json({ message: "No autorizado" }, { status: 401 });
    }

    await connectDB();
    const data = await req.json();
    console.log("[!] CREANDO ENCUESTA CON SLUG:", data.slug);

    const newSurvey = new Survey({
      title: data.title,
      description: data.description,
      slug: data.slug || undefined,
      questions: data.questions,
      active: data.active,
      createdBy: (session.user as any).id,
    });

    await newSurvey.save();

    return NextResponse.json(newSurvey, { status: 201 });
  } catch (error: any) {
    console.error("Error creating survey:", error);
    return NextResponse.json({ message: "Error al crear la encuesta", error: error.message }, { status: 500 });
  }
}
