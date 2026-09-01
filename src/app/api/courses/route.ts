import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Course from "@/models/Course";
import CourseEnrollment from "@/models/CourseEnrollment";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { slugify } from "@/lib/slugs";

// GET /api/courses
export async function GET(req: Request) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);

    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const adminMode = searchParams.get("admin") === "true";

    const query: any = {};
    if (!adminMode) {
      query.isPublished = true;
    }
    if (category && category !== "Todos") {
      query.category = category;
    }

    const courses = await Course.find(query).sort({ createdAt: -1 }).lean();

    // If user is logged in, attach user's enrollment info
    let enrollmentsMap: Record<string, any> = {};
    if (session?.user?.id) {
      const enrollments = await CourseEnrollment.find({
        userId: session.user.id,
      }).lean();

      enrollments.forEach((e: any) => {
        enrollmentsMap[e.courseId.toString()] = {
          enrolled: true,
          progressPercent: e.progressPercent || 0,
          status: e.status,
          completedLessons: e.completedLessons || [],
        };
      });
    }

    const coursesWithEnrollment = courses.map((course: any) => {
      const courseIdStr = course._id.toString();
      const userEnrollment = enrollmentsMap[courseIdStr] || null;

      // Count total lessons
      let totalLessons = 0;
      if (course.modules) {
        course.modules.forEach((mod: any) => {
          totalLessons += mod.lessons ? mod.lessons.length : 0;
        });
      }

      return {
        ...course,
        totalLessons,
        userEnrollment,
      };
    });

    return NextResponse.json(coursesWithEnrollment);
  } catch (error: any) {
    console.error("🔴 Error GET /api/courses:", error);
    return NextResponse.json(
      { message: "Error al obtener los cursos", error: error.message },
      { status: 500 }
    );
  }
}

// POST /api/courses (Admin only)
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== "ADMIN") {
      return NextResponse.json(
        { message: "Acceso no autorizado. Se requiere rol de Administrador." },
        { status: 403 }
      );
    }

    await connectDB();
    const body = await req.json();

    const { title, description, coverImage, category, level, isPublished, modules } = body;

    if (!title || !description) {
      return NextResponse.json(
        { message: "El título y la descripción son obligatorios." },
        { status: 400 }
      );
    }

    let slug = slugify(title);
    // Ensure unique slug
    const existing = await Course.findOne({ slug });
    if (existing) {
      slug = `${slug}-${Date.now().toString().slice(-4)}`;
    }

    const newCourse = await Course.create({
      title,
      slug,
      description,
      coverImage: coverImage || undefined,
      category: category || "Fundamentos",
      level: level || "Principiante",
      isPublished: isPublished ?? true,
      modules: modules || [],
    });

    return NextResponse.json(newCourse, { status: 201 });
  } catch (error: any) {
    console.error("🔴 Error POST /api/courses:", error);
    return NextResponse.json(
      { message: "Error al crear el curso", error: error.message },
      { status: 500 }
    );
  }
}
