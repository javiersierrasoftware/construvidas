import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Course from "@/models/Course";
import CourseEnrollment from "@/models/CourseEnrollment";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { sendCourseReminderEmail, SITE_URL } from "@/lib/mail";

// POST /api/admin/courses/[id]/notify
export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== "ADMIN") {
      return NextResponse.json(
        { message: "Acceso no autorizado" },
        { status: 403 }
      );
    }

    await connectDB();
    const { subject, message } = await req.json();

    if (!subject || !message) {
      return NextResponse.json(
        { message: "El asunto y el mensaje son obligatorios." },
        { status: 400 }
      );
    }

    const course = await Course.findById(id);
    if (!course) {
      return NextResponse.json(
        { message: "El curso no existe." },
        { status: 404 }
      );
    }

    // Query enrolled students
    const enrollments = await CourseEnrollment.find({ courseId: course._id })
      .populate("userId", "name email")
      .lean();

    const courseUrl = `${SITE_URL}/cursos/${course._id}`;

    let sentCount = 0;
    enrollments.forEach((e: any) => {
      if (e.userId?.email) {
        sentCount += 1;
        sendCourseReminderEmail({
          to: e.userId.email,
          name: e.userId.name || "Discípulo",
          courseTitle: course.title,
          subject,
          message,
          courseUrl,
        }).catch((err) => console.error("Error sending course notification:", err));
      }
    });

    return NextResponse.json({
      message: `Notificación enviada a ${sentCount} estudiantes inscritos.`,
      sentCount,
    });
  } catch (error: any) {
    console.error("🔴 Error POST /api/admin/courses/[id]/notify:", error);
    return NextResponse.json(
      { message: "Error al enviar notificaciones", error: error.message },
      { status: 500 }
    );
  }
}
