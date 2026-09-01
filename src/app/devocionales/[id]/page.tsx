"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import {
  Sparkles,
  Calendar,
  Bookmark,
  Heart,
  Share2,
  ArrowLeft,
  Quote,
} from "lucide-react";

export default function SingleDevotionalPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [devotional, setDevotional] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch(`/api/devotionals/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data._id) {
          setDevotional(data);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  const handleShare = () => {
    if (navigator.share && devotional) {
      navigator.share({
        title: devotional.title,
        text: `Devocional CONSTRUVIDAS: "${devotional.title}"`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center pt-20">
        <p className="font-gobold text-slate-400 uppercase tracking-widest">Cargando Devocional...</p>
      </div>
    );
  }

  if (!devotional) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center pt-28 pb-20 px-4">
        <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-4 max-w-md">
          <Sparkles size={48} className="mx-auto text-slate-300" />
          <h2 className="text-2xl font-gobold uppercase text-slate-900">Devocional no encontrado</h2>
          <Link
            href="/devocionales"
            className="inline-block bg-slate-900 text-white font-gobold px-6 py-3 rounded-2xl text-xs uppercase tracking-widest hover:bg-secondary-600 transition"
          >
            Volver a Devocionales
          </Link>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(devotional.publishDate).toLocaleDateString("es-CO", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20 px-4 md:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <Link
          href="/devocionales"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-slate-900 transition uppercase tracking-widest"
        >
          <ArrowLeft size={16} /> Volver a todos los devocionales
        </Link>

        <div className="relative bg-slate-900 text-white rounded-[2.5rem] p-8 md:p-14 overflow-hidden shadow-2xl border border-slate-800 space-y-8">
          <div className="absolute top-0 right-0 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

          {/* BADGE Y FECHA */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary-500/20 border border-secondary-500/30 rounded-full text-secondary-300 text-xs font-gobold uppercase tracking-widest">
              <Sparkles size={16} /> Devocional
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
              <Calendar size={15} className="text-secondary-400" />
              <span className="capitalize">{formattedDate}</span>
            </div>
          </div>

          {/* CONTENIDO */}
          <div className="space-y-8">
            <h1 className="text-3xl md:text-5xl font-gobold uppercase tracking-tight leading-tight text-white">
              {devotional.title}
            </h1>

            {/* VERSÍCULO BÍBLICO */}
            {devotional.bibleVerse && (
              <div className="bg-slate-950/80 border border-slate-800 rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-xl">
                <Quote size={40} className="absolute top-4 right-4 text-slate-800 pointer-events-none" />
                <div className="relative z-10 space-y-3">
                  <span className="text-xs font-gobold text-secondary-400 uppercase tracking-widest flex items-center gap-2">
                    <Bookmark size={16} />
                    {devotional.bibleVerse.reference}
                  </span>
                  <p className="text-slate-200 text-lg md:text-xl italic leading-relaxed font-serif">
                    «{devotional.bibleVerse.text}»
                  </p>
                </div>
              </div>
            )}

            {/* REFLEXIÓN */}
            <div className="text-slate-300 text-base md:text-lg leading-relaxed font-medium space-y-4 pt-2">
              {devotional.reflection.split("\n").map((para: string, idx: number) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

            {/* ORACIÓN */}
            {devotional.prayer && (
              <div className="bg-slate-800/60 border border-slate-700/80 rounded-2xl p-6 space-y-2">
                <span className="text-xs font-gobold text-secondary-400 uppercase tracking-widest flex items-center gap-2">
                  <Heart size={16} className="text-red-400" /> Oración y Aplicación
                </span>
                <p className="text-slate-200 text-sm md:text-base italic leading-relaxed">
                  "{devotional.prayer}"
                </p>
              </div>
            )}
          </div>

          {/* ACCIONES */}
          <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs text-slate-400 font-semibold">
              Por: <span className="text-white font-gobold">{devotional.author || "Equipo Pastoral"}</span>
            </div>

            <button
              onClick={handleShare}
              className="px-6 py-3 bg-secondary-500 hover:bg-secondary-400 text-slate-950 rounded-xl text-xs font-gobold uppercase tracking-widest transition flex items-center gap-2 shadow-lg"
            >
              <Share2 size={16} />
              {copied ? "¡Enlace Copiado!" : "Compartir Devocional"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
