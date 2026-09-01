import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Course from "@/models/Course";
import CourseEnrollment from "@/models/CourseEnrollment";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// GET /api/courses/[id]
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectDB();
    const session = await getServerSession(authOptions);

    // Find by _id or slug
    let course = await Course.findById(id).lean();
    if (!course) {
      course = await Course.findOne({ slug: id }).lean();
    }

    if (!course) {
      return NextResponse.json(
        { message: "Curso no encontrado" },
        { status: 404 }
      );
    }

    let userEnrollment = null;
    if (session?.user?.id) {
      userEnrollment = await CourseEnrollment.findOne({
        userId: session.user.id,
        courseId: course._id,
      }).lean();
    }

    let totalLessons = 0;
    if (course.modules) {
      course.modules.forEach((mod: any) => {
        totalLessons += mod.lessons ? mod.lessons.length : 0;
      });
    }

    return NextResponse.json({
      ...course,
      totalLessons,
      userEnrollment,
    });
  } catch (error: any) {
    console.error("🔴 Error GET /api/courses/[id]:", error);
    return NextResponse.json(
      { message: "Error al obtener el curso", error: error.message },
      { status: 500 }
    );
  }
}

// PUT /api/courses/[id] (Admin only)
export async function PUT(
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
    const body = await req.json();

    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true }
    );

    if (!updatedCourse) {
      return NextResponse.json(
        { message: "Curso no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedCourse);
  } catch (error: any) {
    console.error("🔴 Error PUT /api/courses/[id]:", error);
    return NextResponse.json(
      { message: "Error al actualizar el curso", error: error.message },
      { status: 500 }
    );
  }
}

// DELETE /api/courses/[id] (Admin only)
export async function DELETE(
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
    await Course.findByIdAndDelete(id);
    await CourseEnrollment.deleteMany({ courseId: id });

    return NextResponse.json({ message: "Curso eliminado con éxito" });
  } catch (error: any) {
    console.error("🔴 Error DELETE /api/courses/[id]:", error);
    return NextResponse.json(
      { message: "Error al eliminar el curso", error: error.message },
      { status: 500 }
    );
  }
}
