import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Course from "@/models/Course";
import CourseEnrollment from "@/models/CourseEnrollment";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return NextResponse.json(
        { message: "Debes iniciar sesión para guardar tu progreso." },
        { status: 401 }
      );
    }

    await connectDB();
    const body = await req.json();
    const { lessonId, completed, quizScore, totalQuestions } = body;

    if (!lessonId) {
      return NextResponse.json(
        { message: "Se requiere el ID de la lección/tema." },
        { status: 400 }
      );
    }

    const course = await Course.findById(id);
    if (!course) {
      return NextResponse.json(
        { message: "Curso no encontrado." },
        { status: 404 }
      );
    }

    // Calculate total lessons in course
    let totalLessonsCount = 0;
    if (course.modules) {
      course.modules.forEach((mod: any) => {
        if (mod.lessons) {
          totalLessonsCount += mod.lessons.length;
        }
      });
    }
    if (totalLessonsCount === 0) totalLessonsCount = 1;

    let enrollment = await CourseEnrollment.findOne({
      userId: session.user.id,
      courseId: course._id,
    });

    if (!enrollment) {
      enrollment = await CourseEnrollment.create({
        userId: session.user.id,
        courseId: course._id,
        completedLessons: [],
        progressPercent: 0,
        status: "EN_PROGRESO",
      });
    }

    let completedSet = new Set<string>(
      enrollment.completedLessons ? enrollment.completedLessons.map((l: any) => l.toString()) : []
    );

    if (completed) {
      completedSet.add(lessonId);
    } else if (completed === false) {
      completedSet.delete(lessonId);
    }

    const completedArray = Array.from(completedSet);
    const progressPercent = Math.min(
      100,
      Math.round((completedArray.length / totalLessonsCount) * 100)
    );
    const status = progressPercent === 100 ? "COMPLETADO" : "EN_PROGRESO";

    // Handle quiz scores if provided
    let quizAnswers = enrollment.quizAnswers || [];
    if (quizScore !== undefined && totalQuestions !== undefined) {
      // Remove existing quiz answer for this lesson if present
      quizAnswers = quizAnswers.filter((qa: any) => qa.lessonId !== lessonId);
      quizAnswers.push({
        lessonId,
        score: quizScore,
        totalQuestions,
        completedAt: new Date(),
      });
    }

    enrollment.completedLessons = completedArray;
    enrollment.progressPercent = progressPercent;
    enrollment.status = status;
    enrollment.quizAnswers = quizAnswers;
    enrollment.lastAccessedAt = new Date();

    await enrollment.save();

    return NextResponse.json({
      message: "Progreso guardado correctamente",
      enrollment,
    });
  } catch (error: any) {
    console.error("🔴 Error POST /api/courses/[id]/progress:", error);
    return NextResponse.json(
      { message: "Error al actualizar progreso", error: error.message },
      { status: 500 }
    );
  }
}
