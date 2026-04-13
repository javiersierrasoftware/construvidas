import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Survey from "@/models/Survey";
import { isValidObjectId } from "mongoose";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    if (!isValidObjectId(id)) {
      return NextResponse.json({ message: "ID no válido" }, { status: 400 });
    }

    await connectDB();
    const survey = await Survey.findById(id).select("title description questions active");

    if (!survey) {
      return NextResponse.json({ message: "Encuesta no encontrada" }, { status: 404 });
    }

    if (!survey.active) {
      return NextResponse.json({ message: "Esta encuesta ya no está disponible" }, { status: 403 });
    }

    return NextResponse.json(survey);
  } catch (error: any) {
    return NextResponse.json({ message: "Error al obtener la encuesta", error: error.message }, { status: 500 });
  }
}
