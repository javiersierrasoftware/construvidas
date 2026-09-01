import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
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
    const responses = await SurveyResponse.find({ surveyId: id }).sort({ createdAt: -1 });

    return NextResponse.json(responses);
  } catch (error: any) {
    return NextResponse.json({ message: "Error al obtener las respuestas", error: error.message }, { status: 500 });
  }
}
