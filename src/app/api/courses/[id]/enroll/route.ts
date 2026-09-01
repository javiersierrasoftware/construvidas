import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Course from "@/models/Course";
import CourseEnrollment from "@/models/CourseEnrollment";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { sendCourseEnrollmentEmail } from "@/lib/mail";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return NextResponse.json(
        { message: "Debes iniciar sesión para inscribirte al curso." },
        { status: 401 }
      );
    }

    await connectDB();

    const course = await Course.findById(id);
    if (!course) {
      return NextResponse.json(
        { message: "El curso solicitado no existe." },
        { status: 404 }
      );
    }

    // Check if already enrolled
    let isNewEnrollment = false;
    let enrollment = await CourseEnrollment.findOne({
      userId: session.user.id,
      courseId: course._id,
    });

    if (!enrollment) {
      isNewEnrollment = true;
      enrollment = await CourseEnrollment.create({
        userId: session.user.id,
        courseId: course._id,
        completedLessons: [],
        progressPercent: 0,
        status: "EN_PROGRESO",
      });
    }

    // Send course enrollment email notification (non-blocking)
    if (isNewEnrollment && session.user.email) {
      const siteUrl = process.env.NEXTAUTH_URL || "https://construvidas.org";
      const courseUrl = `${siteUrl}/cursos/${course._id}`;

      sendCourseEnrollmentEmail({
        to: session.user.email,
        name: session.user.name || "Discípulo",
        courseTitle: course.title,
        courseUrl,
      }).catch((err) => console.error("Error sending course enrollment email:", err));
    }

    return NextResponse.json({
      message: "Inscripción exitosa",
      enrollment,
    });
  } catch (error: any) {
    console.error("🔴 Error POST /api/courses/[id]/enroll:", error);
    return NextResponse.json(
      { message: "Error al inscribirse en el curso", error: error.message },
      { status: 500 }
    );
  }
}
