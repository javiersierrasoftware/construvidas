"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Sparkles, Calendar, Bookmark, Search, ArrowRight, Heart } from "lucide-react";

export default function DevotionalsArchivePage() {
  const [devotionals, setDevotionals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("/api/devotionals")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setDevotionals(data);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const filtered = devotionals.filter(
    (d) =>
      d.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.bibleVerse?.reference?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.reflection.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* HERO BANNER */}
        <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-14 text-white space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-secondary-500/20 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary-500/20 border border-secondary-500/30 rounded-full text-secondary-300 text-xs font-gobold uppercase tracking-widest">
              <Sparkles size={16} />
              Archivo de Devocionales
            </div>
            <h1 className="text-4xl md:text-5xl font-gobold uppercase tracking-tight leading-tight">
              Palabras de <span className="text-secondary-400">Vida y Esperanza</span> para tu día
            </h1>
            <p className="text-slate-300 text-base md:text-lg font-medium">
              Encuentra alimento espiritual para fortalecer tu fe, meditar en las Escrituras y cultivar tu relación diaria con Dios.
            </p>
          </div>
        </div>

        {/* BUSCADOR DE DEVOCIONALES */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div className="relative w-full md:w-96">
            <Search size={18} className="absolute left-4 top-3.5 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar devocional o versículo..."
              className="w-full bg-white border border-slate-200 rounded-2xl pl-11 pr-4 py-3 text-slate-900 focus:border-secondary-500 outline-none font-medium shadow-sm text-sm"
            />
          </div>

          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            {filtered.length} Devocionales Publicados
          </span>
        </div>

        {/* TARJETAS DE DEVOCIONALES */}
        {loading ? (
          <div className="grid md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-3xl h-64 animate-pulse border border-slate-200" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
            <Sparkles size={48} className="mx-auto text-slate-300" />
            <h3 className="text-xl font-gobold uppercase text-slate-800">
              No encontramos devocionales
            </h3>
            <p className="text-slate-500 text-sm">
              Intenta con otra búsqueda o regresa más tarde para leer la Palabra del día.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {filtered.map((devotional) => {
              const formattedDate = new Date(devotional.publishDate).toLocaleDateString("es-CO", {
                day: "numeric",
                month: "long",
                year: "numeric",
              });

              return (
                <div
                  key={devotional._id}
                  className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6 group hover:-translate-y-1"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2 text-xs font-semibold text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={14} className="text-secondary-600" />
                        {formattedDate}
                      </span>
                      <span className="text-slate-400 uppercase font-bold text-[10px]">
                        {devotional.author || "Pastor / Equipo"}
                      </span>
                    </div>

                    <h3 className="text-2xl font-gobold uppercase text-slate-900 group-hover:text-secondary-600 transition-colors leading-snug">
                      {devotional.title}
                    </h3>

                    {devotional.bibleVerse && (
                      <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-1">
                        <span className="text-[11px] font-gobold text-secondary-600 uppercase tracking-widest flex items-center gap-1">
                          <Bookmark size={12} /> {devotional.bibleVerse.reference}
                        </span>
                        <p className="text-slate-700 text-sm italic line-clamp-2">
                          «{devotional.bibleVerse.text}»
                        </p>
                      </div>
                    )}

                    <p className="text-slate-600 text-sm font-medium leading-relaxed line-clamp-3">
                      {devotional.reflection}
                    </p>
                  </div>

                  <Link
                    href={`/devocionales/${devotional._id}`}
                    className="w-full bg-slate-900 text-white font-gobold py-3.5 rounded-2xl flex items-center justify-center gap-2 text-xs uppercase tracking-widest hover:bg-secondary-600 transition shadow-md"
                  >
                    Leer Devocional Completo
                    <ArrowRight size={16} />
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
