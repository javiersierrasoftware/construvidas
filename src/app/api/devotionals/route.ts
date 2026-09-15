import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Devotional from "@/models/Devotional";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { generateSlug } from "@/lib/slugs";
import { sendNewDevotionalEmail, SITE_URL } from "@/lib/mail";

// GET /api/devotionals
export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const adminMode = searchParams.get("admin") === "true";
    const limit = searchParams.get("limit") ? parseInt(searchParams.get("limit")!) : 20;

    const query: any = {};
    if (!adminMode) {
      query.isPublished = true;
      query.publishDate = { $lte: new Date() };
    }

    const devotionals = await Devotional.find(query)
      .sort({ publishDate: -1 })
      .limit(limit)
      .lean();

    return NextResponse.json(devotionals);
  } catch (error: any) {
    console.error("🔴 Error GET /api/devotionals:", error);
    return NextResponse.json(
      { message: "Error al obtener devocionales", error: error.message },
      { status: 500 }
    );
  }
}

// POST /api/devotionals (Admin only)
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== "ADMIN") {
      return NextResponse.json(
        { message: "Acceso no autorizado" },
        { status: 403 }
      );
    }

    await connectDB();
    const body = await req.json();

    const {
      title,
      publishDate,
      bibleVerse,
      reflection,
      prayer,
      author,
      coverImage,
      isPublished,
    } = body;

    if (!title || !reflection || !bibleVerse?.reference || !bibleVerse?.text) {
      return NextResponse.json(
        { message: "El título, pasaje bíblico y reflexión son obligatorios." },
        { status: 400 }
      );
    }

    let slug = generateSlug(title);
    const existing = await Devotional.findOne({ slug });
    if (existing) {
      slug = `${slug}-${Date.now().toString().slice(-4)}`;
    }

    const newDevotional = await Devotional.create({
      title,
      slug,
      publishDate: publishDate ? new Date(publishDate) : new Date(),
      bibleVerse,
      reflection,
      prayer: prayer || "",
      author: author || "Equipo Pastoral CONSTRUVIDAS",
      coverImage: coverImage || undefined,
      isPublished: isPublished ?? true,
    });

    // Send email notification to all registered users if published (non-blocking)
    if (newDevotional.isPublished) {
      const devotionalUrl = `${SITE_URL}/devocionales/${newDevotional._id}`;
      const reflectionSnippet = reflection.length > 250 ? reflection.slice(0, 250) + "..." : reflection;

      User.find({ email: { $exists: true, $ne: "" } })
        .select("name email")
        .lean()
        .then((users: any[]) => {
          users.forEach((u) => {
            sendNewDevotionalEmail({
              to: u.email,
              name: u.name || "Discípulo",
              title,
              reference: bibleVerse.reference,
              verseText: bibleVerse.text,
              reflectionSnippet,
              devotionalUrl,
            }).catch((err) => console.error("Error broadcast email devotional:", err));
          });
        })
        .catch(console.error);
    }

    return NextResponse.json(newDevotional, { status: 201 });
  } catch (error: any) {
    console.error("🔴 Error POST /api/devotionals:", error);
    return NextResponse.json(
      { message: "Error al crear devocional", error: error.message },
      { status: 500 }
    );
  }
}
