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
      <div className="max-w-6xl mx-auto px-4 my-6">
        <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 h-72 animate-pulse shadow-sm" />
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
      <div className="relative bg-white text-slate-900 rounded-[2.5rem] p-6 md:p-10 overflow-hidden shadow-lg border border-slate-200/80">
        {/* ELEMENTOS DECORATIVOS DE FONDO */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-secondary-500/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />

        <div className="relative z-10 space-y-5">
          {/* BADGE Y FECHA DE CARGUE */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-secondary-50 border border-secondary-200 rounded-full text-secondary-700 text-[10px] font-gobold uppercase tracking-widest">
              <Sparkles size={14} className="text-secondary-600" />
              Devocional del Día
            </div>

            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
              <Calendar size={14} className="text-secondary-600" />
              <span className="capitalize">{formattedDate}</span>
            </div>
          </div>

          {/* TÍTULO Y PASAJE BÍBLICO */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-gobold uppercase tracking-tight leading-tight text-slate-900">
              {devotional.title}
            </h2>

            {/* CAJA DE VERSÍCULO CLAVE */}
            {devotional.bibleVerse && (
              <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-5 md:p-6 relative overflow-hidden shadow-sm">
                <Quote size={36} className="absolute top-3 right-4 text-slate-200 pointer-events-none" />
                <div className="relative z-10 space-y-2">
                  <span className="text-[11px] font-gobold text-secondary-700 uppercase tracking-widest flex items-center gap-1.5">
                    <Bookmark size={14} className="text-secondary-600" />
                    {devotional.bibleVerse.reference}
                  </span>
                  <p className="text-slate-800 text-sm md:text-base italic leading-relaxed font-serif">
                    «{devotional.bibleVerse.text}»
                  </p>
                </div>
              </div>
            )}

            {/* REFLEXIÓN / MENSAJE */}
            <div className="text-slate-600 text-sm md:text-base leading-relaxed font-normal space-y-2.5">
              {devotional.reflection.split("\n").map((paragraph: string, idx: number) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* ORACIÓN / APLICACIÓN PRÁCTICA */}
            {devotional.prayer && (
              <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 md:p-5 space-y-1.5">
                <span className="text-[11px] font-gobold text-amber-800 uppercase tracking-widest flex items-center gap-1.5">
                  <Heart size={14} className="text-amber-600 fill-amber-500/20" />
                  Oración del Día y Aplicación
                </span>
                <p className="text-amber-950 text-xs md:text-sm italic font-serif leading-relaxed">
                  "{devotional.prayer}"
                </p>
              </div>
            )}
          </div>

          {/* FOOTER DE ACCIONES */}
          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <div className="text-xs text-slate-500 font-medium">
              Por: <span className="text-slate-900 font-gobold">{devotional.author || "Equipo Pastoral CONSTRUVIDAS"}</span>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={handleShare}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-gobold uppercase tracking-wider transition flex items-center gap-1.5 border border-slate-200"
              >
                <Share2 size={14} />
                {copied ? "¡Copiado!" : "Compartir"}
              </button>

              <Link
                href="/devocionales"
                className="px-5 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-xl text-xs font-gobold uppercase tracking-widest transition flex items-center gap-2 shadow-md shadow-primary-500/20"
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
