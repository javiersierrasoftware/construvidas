import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import CourseEnrollment from "@/models/CourseEnrollment";
import Course from "@/models/Course";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== "ADMIN") {
      return NextResponse.json(
        { message: "Acceso no autorizado" },
        { status: 403 }
      );
    }

    await connectDB();

    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get("courseId");

    const query: any = {};
    if (courseId) {
      query.courseId = courseId;
    }

    const enrollments = await CourseEnrollment.find(query)
      .populate("userId", "name email discipline goal")
      .populate("courseId", "title category modules")
      .sort({ updatedAt: -1 })
      .lean();

    const result = enrollments.map((e: any) => {
      const course = e.courseId || {};
      let totalLessons = 0;
      if (course.modules) {
        course.modules.forEach((mod: any) => {
          if (mod.lessons) totalLessons += mod.lessons.length;
        });
      }

      return {
        id: e._id.toString(),
        student: e.userId
          ? {
              id: e.userId._id.toString(),
              name: e.userId.name,
              email: e.userId.email,
              discipline: e.userId.discipline,
            }
          : { name: "Usuario Desconocido", email: "" },
        course: {
          id: course._id ? course._id.toString() : "",
          title: course.title || "Curso Eliminado",
          category: course.category || "",
          totalLessons,
        },
        enrolledAt: e.enrolledAt,
        completedLessonsCount: e.completedLessons ? e.completedLessons.length : 0,
        progressPercent: e.progressPercent || 0,
        status: e.status || "EN_PROGRESO",
        quizAnswers: e.quizAnswers || [],
        lastAccessedAt: e.lastAccessedAt || e.updatedAt,
      };
    });

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("🔴 Error GET /api/admin/courses/students:", error);
    return NextResponse.json(
      { message: "Error al obtener seguimiento de estudiantes", error: error.message },
      { status: 500 }
    );
  }
}
