import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Survey from "@/models/Survey";
import SurveyResponse from "@/models/SurveyResponse";
import { isValidObjectId } from "mongoose";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    if (!isValidObjectId(id)) {
      return NextResponse.json({ message: "ID no válido" }, { status: 400 });
    }

    await connectDB();
    const survey = await Survey.findById(id);

    if (!survey || !survey.active) {
      return NextResponse.json({ message: "Encuesta no disponible" }, { status: 404 });
    }

    const { answers } = await req.json();

    if (!answers || !Array.isArray(answers)) {
      return NextResponse.json({ message: "Respuestas no válidas" }, { status: 400 });
    }

    const newResponse = new SurveyResponse({
      surveyId: id,
      answers
    });

    await newResponse.save();

    return NextResponse.json({ message: "Respuesta enviada correctamente" }, { status: 201 });
  } catch (error: any) {
    console.error("Error submitting survey response:", error);
    return NextResponse.json({ message: "Error al enviar la respuesta", error: error.message }, { status: 500 });
  }
}
