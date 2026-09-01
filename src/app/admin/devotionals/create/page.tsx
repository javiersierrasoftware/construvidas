"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Sparkles, Bookmark, Calendar, Heart } from "lucide-react";
import { useSession } from "next-auth/react";

export default function CreateDevotionalPage() {
  const router = useRouter();
  const { data: session } = useSession();

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [publishDate, setPublishDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [verseReference, setVerseReference] = useState("");
  const [verseText, setVerseText] = useState("");
  const [reflection, setReflection] = useState("");
  const [prayer, setPrayer] = useState("");
  const [author, setAuthor] = useState("Equipo Pastoral CONSTRUVIDAS");
  const [coverImage, setCoverImage] = useState("");
  const [isPublished, setIsPublished] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!title || !reflection || !verseReference || !verseText) {
      setErrorMsg("Por favor completa el título, pasaje bíblico y reflexión.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/devotionals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          publishDate,
          bibleVerse: {
            reference: verseReference,
            text: verseText,
          },
          reflection,
          prayer,
          author,
          coverImage,
          isPublished,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Error al crear el devocional");
      }

      router.push("/admin/devotionals");
    } catch (err: any) {
      setErrorMsg(err.message || "Error al guardar el devocional.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20 px-4 md:px-8">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8">
        {/* ENCABEZADO */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
          <div className="space-y-1">
            <Link
              href="/admin/devotionals"
              className="inline-flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-slate-900 transition uppercase tracking-widest"
            >
              <ArrowLeft size={14} /> Volver a devocionales admin
            </Link>
            <h1 className="text-3xl font-gobold text-slate-900 uppercase tracking-tight">
              Crear Nuevo Devocional
            </h1>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-slate-900 text-white font-gobold px-8 py-3.5 rounded-2xl text-xs uppercase tracking-widest hover:bg-secondary-600 transition shadow-lg flex items-center gap-2 disabled:opacity-50"
          >
            <Save size={18} />
            {loading ? "Publicando..." : "Publicar Devocional"}
          </button>
        </div>

        {errorMsg && (
          <div className="bg-red-50 text-red-600 border border-red-200 p-4 rounded-2xl text-sm font-medium">
            {errorMsg}
          </div>
        )}

        {/* CAMPOS DEL FORMULARIO */}
        <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                Título del Devocional *
              </label>
              <input
                required
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ej: Confianza Imparable en la Promesa de Dios"
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-slate-900 focus:border-secondary-500 outline-none font-medium"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1">
                <Calendar size={14} /> Fecha de Cargue / Publicación *
              </label>
              <input
                required
                type="date"
                value={publishDate}
                onChange={(e) => setPublishDate(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-slate-900 focus:border-secondary-500 outline-none font-medium"
              />
            </div>

            {/* SECCIÓN VERSÍCULO BÍBLICO */}
            <div className="md:col-span-2 bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
              <span className="text-xs font-gobold text-secondary-600 uppercase tracking-widest flex items-center gap-1.5">
                <Bookmark size={16} /> Versículo Bíblico Clave del Día
              </span>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Cita Bíblica (Libro, Cap:Ver) *
                  </label>
                  <input
                    required
                    type="text"
                    value={verseReference}
                    onChange={(e) => setVerseReference(e.target.value)}
                    placeholder="Ej: Proverbios 3:5-6"
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-bold"
                  />
                </div>

                <div className="md:col-span-2 space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Texto Completo del Versículo *
                  </label>
                  <input
                    required
                    type="text"
                    value={verseText}
                    onChange={(e) => setVerseText(e.target.value)}
                    placeholder="«Fíate de Jehová de todo tu corazón...»"
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 italic font-serif"
                  />
                </div>
              </div>
            </div>

            {/* REFLEXIÓN / MENSAJE */}
            <div className="md:col-span-2 space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                Reflexión / Mensaje Principal *
              </label>
              <textarea
                required
                rows={5}
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                placeholder="Escribe la enseñanza y reflexión bíblica para el día de hoy..."
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-slate-900 focus:border-secondary-500 outline-none font-medium text-sm leading-relaxed"
              />
            </div>

            {/* ORACIÓN / APLICACIÓN PRÁCTICA */}
            <div className="md:col-span-2 space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1">
                <Heart size={14} className="text-red-400" /> Oración del Día / Aplicación Práctica
              </label>
              <textarea
                rows={3}
                value={prayer}
                onChange={(e) => setPrayer(e.target.value)}
                placeholder="Oración de fe o punto práctico para llevar a la acción..."
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-slate-900 focus:border-secondary-500 outline-none font-medium text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                Autor / Predicador
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Ej: Pastor Principal - CONSTRUVIDAS"
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-slate-900 focus:border-secondary-500 outline-none font-medium text-sm"
              />
            </div>

            <div className="flex items-center gap-3 pt-6">
              <input
                type="checkbox"
                id="isPublished"
                checked={isPublished}
                onChange={(e) => setIsPublished(e.target.checked)}
                className="w-5 h-5 accent-slate-900 rounded"
              />
              <label htmlFor="isPublished" className="text-sm font-bold text-slate-700">
                Publicar inmediatamente en la vista principal
              </label>
            </div>
          </div>
        </div>

        {/* BOTÓN SUBMIT */}
        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="bg-slate-900 text-white font-gobold px-10 py-4 rounded-2xl text-sm uppercase tracking-widest hover:bg-secondary-600 transition shadow-xl disabled:opacity-50"
          >
            {loading ? "Guardando..." : "Guardar Devocional"}
          </button>
        </div>
      </form>
    </div>
  );
}
