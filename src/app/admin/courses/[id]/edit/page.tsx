"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Plus,
  Trash2,
  Bookmark,
  FileText,
  HelpCircle,
  Save,
  Layers,
  Video,
  Clock,
  Award,
  ShieldCheck,
  Check,
  Sparkles,
  Target,
} from "lucide-react";
import { useSession } from "next-auth/react";
import RichLessonEditor from "@/components/RichLessonEditor";

const AVAILABLE_ROLES = [
  { id: "SERVIDOR", label: "Servidor General", description: "Habilita para incorporarse al servicio en ministerios" },
  { id: "LIDER_GRUPO_PEQUENO", label: "Líder de Casa de Vida", description: "Líder de grupo pequeño y anfitrión" },
  { id: "MENTOR", label: "Mentor Espiritual", description: "Acompañamiento discipular uno a uno" },
  { id: "RESPONSABLE_PROCESO", label: "Responsable de Proceso", description: "Coordina etapas de discipulado o consolidación" },
  { id: "LIDER_MINISTERIO", label: "Líder de Ministerio", description: "Dirección de equipos ministeriales específicos" },
  { id: "RESPONSABLE_MINISTERIO", label: "Responsable de Ministerio", description: "Supervisión general del ministerio" },
];

export default function EditCoursePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: courseId } = use(params);
  const router = useRouter();
  const { data: session } = useSession();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [goal, setGoal] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [category, setCategory] = useState("Fundamentos");
  const [level, setLevel] = useState("Principiante");
  const [isPublished, setIsPublished] = useState(true);
  const [instructor, setInstructor] = useState("");
  const [durationHours, setDurationHours] = useState("");
  const [rewardFruits, setRewardFruits] = useState<number>(0);
  const [enablesRoles, setEnablesRoles] = useState<string[]>([]);
  const [enablesDescription, setEnablesDescription] = useState("");
  const [modules, setModules] = useState<any[]>([]);

  const toggleRole = (roleId: string) => {
    setEnablesRoles((prev) =>
      prev.includes(roleId) ? prev.filter((r) => r !== roleId) : [...prev, roleId]
    );
  };

  useEffect(() => {
    fetch(`/api/courses/${courseId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data._id) {
          setTitle(data.title || "");
          setDescription(data.description || "");
          setGoal(data.goal || "");
          setCoverImage(data.coverImage || "");
          setCategory(data.category || "Fundamentos");
          setLevel(data.level || "Principiante");
          setIsPublished(data.isPublished ?? true);
          setInstructor(data.instructor || "");
          setDurationHours(data.durationHours || "");
          setRewardFruits(data.rewardFruits ?? 0);
          setEnablesRoles(Array.isArray(data.enablesRoles) ? data.enablesRoles : []);
          setEnablesDescription(data.enablesDescription || "");
          setModules(data.modules || []);
        }
      })
      .catch((err) => setErrorMsg("No se pudo cargar el curso."))
      .finally(() => setLoading(false));
  }, [courseId]);

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

  // --- Quiz Handlers ---
  const addQuiz = (mIdx: number, lIdx: number) => {
    setModules((prev) => {
      const updated = [...prev];
      const quizzes = updated[mIdx].lessons[lIdx].quizzes || [];
      updated[mIdx].lessons[lIdx].quizzes = [
        ...quizzes,
        {
          type: "MULTIPLE_CHOICE",
          question: "¿Pregunta de comprensión bíblica?",
          options: ["Opción A", "Opción B", "Opción C"],
          correctOptionIndex: 0,
          explanation: "",
        },
      ];
      return updated;
    });
  };

  const changeQuizType = (mIdx: number, lIdx: number, qIdx: number, type: string) => {
    setModules((prev) => {
      const updated = [...prev];
      const quiz = updated[mIdx].lessons[lIdx].quizzes[qIdx];
      quiz.type = type;
      if (type === "TRUE_FALSE") {
        quiz.options = ["Verdadero", "Falso"];
        quiz.correctOptionIndex = quiz.correctOptionIndex === 1 ? 1 : 0;
      } else if (type === "OPEN") {
        quiz.options = [];
        quiz.correctOptionIndex = 0;
      } else if (type === "MULTIPLE_CHOICE") {
        if (!quiz.options || quiz.options.length < 2) {
          quiz.options = ["Opción A", "Opción B", "Opción C"];
          quiz.correctOptionIndex = 0;
        }
      }
      return updated;
    });
  };

  const addQuizOption = (mIdx: number, lIdx: number, qIdx: number) => {
    setModules((prev) => {
      const updated = [...prev];
      const quiz = updated[mIdx].lessons[lIdx].quizzes[qIdx];
      const options = quiz.options || [];
      quiz.options = [...options, `Opción ${String.fromCharCode(65 + options.length)}`];
      return updated;
    });
  };

  const removeQuizOption = (mIdx: number, lIdx: number, qIdx: number, optIdx: number) => {
    setModules((prev) => {
      const updated = [...prev];
      const quiz = updated[mIdx].lessons[lIdx].quizzes[qIdx];
      if (quiz.options && quiz.options.length > 2) {
        quiz.options = quiz.options.filter((_: any, idx: number) => idx !== optIdx);
        if (quiz.correctOptionIndex >= quiz.options.length) {
          quiz.correctOptionIndex = 0;
        }
      }
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

    try {
      setSaving(true);
      const res = await fetch(`/api/courses/${courseId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          goal,
          coverImage,
          category,
          level,
          isPublished,
          instructor,
          durationHours,
          rewardFruits: Number(rewardFruits) || 0,
          enablesRoles,
          enablesDescription,
          modules,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Error al actualizar el curso");
      }

      router.push("/admin/courses");
    } catch (err: any) {
      setErrorMsg(err.message || "Error al guardar los cambios.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center pt-20">
        <p className="font-gobold text-slate-500 uppercase tracking-widest">Cargando curso...</p>
      </div>
    );
  }

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
              Editar Curso
            </h1>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="bg-slate-900 text-white font-gobold px-8 py-3.5 rounded-2xl text-xs uppercase tracking-widest hover:bg-secondary-600 transition shadow-lg flex items-center gap-2 disabled:opacity-50"
          >
            <Save size={18} />
            {saving ? "Guardando..." : "Actualizar Curso"}
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
                <option value="Conexión">Conexión</option>
                <option value="Discipulado">Discipulado</option>
                <option value="Servicio">Servicio</option>
                <option value="Liderazgo">Liderazgo</option>
                <option value="Principiante">Principiante</option>
                <option value="Intermedio">Intermedio</option>
                <option value="Avanzado">Avanzado</option>
                <option value="General">General</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                <Clock size={14} className="text-secondary-600" />
                Duración Estimada (durationHours)
              </label>
              <input
                type="text"
                value={durationHours}
                onChange={(e) => setDurationHours(e.target.value)}
                placeholder="Ej: 4 semanas · 3 temas"
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-slate-900 focus:border-secondary-500 outline-none font-medium"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                Instructor / Equipo Pastoral
              </label>
              <input
                type="text"
                value={instructor}
                onChange={(e) => setInstructor(e.target.value)}
                placeholder="Ej: Pastores Leonardo & Andrea Jaraba"
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-slate-900 focus:border-secondary-500 outline-none font-medium"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                <Award size={14} className="text-amber-500" />
                Frutos de Recompensa (rewardFruits)
              </label>
              <input
                type="number"
                min={0}
                step={10}
                value={rewardFruits}
                onChange={(e) => setRewardFruits(Number(e.target.value))}
                placeholder="Ej: 200"
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-slate-900 focus:border-secondary-500 outline-none font-medium"
              />
              <span className="text-[11px] text-slate-400 font-medium">
                Puntos/frutos otorgados al discípulo al completar el 100% del curso.
              </span>
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
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-slate-900 focus:border-secondary-500 outline-none font-medium"
              />
            </div>

            <div className="md:col-span-2 space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                <Target size={14} className="text-secondary-600" />
                Meta / Objetivo del Curso (goal)
              </label>
              <textarea
                rows={2}
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="Ej: Capacitar al discípulo en los fundamentos de la fe, la doctrina bíblica y prepararlo para el servicio ministerial activo..."
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-slate-900 focus:border-secondary-500 outline-none font-medium text-sm"
              />
              <span className="text-[11px] text-slate-400">
                El propósito espiritual y formativo que alcanzará el discípulo al culminar este curso.
              </span>
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
                Curso publicado y accesible
              </label>
            </div>
          </div>
        </div>

        {/* HABILITACIÓN PARA SERVICIO Y ROLES */}
        <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-xl font-gobold text-slate-900 uppercase tracking-tight flex items-center gap-2">
                <ShieldCheck size={20} className="text-secondary-600" />
                Habilitación Ministerial y Servicio
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Define a qué roles y responsabilidades capacita este curso dentro de la iglesia y la app móvil.
              </p>
            </div>
            {enablesRoles.length > 0 && (
              <span className="text-xs font-gobold bg-secondary-50 text-secondary-700 border border-secondary-200 px-3 py-1 rounded-full uppercase tracking-wider">
                {enablesRoles.length} {enablesRoles.length === 1 ? "Rol seleccionado" : "Roles seleccionados"}
              </span>
            )}
          </div>

          <div className="space-y-4">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block">
              Roles Ministeriales Habilitados (enablesRoles)
            </label>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              {AVAILABLE_ROLES.map((role) => {
                const selected = enablesRoles.includes(role.id);
                return (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => toggleRole(role.id)}
                    className={`p-4 rounded-2xl border text-left transition-all flex items-start gap-3 ${
                      selected
                        ? "bg-slate-900 border-slate-900 text-white shadow-md"
                        : "bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center mt-0.5 flex-shrink-0 transition-colors ${
                        selected
                          ? "bg-secondary-400 text-slate-950"
                          : "border border-slate-300 bg-white"
                      }`}
                    >
                      {selected && <Check size={13} strokeWidth={3} />}
                    </div>
                    <div className="space-y-0.5">
                      <div className="text-xs font-gobold uppercase tracking-wide">
                        {role.label}
                      </div>
                      <div
                        className={`text-[11px] leading-tight ${
                          selected ? "text-slate-300" : "text-slate-500"
                        }`}
                      >
                        {role.description}
                      </div>
                      <div
                        className={`text-[9px] font-mono mt-1 ${
                          selected ? "text-secondary-300" : "text-slate-400"
                        }`}
                      >
                        {role.id}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="space-y-2 pt-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                Descripción de la Habilitación (enablesDescription)
              </label>
              <textarea
                rows={2}
                value={enablesDescription}
                onChange={(e) => setEnablesDescription(e.target.value)}
                placeholder="Ej: Habilita para el servicio activo en los ministerios de la iglesia."
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-slate-900 focus:border-secondary-500 outline-none font-medium text-sm"
              />
              <span className="text-[11px] text-slate-400">
                Texto visible que explica al discípulo qué puertas de servicio ministerial abre haber aprobado este curso.
              </span>
            </div>
          </div>
        </div>

        {/* CONSTRUCTOR DE MÓDULOS Y LECCIONES */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-gobold text-slate-900 uppercase tracking-tight flex items-center gap-2">
              <Layers size={22} className="text-secondary-600" />
              Módulos y Temas
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
                    placeholder="Descripción del módulo"
                    className="text-sm text-slate-600 bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeModule(mIdx)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition"
                >
                  <Trash2 size={20} />
                </button>
              </div>

              {/* TEMAS */}
              <div className="space-y-6 pl-2 md:pl-6 border-l-2 border-slate-100">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-gobold text-slate-400 uppercase tracking-widest">
                    Temas del Módulo {mIdx + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => addLesson(mIdx)}
                    className="text-xs font-gobold text-secondary-600 bg-secondary-50 px-4 py-2 rounded-xl uppercase tracking-wider flex items-center gap-1"
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
                        placeholder="Título del Tema"
                        className="font-gobold text-base text-slate-900 bg-white border border-slate-200 px-4 py-2 rounded-xl w-full"
                      />

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                          <Video size={12} /> URL Video Explicativo
                        </label>
                        <input
                          type="text"
                          value={lesson.videoUrl || ""}
                          onChange={(e) => updateLessonField(mIdx, lIdx, "videoUrl", e.target.value)}
                          placeholder="https://www.youtube.com/embed/..."
                          className="text-xs bg-white border border-slate-200 px-4 py-2 rounded-xl w-full"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center justify-between">
                          <span>Texto / Notas de la Lección (Formato enriquecido)</span>
                          <span className="text-[10px] text-secondary-600 font-bold lowercase">
                            negrilla, cursiva, subrayado, centrado
                          </span>
                        </label>
                        <RichLessonEditor
                          value={lesson.content || ""}
                          onChange={(val) => updateLessonField(mIdx, lIdx, "content", val)}
                          placeholder="Escribe el contenido bíblico, notas, citas bíblicas y reflexiones de la lección..."
                          rows={4}
                        />
                      </div>
                    </div>

                    {/* VERSÍCULOS */}
                    <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-gobold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                          <Bookmark size={14} className="text-secondary-600" />
                          Versículos Bíblicos
                        </span>
                        <button
                          type="button"
                          onClick={() => addBibleVerse(mIdx, lIdx)}
                          className="text-[10px] font-bold text-slate-600 uppercase"
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
                            className="text-xs bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg md:col-span-2"
                          />
                        </div>
                      ))}
                    </div>

                    {/* MATERIALES */}
                    <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-gobold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                          <FileText size={14} className="text-secondary-600" />
                          Materiales
                        </span>
                        <button
                          type="button"
                          onClick={() => addMaterial(mIdx, lIdx)}
                          className="text-[10px] font-bold text-slate-600 uppercase"
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
                            className="text-xs bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg"
                          />
                        </div>
                      ))}
                    </div>

                    {/* SECCIÓN PREGUNTAS DE EVALUACIÓN */}
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <span className="text-xs font-gobold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                            <HelpCircle size={15} className="text-secondary-600" />
                            Evaluación y Comprensión del Tema
                          </span>
                          <span className="text-[11px] text-slate-400 block">
                            Preguntas de selección múltiple, falso/verdadero o reflexión abierta.
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => addQuiz(mIdx, lIdx)}
                          className="text-[10px] font-gobold text-secondary-600 hover:text-secondary-700 bg-secondary-50 px-3 py-1.5 rounded-xl uppercase tracking-wider flex items-center gap-1"
                        >
                          <Plus size={13} /> Agregar Pregunta
                        </button>
                      </div>

                      {lesson.quizzes?.map((q: any, qIdx: number) => {
                        const qType = q.type || "MULTIPLE_CHOICE";

                        return (
                          <div key={qIdx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3 relative">
                            <button
                              type="button"
                              onClick={() => removeQuiz(mIdx, lIdx, qIdx)}
                              className="absolute top-3 right-3 text-red-400 hover:text-red-600 transition"
                              title="Eliminar Pregunta"
                            >
                              <Trash2 size={15} />
                            </button>

                            {/* SELECTOR DE TIPO DE PREGUNTA */}
                            <div className="flex flex-wrap items-center gap-2 pr-6">
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                Tipo:
                              </span>
                              <div className="inline-flex bg-slate-200/80 p-0.5 rounded-lg text-[11px] font-bold">
                                <button
                                  type="button"
                                  onClick={() => changeQuizType(mIdx, lIdx, qIdx, "MULTIPLE_CHOICE")}
                                  className={`px-2.5 py-1 rounded-md transition ${
                                    qType === "MULTIPLE_CHOICE"
                                      ? "bg-white text-slate-900 shadow-sm"
                                      : "text-slate-600 hover:text-slate-900"
                                  }`}
                                >
                                  Opción Múltiple
                                </button>
                                <button
                                  type="button"
                                  onClick={() => changeQuizType(mIdx, lIdx, qIdx, "TRUE_FALSE")}
                                  className={`px-2.5 py-1 rounded-md transition ${
                                    qType === "TRUE_FALSE"
                                      ? "bg-white text-slate-900 shadow-sm"
                                      : "text-slate-600 hover:text-slate-900"
                                  }`}
                                >
                                  Falso / Verdadero
                                </button>
                                <button
                                  type="button"
                                  onClick={() => changeQuizType(mIdx, lIdx, qIdx, "OPEN")}
                                  className={`px-2.5 py-1 rounded-md transition ${
                                    qType === "OPEN"
                                      ? "bg-white text-slate-900 shadow-sm"
                                      : "text-slate-600 hover:text-slate-900"
                                  }`}
                                >
                                  Pregunta Abierta
                                </button>
                              </div>
                            </div>

                            {/* ENUNCIADO */}
                            <input
                              type="text"
                              value={q.question}
                              onChange={(e) => {
                                const updated = [...lesson.quizzes];
                                updated[qIdx].question = e.target.value;
                                updateLessonField(mIdx, lIdx, "quizzes", updated);
                              }}
                              placeholder="Enunciado de la pregunta o reflexión..."
                              className="text-xs font-bold bg-white border border-slate-200 px-3.5 py-2 rounded-xl w-full"
                            />

                            {/* VISTA SEGÚN TIPO */}
                            {qType === "MULTIPLE_CHOICE" && (
                              <div className="space-y-2 pt-1">
                                <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase">
                                  <span>Opciones de respuesta (Marca la correcta)</span>
                                  <button
                                    type="button"
                                    onClick={() => addQuizOption(mIdx, lIdx, qIdx)}
                                    className="text-secondary-600 hover:text-secondary-700 text-[10px] font-bold"
                                  >
                                    + Agregar Opción
                                  </button>
                                </div>

                                {q.options?.map((opt: string, optIdx: number) => (
                                  <div key={optIdx} className="flex items-center gap-2 text-xs">
                                    <input
                                      type="radio"
                                      name={`edit-quiz-${mIdx}-${lIdx}-${qIdx}`}
                                      checked={q.correctOptionIndex === optIdx}
                                      onChange={() => {
                                        const updated = [...lesson.quizzes];
                                        updated[qIdx].correctOptionIndex = optIdx;
                                        updateLessonField(mIdx, lIdx, "quizzes", updated);
                                      }}
                                      className="accent-secondary-600 w-4 h-4 cursor-pointer"
                                      title="Marcar como respuesta correcta"
                                    />
                                    <input
                                      type="text"
                                      value={opt}
                                      onChange={(e) => {
                                        const updated = [...lesson.quizzes];
                                        updated[qIdx].options[optIdx] = e.target.value;
                                        updateLessonField(mIdx, lIdx, "quizzes", updated);
                                      }}
                                      placeholder={`Opción ${String.fromCharCode(65 + optIdx)}`}
                                      className="bg-white border border-slate-200 px-3 py-1.5 rounded-lg w-full text-xs font-medium"
                                    />
                                    {q.options.length > 2 && (
                                      <button
                                        type="button"
                                        onClick={() => removeQuizOption(mIdx, lIdx, qIdx, optIdx)}
                                        className="text-slate-400 hover:text-red-500 p-1"
                                        title="Eliminar opción"
                                      >
                                        <Trash2 size={13} />
                                      </button>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}

                            {qType === "TRUE_FALSE" && (
                              <div className="space-y-1.5 pt-1">
                                <span className="text-[11px] font-bold text-slate-500 uppercase block">
                                  Selecciona la respuesta correcta:
                                </span>
                                <div className="grid grid-cols-2 gap-3">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const updated = [...lesson.quizzes];
                                      updated[qIdx].options = ["Verdadero", "Falso"];
                                      updated[qIdx].correctOptionIndex = 0;
                                      updateLessonField(mIdx, lIdx, "quizzes", updated);
                                    }}
                                    className={`py-2.5 px-4 rounded-xl text-xs font-gobold uppercase tracking-wide border transition flex items-center justify-center gap-2 ${
                                      q.correctOptionIndex === 0
                                        ? "bg-emerald-600 border-emerald-600 text-white shadow-sm"
                                        : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                                    }`}
                                  >
                                    <Check size={14} />
                                    Verdadero {q.correctOptionIndex === 0 && "(Correcta)"}
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const updated = [...lesson.quizzes];
                                      updated[qIdx].options = ["Verdadero", "Falso"];
                                      updated[qIdx].correctOptionIndex = 1;
                                      updateLessonField(mIdx, lIdx, "quizzes", updated);
                                    }}
                                    className={`py-2.5 px-4 rounded-xl text-xs font-gobold uppercase tracking-wide border transition flex items-center justify-center gap-2 ${
                                      q.correctOptionIndex === 1
                                        ? "bg-red-600 border-red-600 text-white shadow-sm"
                                        : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                                    }`}
                                  >
                                    <Check size={14} />
                                    Falso {q.correctOptionIndex === 1 && "(Correcta)"}
                                  </button>
                                </div>
                              </div>
                            )}

                            {qType === "OPEN" && (
                              <div className="bg-white p-3 rounded-xl border border-slate-200/80 text-xs text-slate-600 space-y-1">
                                <div className="flex items-center gap-1.5 font-bold text-slate-800">
                                  <HelpCircle size={14} className="text-secondary-600" />
                                  Respuesta Abierta / Reflexión Personal
                                </div>
                                <p className="text-[11px] text-slate-500">
                                  El estudiante escribirá su propia respuesta o compromiso de vida en un campo de texto abierto para su posterior revisión discipular.
                                </p>
                              </div>
                            )}

                            {/* EXPLICACIÓN O RETROALIMENTACIÓN */}
                            <div className="pt-1">
                              <input
                                type="text"
                                value={q.explanation || ""}
                                onChange={(e) => {
                                  const updated = [...lesson.quizzes];
                                  updated[qIdx].explanation = e.target.value;
                                  updateLessonField(mIdx, lIdx, "quizzes", updated);
                                }}
                                placeholder="Explicación bíblica o guía de respuesta (opcional)..."
                                className="text-[11px] bg-white border border-slate-200 px-3 py-1.5 rounded-lg w-full text-slate-600"
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* BOTÓN FINAL */}
        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="bg-slate-900 text-white font-gobold px-10 py-4 rounded-2xl text-sm uppercase tracking-widest hover:bg-secondary-600 transition shadow-xl disabled:opacity-50"
          >
            {saving ? "Guardando..." : "Guardar Cambios"}
          </button>
        </div>
      </form>
    </div>
  );
}
