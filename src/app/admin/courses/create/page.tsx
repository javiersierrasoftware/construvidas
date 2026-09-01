"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Plus,
  Trash2,
  BookOpen,
  Video,
  Bookmark,
  FileText,
  HelpCircle,
  Save,
  Layers,
} from "lucide-react";
import { useSession } from "next-auth/react";

export default function CreateCoursePage() {
  const router = useRouter();
  const { data: session } = useSession();

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [category, setCategory] = useState("Fundamentos");
  const [level, setLevel] = useState("Principiante");
  const [isPublished, setIsPublished] = useState(true);

  // Modules State
  const [modules, setModules] = useState<any[]>([
    {
      title: "Módulo 1: Introducción",
      description: "",
      order: 1,
      lessons: [
        {
          title: "Tema 1: Bienvenida",
          content: "",
          videoUrl: "",
          bibleVerses: [],
          materials: [],
          quizzes: [],
          order: 1,
        },
      ],
    },
  ]);

  // --- Module Handlers ---
  const addModule = () => {
    setModules((prev) => [
      ...prev,
      {
        title: `Módulo ${prev.length + 1}`,
        description: "",
        order: prev.length + 1,
        lessons: [],
      },
    ]);
  };

  const removeModule = (mIdx: number) => {
    setModules((prev) => prev.filter((_, idx) => idx !== mIdx));
  };

  const updateModuleField = (mIdx: number, field: string, value: any) => {
    setModules((prev) => {
      const updated = [...prev];
      updated[mIdx][field] = value;
      return updated;
    });
  };

  // --- Lesson Handlers ---
  const addLesson = (mIdx: number) => {
    setModules((prev) => {
      const updated = [...prev];
      const lessons = updated[mIdx].lessons || [];
      updated[mIdx].lessons = [
        ...lessons,
        {
          title: `Tema ${lessons.length + 1}`,
          content: "",
          videoUrl: "",
          bibleVerses: [],
          materials: [],
          quizzes: [],
          order: lessons.length + 1,
        },
      ];
      return updated;
    });
  };

  const removeLesson = (mIdx: number, lIdx: number) => {
    setModules((prev) => {
      const updated = [...prev];
      updated[mIdx].lessons = updated[mIdx].lessons.filter((_: any, idx: number) => idx !== lIdx);
      return updated;
    });
  };

  const updateLessonField = (mIdx: number, lIdx: number, field: string, value: any) => {
    setModules((prev) => {
      const updated = [...prev];
      updated[mIdx].lessons[lIdx][field] = value;
      return updated;
    });
  };

  // --- Bible Verse Handlers ---
  const addBibleVerse = (mIdx: number, lIdx: number) => {
    setModules((prev) => {
      const updated = [...prev];
      const verses = updated[mIdx].lessons[lIdx].bibleVerses || [];
      updated[mIdx].lessons[lIdx].bibleVerses = [
        ...verses,
        { reference: "Juan 3:16", text: "" },
      ];
      return updated;
    });
  };

  const removeBibleVerse = (mIdx: number, lIdx: number, vIdx: number) => {
    setModules((prev) => {
      const updated = [...prev];
      updated[mIdx].lessons[lIdx].bibleVerses = updated[mIdx].lessons[lIdx].bibleVerses.filter(
        (_: any, idx: number) => idx !== vIdx
      );
      return updated;
    });
  };

  // --- Material Handlers ---
  const addMaterial = (mIdx: number, lIdx: number) => {
    setModules((prev) => {
      const updated = [...prev];
      const mats = updated[mIdx].lessons[lIdx].materials || [];
      updated[mIdx].lessons[lIdx].materials = [
        ...mats,
        { title: "Guía de Estudio", url: "", type: "PDF" },
      ];
      return updated;
    });
  };

  const removeMaterial = (mIdx: number, lIdx: number, matIdx: number) => {
    setModules((prev) => {
      const updated = [...prev];
      updated[mIdx].lessons[lIdx].materials = updated[mIdx].lessons[lIdx].materials.filter(
        (_: any, idx: number) => idx !== matIdx
      );
      return updated;
    });
  };

  // --- Quiz Handlers ---
  const addQuiz = (mIdx: number, lIdx: number) => {
    setModules((prev) => {
      const updated = [...prev];
      const quizzes = updated[mIdx].lessons[lIdx].quizzes || [];
      updated[mIdx].lessons[lIdx].quizzes = [
        ...quizzes,
        {
          question: "¿Pregunta de comprensión?",
          options: ["Opción A", "Opción B", "Opción C"],
          correctOptionIndex: 0,
          explanation: "",
        },
      ];
      return updated;
    });
  };

  const removeQuiz = (mIdx: number, lIdx: number, qIdx: number) => {
    setModules((prev) => {
      const updated = [...prev];
      updated[mIdx].lessons[lIdx].quizzes = updated[mIdx].lessons[lIdx].quizzes.filter(
        (_: any, idx: number) => idx !== qIdx
      );
      return updated;
    });
  };

  // --- Submit Course ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!title.trim() || !description.trim()) {
      setErrorMsg("El título y la descripción son requeridos.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          coverImage,
          category,
          level,
          isPublished,
          modules,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Error al crear el curso");
      }

      router.push("/admin/courses");
    } catch (err: any) {
      setErrorMsg(err.message || "Error al guardar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20 px-4 md:px-8">
      <form onSubmit={handleSubmit} className="max-w-5xl mx-auto space-y-8">
        {/* ENCABEZADO */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
          <div className="space-y-1">
            <Link
              href="/admin/courses"
              className="inline-flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-slate-900 transition uppercase tracking-widest"
            >
              <ArrowLeft size={14} /> Volver a cursos admin
            </Link>
            <h1 className="text-3xl font-gobold text-slate-900 uppercase tracking-tight">
              Crear Nuevo Curso
            </h1>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-slate-900 text-white font-gobold px-8 py-3.5 rounded-2xl text-xs uppercase tracking-widest hover:bg-secondary-600 transition shadow-lg flex items-center gap-2 disabled:opacity-50"
          >
            <Save size={18} />
            {loading ? "Guardando..." : "Guardar Curso"}
          </button>
        </div>

        {errorMsg && (
          <div className="bg-red-50 text-red-600 border border-red-200 p-4 rounded-2xl text-sm font-medium">
            {errorMsg}
          </div>
        )}

        {/* DETALLES PRINCIPALES DEL CURSO */}
        <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm space-y-6">
          <h2 className="text-xl font-gobold text-slate-900 uppercase tracking-tight border-b border-slate-100 pb-3">
            Información General
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                Título del Curso *
              </label>
              <input
                required
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ej: Escuela de Vida: Fundamentos de la Fe"
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-slate-900 focus:border-secondary-500 outline-none font-medium"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                URL Imagen de Portada
              </label>
              <input
                type="text"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-slate-900 focus:border-secondary-500 outline-none font-medium"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                Categoría
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-slate-900 focus:border-secondary-500 outline-none font-medium"
              >
                <option value="Fundamentos">Fundamentos</option>
                <option value="Discipulado">Discipulado</option>
                <option value="Liderazgo">Liderazgo</option>
                <option value="Vida Cristiana">Vida Cristiana</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                Nivel
              </label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-slate-900 focus:border-secondary-500 outline-none font-medium"
              >
                <option value="Principiante">Principiante</option>
                <option value="Intermedio">Intermedio</option>
                <option value="Avanzado">Avanzado</option>
              </select>
            </div>

            <div className="md:col-span-2 space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                Descripción General *
              </label>
              <textarea
                required
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Explica de qué trata el curso..."
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-slate-900 focus:border-secondary-500 outline-none font-medium"
              />
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="isPublished"
                checked={isPublished}
                onChange={(e) => setIsPublished(e.target.checked)}
                className="w-5 h-5 accent-slate-900 rounded"
              />
              <label htmlFor="isPublished" className="text-sm font-bold text-slate-700">
                Publicar inmediatamente este curso para los discípulos
              </label>
            </div>
          </div>
        </div>

        {/* CONSTRUCTOR DE MÓDULOS Y LECCIONES */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-gobold text-slate-900 uppercase tracking-tight flex items-center gap-2">
              <Layers size={22} className="text-secondary-600" />
              Módulos y Temas del Curso
            </h2>
            <button
              type="button"
              onClick={addModule}
              className="bg-slate-900 text-white font-gobold px-5 py-2.5 rounded-2xl text-xs uppercase tracking-widest hover:bg-secondary-600 transition flex items-center gap-2"
            >
              <Plus size={16} /> Agregar Módulo
            </button>
          </div>

          {modules.map((mod, mIdx) => (
            <div
              key={mIdx}
              className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200 shadow-sm space-y-6"
            >
              {/* CABECERA MÓDULO */}
              <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div className="flex-1 grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={mod.title}
                    onChange={(e) => updateModuleField(mIdx, "title", e.target.value)}
                    placeholder="Título del Módulo"
                    className="font-gobold text-lg text-slate-900 bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl"
                  />
                  <input
                    type="text"
                    value={mod.description}
                    onChange={(e) => updateModuleField(mIdx, "description", e.target.value)}
                    placeholder="Descripción del módulo (opcional)"
                    className="text-sm text-slate-600 bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeModule(mIdx)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition"
                  title="Eliminar Módulo"
                >
                  <Trash2 size={20} />
                </button>
              </div>

              {/* TEMAS / LECCIONES */}
              <div className="space-y-6 pl-2 md:pl-6 border-l-2 border-slate-100">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-gobold text-slate-400 uppercase tracking-widest">
                    Temas del Módulo {mIdx + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => addLesson(mIdx)}
                    className="text-xs font-gobold text-secondary-600 hover:text-secondary-700 bg-secondary-50 px-4 py-2 rounded-xl uppercase tracking-wider flex items-center gap-1"
                  >
                    <Plus size={14} /> Agregar Tema
                  </button>
                </div>

                {mod.lessons?.map((lesson: any, lIdx: number) => (
                  <div
                    key={lIdx}
                    className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 space-y-6 relative"
                  >
                    <button
                      type="button"
                      onClick={() => removeLesson(mIdx, lIdx)}
                      className="absolute top-4 right-4 text-red-400 hover:text-red-600 transition"
                    >
                      <Trash2 size={16} />
                    </button>

                    <div className="space-y-4 pr-8">
                      <input
                        type="text"
                        value={lesson.title}
                        onChange={(e) => updateLessonField(mIdx, lIdx, "title", e.target.value)}
                        placeholder="Título del Tema / Lección"
                        className="font-gobold text-base text-slate-900 bg-white border border-slate-200 px-4 py-2 rounded-xl w-full"
                      />

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                            <Video size={12} /> URL Video Explicativo (YouTube/Vimeo)
                          </label>
                          <input
                            type="text"
                            value={lesson.videoUrl}
                            onChange={(e) => updateLessonField(mIdx, lIdx, "videoUrl", e.target.value)}
                            placeholder="https://www.youtube.com/embed/..."
                            className="text-xs bg-white border border-slate-200 px-4 py-2 rounded-xl w-full"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                          Texto / Notas de la Lección
                        </label>
                        <textarea
                          rows={2}
                          value={lesson.content}
                          onChange={(e) => updateLessonField(mIdx, lIdx, "content", e.target.value)}
                          placeholder="Resumen o lectura de la lección..."
                          className="text-xs bg-white border border-slate-200 px-4 py-2 rounded-xl w-full"
                        />
                      </div>
                    </div>

                    {/* SECCIÓN VERSÍCULOS BÍBLICOS */}
                    <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-gobold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                          <Bookmark size={14} className="text-secondary-600" />
                          Versículos Bíblicos Asociados
                        </span>
                        <button
                          type="button"
                          onClick={() => addBibleVerse(mIdx, lIdx)}
                          className="text-[10px] font-bold text-slate-600 hover:text-slate-900 uppercase"
                        >
                          + Agregar Versículo
                        </button>
                      </div>

                      {lesson.bibleVerses?.map((verse: any, vIdx: number) => (
                        <div key={vIdx} className="grid md:grid-cols-3 gap-2 items-center">
                          <input
                            type="text"
                            value={verse.reference}
                            onChange={(e) => {
                              const updated = [...lesson.bibleVerses];
                              updated[vIdx].reference = e.target.value;
                              updateLessonField(mIdx, lIdx, "bibleVerses", updated);
                            }}
                            placeholder="Ej: Juan 3:16"
                            className="text-xs bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg"
                          />
                          <input
                            type="text"
                            value={verse.text}
                            onChange={(e) => {
                              const updated = [...lesson.bibleVerses];
                              updated[vIdx].text = e.target.value;
                              updateLessonField(mIdx, lIdx, "bibleVerses", updated);
                            }}
                            placeholder="Texto del versículo..."
                            className="text-xs bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg md:col-span-2"
                          />
                        </div>
                      ))}
                    </div>

                    {/* SECCIÓN RECURSOS DESCARGABLES */}
                    <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-gobold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                          <FileText size={14} className="text-secondary-600" />
                          Materiales y Guías
                        </span>
                        <button
                          type="button"
                          onClick={() => addMaterial(mIdx, lIdx)}
                          className="text-[10px] font-bold text-slate-600 hover:text-slate-900 uppercase"
                        >
                          + Agregar Material
                        </button>
                      </div>

                      {lesson.materials?.map((mat: any, matIdx: number) => (
                        <div key={matIdx} className="grid md:grid-cols-2 gap-2 items-center">
                          <input
                            type="text"
                            value={mat.title}
                            onChange={(e) => {
                              const updated = [...lesson.materials];
                              updated[matIdx].title = e.target.value;
                              updateLessonField(mIdx, lIdx, "materials", updated);
                            }}
                            placeholder="Título del Material"
                            className="text-xs bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg"
                          />
                          <input
                            type="text"
                            value={mat.url}
                            onChange={(e) => {
                              const updated = [...lesson.materials];
                              updated[matIdx].url = e.target.value;
                              updateLessonField(mIdx, lIdx, "materials", updated);
                            }}
                            placeholder="URL del archivo/PDF..."
                            className="text-xs bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg"
                          />
                        </div>
                      ))}
                    </div>

                    {/* SECCIÓN PREGUNTAS DE EVALUACIÓN */}
                    <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-gobold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                          <HelpCircle size={14} className="text-secondary-600" />
                          Evaluación / Preguntas
                        </span>
                        <button
                          type="button"
                          onClick={() => addQuiz(mIdx, lIdx)}
                          className="text-[10px] font-bold text-slate-600 hover:text-slate-900 uppercase"
                        >
                          + Agregar Pregunta
                        </button>
                      </div>

                      {lesson.quizzes?.map((q: any, qIdx: number) => (
                        <div key={qIdx} className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-2">
                          <input
                            type="text"
                            value={q.question}
                            onChange={(e) => {
                              const updated = [...lesson.quizzes];
                              updated[qIdx].question = e.target.value;
                              updateLessonField(mIdx, lIdx, "quizzes", updated);
                            }}
                            placeholder="Enunciado de la pregunta"
                            className="text-xs font-bold bg-white border border-slate-200 px-3 py-1.5 rounded-lg w-full"
                          />

                          <div className="space-y-1">
                            {q.options.map((opt: string, optIdx: number) => (
                              <div key={optIdx} className="flex items-center gap-2 text-xs">
                                <input
                                  type="radio"
                                  name={`quiz-${mIdx}-${lIdx}-${qIdx}`}
                                  checked={q.correctOptionIndex === optIdx}
                                  onChange={() => {
                                    const updated = [...lesson.quizzes];
                                    updated[qIdx].correctOptionIndex = optIdx;
                                    updateLessonField(mIdx, lIdx, "quizzes", updated);
                                  }}
                                />
                                <input
                                  type="text"
                                  value={opt}
                                  onChange={(e) => {
                                    const updated = [...lesson.quizzes];
                                    updated[qIdx].options[optIdx] = e.target.value;
                                    updateLessonField(mIdx, lIdx, "quizzes", updated);
                                  }}
                                  placeholder={`Opción ${optIdx + 1}`}
                                  className="bg-white border border-slate-200 px-3 py-1 rounded-lg w-full"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* BOTÓN FINAL DE GUARDAR */}
        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="bg-slate-900 text-white font-gobold px-10 py-4 rounded-2xl text-sm uppercase tracking-widest hover:bg-secondary-600 transition shadow-xl disabled:opacity-50"
          >
            {loading ? "Creando..." : "Guardar y Publicar Curso"}
          </button>
        </div>
      </form>
    </div>
  );
}
