import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Survey from "@/models/Survey";
import SurveyResponse from "@/models/SurveyResponse";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { isValidObjectId } from "mongoose";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== "ADMIN") {
      return NextResponse.json({ message: "No autorizado" }, { status: 401 });
    }

    const { id } = await params;
    if (!isValidObjectId(id)) {
      return NextResponse.json({ message: "ID no válido" }, { status: 400 });
    }

    await connectDB();
    const survey = await Survey.findById(id);

    if (!survey) {
      return NextResponse.json({ message: "Encuesta no encontrada" }, { status: 404 });
    }

    // Get responses count as well
    const responseCount = await SurveyResponse.countDocuments({ surveyId: id });

    return NextResponse.json({ ...survey.toObject(), responseCount });
  } catch (error: any) {
    return NextResponse.json({ message: "Error al obtener la encuesta", error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== "ADMIN") {
      return NextResponse.json({ message: "No autorizado" }, { status: 401 });
    }

    const { id } = await params;
    const data = await req.json();

    await connectDB();
    const updatedSurvey = await Survey.findByIdAndUpdate(id, data, { new: true });

    if (!updatedSurvey) {
      return NextResponse.json({ message: "Encuesta no encontrada" }, { status: 404 });
    }

    return NextResponse.json(updatedSurvey);
  } catch (error: any) {
    return NextResponse.json({ message: "Error al actualizar la encuesta", error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== "ADMIN") {
      return NextResponse.json({ message: "No autorizado" }, { status: 401 });
    }

    const { id } = await params;
    await connectDB();
    
    // Also delete responses? Usually yes.
    await SurveyResponse.deleteMany({ surveyId: id });
    const deletedSurvey = await Survey.findByIdAndDelete(id);

    if (!deletedSurvey) {
      return NextResponse.json({ message: "Encuesta no encontrada" }, { status: 404 });
    }

    return NextResponse.json({ message: "Encuesta y sus respuestas eliminadas" });
  } catch (error: any) {
    return NextResponse.json({ message: "Error al eliminar la encuesta", error: error.message }, { status: 500 });
  }
}
