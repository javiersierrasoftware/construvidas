import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Devotional from "@/models/Devotional";

// GET /api/devotionals/today
export async function GET() {
  try {
    await connectDB();

    let todayDevotional = await Devotional.findOne({
      isPublished: true,
      publishDate: { $lte: new Date() },
    })
      .sort({ publishDate: -1 })
      .lean();

    if (!todayDevotional) {
      // Seed initial devotional if none exists
      const count = await Devotional.countDocuments();
      if (count === 0) {
        const defaultDevotional = await Devotional.create({
          title: "Confianza Imparable en la Promesa de Dios",
          slug: "confianza-imparable-en-la-promesa-de-dios",
          publishDate: new Date(),
          bibleVerse: {
            reference: "Proverbios 3:5-6",
            text: "Fíate de Jehová de todo tu corazón, y no te apoyes en tu propia prudencia. Reconócelo en todos tus caminos, y él enderezará tus veredas.",
          },
          reflection: "En los momentos de incertidumbre, la tendencia natural del ser humano es apoyarse en sus propios razonamientos y temores. Sin embargo, Dios nos hace un llamado supremo a descansar por completo en Su amor incondicional y Su soberanía. Entregarle nuestras decisiones diarias activa Su dirección perfecta sobre nuestras vidas.",
          prayer: "Padre Celestial, hoy entrego todas mis cargas, planes y dudas en tus manos. Renuncio a apoyarme en mi propia prudencia y declaro que tú guías cada uno de mis pasos en paz. En el nombre de Jesús, Amén.",
          author: "Pastor Principal - CONSTRUVIDAS",
          coverImage: "https://images.unsplash.com/photo-1507692049790-de58290a4334?q=80&w=1200&auto=format&fit=crop",
          isPublished: true,
        });

        todayDevotional = defaultDevotional.toObject();
      }
    }

    return NextResponse.json(todayDevotional || null);
  } catch (error: any) {
    console.error("🔴 Error GET /api/devotionals/today:", error);
    return NextResponse.json(
      { message: "Error al obtener el devocional del día", error: error.message },
      { status: 500 }
    );
  }
}
