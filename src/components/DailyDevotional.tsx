"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Sparkles, Calendar, Bookmark, Heart, Share2, ArrowRight, Quote } from "lucide-react";

export default function DailyDevotional() {
  const [devotional, setDevotional] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch("/api/devotionals/today")
      .then((res) => res.json())
      .then((data) => {
        if (data && data._id) {
          setDevotional(data);
        }
      })
      .catch((err) => console.error("Error al cargar devocional del día:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleShare = () => {
    if (navigator.share && devotional) {
      navigator.share({
        title: devotional.title,
        text: `Devocional de Hoy: "${devotional.title}" - ${devotional.bibleVerse?.reference}`,
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
      <div className="max-w-6xl mx-auto px-4 my-12">
        <div className="bg-slate-900 rounded-[2.5rem] p-10 h-80 animate-pulse" />
      </div>
    );
  }

  if (!devotional) return null;

  const formattedDate = new Date(devotional.publishDate).toLocaleDateString("es-CO", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <section className="max-w-6xl mx-auto px-4 my-6">
      <div className="relative bg-slate-900 text-white rounded-3xl p-6 md:p-8 overflow-hidden shadow-xl border border-slate-800">
        {/* ELEMENTOS DECORATIVOS DE FONDO */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-secondary-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-accent-500/10 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />

        <div className="relative z-10 space-y-4">
          {/* BADGE Y FECHA DE CARGUE */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary-500/20 border border-secondary-500/30 rounded-full text-secondary-300 text-[10px] font-gobold uppercase tracking-widest">
              <Sparkles size={14} />
              Devocional del Día
            </div>

            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400">
              <Calendar size={13} className="text-secondary-400" />
              <span className="capitalize">{formattedDate}</span>
            </div>
          </div>

          {/* TÍTULO Y PASAJE BÍBLICO */}
          <div className="space-y-3">
            <h2 className="text-xl md:text-2xl font-gobold uppercase tracking-tight leading-tight text-white">
              {devotional.title}
            </h2>

            {/* CAJA DE VERSÍCULO CLAVE */}
            {devotional.bibleVerse && (
              <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 md:p-5 relative overflow-hidden shadow-md">
                <Quote size={28} className="absolute top-3 right-3 text-slate-800 pointer-events-none" />
                <div className="relative z-10 space-y-1.5">
                  <span className="text-[11px] font-gobold text-secondary-400 uppercase tracking-widest flex items-center gap-1.5">
                    <Bookmark size={14} />
                    {devotional.bibleVerse.reference}
                  </span>
                  <p className="text-slate-200 text-sm md:text-base italic leading-snug font-serif">
                    «{devotional.bibleVerse.text}»
                  </p>
                </div>
              </div>
            )}

            {/* REFLEXIÓN / MENSAJE */}
            <div className="text-slate-300 text-xs md:text-sm leading-relaxed font-medium space-y-2">
              {devotional.reflection.split("\n").map((paragraph: string, idx: number) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* ORACIÓN / APLICACIÓN PRÁCTICA */}
            {devotional.prayer && (
              <div className="bg-slate-800/60 border border-slate-700/80 rounded-xl p-3.5 space-y-1">
                <span className="text-[10px] font-gobold text-secondary-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Heart size={13} className="text-red-400" />
                  Oración del Día y Aplicación
                </span>
                <p className="text-slate-200 text-xs italic leading-normal">
                  "{devotional.prayer}"
                </p>
              </div>
            )}
          </div>

          {/* FOOTER DE ACCIONES */}
          <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="text-[11px] text-slate-400 font-semibold">
              Por: <span className="text-white font-gobold">{devotional.author || "Equipo Pastoral"}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-[10px] font-gobold uppercase tracking-wider transition flex items-center gap-1.5 border border-slate-700"
              >
                <Share2 size={14} />
                {copied ? "¡Copiado!" : "Compartir"}
              </button>

              <Link
                href="/devocionales"
                className="px-4 py-1.5 bg-secondary-500 hover:bg-secondary-400 text-slate-950 rounded-lg text-[10px] font-gobold uppercase tracking-widest transition flex items-center gap-1.5 shadow"
              >
                Ver Más Devocionales
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
