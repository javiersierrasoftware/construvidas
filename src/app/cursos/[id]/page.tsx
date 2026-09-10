"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  BookOpen,
  CheckCircle2,
  Circle,
  Play,
  FileText,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Award,
  Download,
  ExternalLink,
  HelpCircle,
  Sparkles,
  Menu,
  X,
  Lock,
  Target,
} from "lucide-react";
import RichLessonContent from "@/components/RichLessonEditor/../RichLessonContent";

export default function CourseViewerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: courseId } = use(params);
  const { data: session } = useSession();
  const router = useRouter();

  const [course, setCourse] = useState<any>(null);
  const [enrollment, setEnrollment] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Selected topic/lesson
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);

  // Quiz state for current active lesson
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [openAnswers, setOpenAnswers] = useState<Record<number, string>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState<{ score: number; total: number } | null>(null);

  const fetchCourseData = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/courses/${courseId}`);
      if (!res.ok) {
        throw new Error("Curso no encontrado");
      }
      const data = await res.json();
      setCourse(data);
      setEnrollment(data.userEnrollment || null);
    } catch (err) {
      console.error("Error al cargar curso:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourseData();
  }, [courseId]);

  // Reset quiz answers when active lesson changes
  useEffect(() => {
    setSelectedAnswers({});
    setOpenAnswers({});
    setQuizSubmitted(false);
    setQuizScore(null);
  }, [activeModuleIndex, activeLessonIndex]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center pt-20">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-secondary-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="font-gobold text-sm uppercase tracking-widest text-slate-300">Cargando Plataforma Virtual...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center pt-28 pb-20 px-4">
        <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-4 max-w-md">
          <BookOpen size={48} className="mx-auto text-slate-400" />
          <h2 className="text-2xl font-gobold uppercase text-slate-900">Curso no encontrado</h2>
          <p className="text-slate-500 text-sm">El curso solicitado no existe o fue desactivado.</p>
          <Link
            href="/cursos"
            className="inline-block bg-slate-900 text-white font-gobold px-6 py-3 rounded-2xl text-xs uppercase tracking-widest hover:bg-secondary-600 transition"
          >
            Volver a Cursos
          </Link>
        </div>
      </div>
    );
  }

  const currentModule = course.modules?.[activeModuleIndex];
  const currentLesson = currentModule?.lessons?.[activeLessonIndex];
  const completedLessons: string[] = enrollment?.completedLessons || [];
  const isLessonCompleted = currentLesson ? completedLessons.includes(currentLesson._id) : false;

  const totalLessons = course.totalLessons || 1;
  const progressPercent = enrollment?.progressPercent || 0;

  // Toggle mark lesson as completed
  const handleToggleComplete = async (completedState?: boolean) => {
    if (!session) {
      router.push(`/login?callbackUrl=/cursos/${courseId}`);
      return;
    }

    const nextState = completedState !== undefined ? completedState : !isLessonCompleted;

    try {
      const res = await fetch(`/api/courses/${course._id}/progress`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lessonId: currentLesson._id,
          completed: nextState,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setEnrollment(data.enrollment);
      }
    } catch (err) {
      console.error("Error actualizando progreso:", err);
    }
  };

  // Submit quiz answers
  const handleQuizSubmit = async () => {
    if (!currentLesson?.quizzes || currentLesson.quizzes.length === 0) return;

    let score = 0;
    currentLesson.quizzes.forEach((q: any, idx: number) => {
      const qType = q.type || "MULTIPLE_CHOICE";
      if (qType === "OPEN") {
        if (openAnswers[idx]?.trim()) {
          score += 1;
        }
      } else {
        if (selectedAnswers[idx] === q.correctOptionIndex) {
          score += 1;
        }
      }
    });

    setQuizSubmitted(true);
    setQuizScore({ score, total: currentLesson.quizzes.length });

    // Save quiz result & auto mark lesson as completed
    if (session) {
      try {
        const res = await fetch(`/api/courses/${course._id}/progress`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            lessonId: currentLesson._id,
            completed: true,
            quizScore: score,
            totalQuestions: currentLesson.quizzes.length,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          setEnrollment(data.enrollment);
        }
      } catch (err) {
        console.error("Error guardando evaluación:", err);
      }
    }
  };

  // Navigate next lesson
  const handleNextLesson = () => {
    if (!currentModule) return;
    if (activeLessonIndex < (currentModule.lessons?.length || 0) - 1) {
      setActiveLessonIndex((prev) => prev + 1);
    } else if (activeModuleIndex < (course.modules?.length || 0) - 1) {
      setActiveModuleIndex((prev) => prev + 1);
      setActiveLessonIndex(0);
    }
  };

  // Navigate previous lesson
  const handlePrevLesson = () => {
    if (activeLessonIndex > 0) {
      setActiveLessonIndex((prev) => prev - 1);
    } else if (activeModuleIndex > 0) {
      const prevModIndex = activeModuleIndex - 1;
      setActiveModuleIndex(prevModIndex);
      const prevMod = course.modules[prevModIndex];
      setActiveLessonIndex((prevMod.lessons?.length || 1) - 1);
    }
  };

  // Helper to get youtube embed URL if raw YouTube link is provided
  const getEmbedVideoUrl = (url?: string) => {
    if (!url) return null;
    if (url.includes("embed/")) return url;
    if (url.includes("youtube.com/watch?v=")) {
      const id = url.split("v=")[1]?.split("&")[0];
      return `https://www.youtube.com/embed/${id}`;
    }
    if (url.includes("youtu.be/")) {
      const id = url.split("youtu.be/")[1]?.split("?")[0];
      return `https://www.youtube.com/embed/${id}`;
    }
    return url;
  };

  const videoEmbedUrl = getEmbedVideoUrl(currentLesson?.videoUrl);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 pt-16 flex flex-col">
      {/* BARRA SUPERIOR DE AULA VIRTUAL */}
      <header className="bg-slate-950 border-b border-slate-800 px-6 py-4 flex items-center justify-between sticky top-16 z-30">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition"
            title="Alternar Temario"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
              <Link href="/cursos" className="hover:text-secondary-400 transition">
                Cursos
              </Link>
              <span>/</span>
              <span className="text-secondary-400 truncate max-w-[200px] md:max-w-xs">{course.title}</span>
            </div>
            <h1 className="text-sm md:text-base font-gobold text-white uppercase tracking-tight truncate max-w-md">
              {currentLesson ? currentLesson.title : "Selecciona un tema"}
            </h1>
          </div>
        </div>

        {/* BARRA DE AVANCE DEL ESTUDIANTE */}
        <div className="hidden md:flex items-center gap-6">
          <div className="text-right space-y-1">
            <div className="text-[11px] font-gobold text-slate-400 uppercase tracking-widest">
              Tu Progreso: <span className="text-emerald-400">{progressPercent}%</span>
            </div>
            <div className="w-44 bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 h-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
          {!enrollment && (
            <button
              onClick={() => handleToggleComplete(true)}
              className="bg-secondary-500 text-slate-950 font-gobold px-4 py-2 rounded-xl text-xs uppercase tracking-widest hover:bg-secondary-400 transition"
            >
              Inscribirme
            </button>
          )}
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* TEMARIO / BARRA LATERAL DEL CURSO */}
        <aside
          className={`${
            sidebarOpen ? "w-full md:w-80 lg:w-96" : "w-0 hidden"
          } bg-slate-950 border-r border-slate-800 transition-all duration-300 flex flex-col flex-shrink-0 z-20`}
        >
          <div className="p-6 border-b border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-gobold uppercase tracking-widest text-slate-400">
                Temario del Curso
              </span>
              <span className="text-xs font-bold px-3 py-1 bg-slate-800 text-slate-300 rounded-full">
                {course.modules?.length || 0} Módulos
              </span>
            </div>

            {course.rewardFruits > 0 && (
              <div className="bg-amber-400/10 border border-amber-400/20 rounded-xl p-2.5 flex items-center justify-between text-xs">
                <span className="text-amber-300 font-medium flex items-center gap-1.5">
                  <Award size={14} className="text-amber-400" />
                  Recompensa al completar:
                </span>
                <span className="font-gobold text-amber-400">+{course.rewardFruits} Frutos</span>
              </div>
            )}

            {course.goal && (
              <div className="bg-secondary-950/40 border border-secondary-800/40 rounded-xl p-2.5 text-[11px] text-secondary-200">
                <div className="font-gobold uppercase text-[10px] text-secondary-300 tracking-wider mb-0.5 flex items-center gap-1">
                  <Target size={11} className="text-secondary-400" />
                  Meta del Curso
                </div>
                {course.goal}
              </div>
            )}

            {course.enablesDescription && (
              <div className="bg-purple-900/20 border border-purple-800/40 rounded-xl p-2.5 text-[11px] text-purple-200">
                <div className="font-gobold uppercase text-[10px] text-purple-300 tracking-wider mb-0.5">
                  Habilitación Ministerial
                </div>
                {course.enablesDescription}
              </div>
            )}

            <div className="md:hidden space-y-1">
              <div className="flex justify-between text-xs font-bold text-slate-400">
                <span>Progreso</span>
                <span className="text-emerald-400">{progressPercent}%</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-500 h-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {course.modules?.map((module: any, mIdx: number) => (
              <div key={module._id || mIdx} className="space-y-3">
                <div className="px-2 text-xs font-gobold text-secondary-400 uppercase tracking-widest flex items-center justify-between">
                  <span>
                    Módulo {mIdx + 1}: {module.title}
                  </span>
                </div>

                <div className="space-y-1.5">
                  {module.lessons?.map((lesson: any, lIdx: number) => {
                    const isActive = mIdx === activeModuleIndex && lIdx === activeLessonIndex;
                    const isDone = completedLessons.includes(lesson._id);

                    return (
                      <button
                        key={lesson._id || lIdx}
                        onClick={() => {
                          setActiveModuleIndex(mIdx);
                          setActiveLessonIndex(lIdx);
                          if (window.innerWidth < 768) setSidebarOpen(false);
                        }}
                        className={`w-full text-left p-3.5 rounded-2xl text-xs font-medium transition-all flex items-start gap-3 border ${
                          isActive
                            ? "bg-slate-800 text-white border-secondary-500/50 shadow-lg"
                            : "bg-slate-900/60 text-slate-300 border-slate-800/80 hover:bg-slate-800/60"
                        }`}
                      >
                        <span className="mt-0.5 flex-shrink-0">
                          {isDone ? (
                            <CheckCircle2 size={18} className="text-emerald-400" />
                          ) : (
                            <Circle size={18} className="text-slate-600" />
                          )}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className={`font-semibold line-clamp-2 ${isActive ? "text-white" : ""}`}>
                            {lesson.title}
                          </p>
                          <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-500">
                            {lesson.videoUrl && <span className="flex items-center gap-1"><Play size={10} /> Video</span>}
                            {lesson.bibleVerses?.length > 0 && <span className="flex items-center gap-1"><Bookmark size={10} /> Biblia</span>}
                            {lesson.quizzes?.length > 0 && <span className="flex items-center gap-1"><HelpCircle size={10} /> Eval</span>}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* ÁREA PRINCIPAL DE CONTENIDO */}
        <main className="flex-1 overflow-y-auto bg-slate-900 p-4 md:p-10 space-y-10">
          {currentLesson ? (
            <div className="max-w-4xl mx-auto space-y-10 pb-20">
              {/* VIDEO EXPLICATIVO */}
              {videoEmbedUrl ? (
                <div className="aspect-video w-full rounded-3xl overflow-hidden border border-slate-800 shadow-2xl bg-black">
                  <iframe
                    className="w-full h-full"
                    src={videoEmbedUrl}
                    title={currentLesson.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="bg-slate-800/50 border border-slate-800 rounded-3xl p-8 text-center space-y-2">
                  <FileText size={36} className="mx-auto text-slate-500" />
                  <h3 className="text-base font-gobold text-slate-300 uppercase">Lección Escrita y Estudio Bíblico</h3>
                  <p className="text-xs text-slate-400">Lee atentamente los versículos y el material de esta enseñanza.</p>
                </div>
              )}

              {/* ENCABEZADO DE LA LECCIÓN */}
              <div className="space-y-4 border-b border-slate-800 pb-8">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <span className="text-xs font-gobold text-secondary-400 uppercase tracking-widest px-3 py-1 bg-secondary-500/10 rounded-full border border-secondary-500/20">
                    Módulo {activeModuleIndex + 1} - Tema {activeLessonIndex + 1}
                  </span>

                  <button
                    onClick={() => handleToggleComplete()}
                    className={`px-5 py-2.5 rounded-2xl text-xs font-gobold uppercase tracking-widest transition-all flex items-center gap-2 ${
                      isLessonCompleted
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                        : "bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700"
                    }`}
                  >
                    <CheckCircle2 size={16} className={isLessonCompleted ? "text-emerald-400" : "text-slate-500"} />
                    {isLessonCompleted ? "Completado" : "Marcar como Completado"}
                  </button>
                </div>

                <h1 className="text-2xl md:text-4xl font-gobold text-white uppercase tracking-tight">
                  {currentLesson.title}
                </h1>

                {currentLesson.content && (
                  <RichLessonContent content={currentLesson.content} className="pt-2" />
                )}
              </div>

              {/* SECCIÓN VERSÍCULOS BÍBLICOS ASOCIADOS */}
              {currentLesson.bibleVerses && currentLesson.bibleVerses.length > 0 && (
                <section className="space-y-6">
                  <div className="flex items-center gap-3">
                    <Bookmark className="text-secondary-400" size={24} />
                    <h2 className="text-xl font-gobold uppercase text-white tracking-wide">
                      Versículos Bíblicos del Tema
                    </h2>
                  </div>

                  <div className="grid gap-6">
                    {currentLesson.bibleVerses.map((verse: any, idx: number) => (
                      <div
                        key={idx}
                        className="bg-slate-950 border border-slate-800 rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-xl"
                      >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-secondary-500/10 rounded-full blur-2xl -mr-12 -mt-12"></div>
                        <div className="relative z-10 space-y-3">
                          <span className="text-xs font-gobold text-secondary-400 uppercase tracking-widest block">
                            📖 {verse.reference}
                          </span>
                          <p className="text-slate-200 text-lg italic leading-relaxed font-serif">
                            «{verse.text}»
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* MATERIALES Y RECURSOS DESCARGABLES */}
              {currentLesson.materials && currentLesson.materials.length > 0 && (
                <section className="space-y-6">
                  <div className="flex items-center gap-3">
                    <Download className="text-secondary-400" size={24} />
                    <h2 className="text-xl font-gobold uppercase text-white tracking-wide">
                      Materiales y Guías de Estudio
                    </h2>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {currentLesson.materials.map((mat: any, idx: number) => (
                      <a
                        key={idx}
                        href={mat.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-slate-800/80 border border-slate-700/80 hover:border-secondary-500/50 p-5 rounded-2xl flex items-center justify-between group transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-3 bg-slate-900 rounded-xl text-secondary-400">
                            <FileText size={20} />
                          </div>
                          <div>
                            <p className="text-sm font-gobold text-white uppercase group-hover:text-secondary-400 transition">
                              {mat.title}
                            </p>
                            <span className="text-[10px] text-slate-400 uppercase font-bold">
                              Formato: {mat.type || "PDF / Documento"}
                            </span>
                          </div>
                        </div>
                        <ExternalLink size={18} className="text-slate-500 group-hover:text-white transition" />
                      </a>
                    ))}
                  </div>
                </section>
              )}

              {/* EVALUACIÓN DE COMPRENSIÓN / QUIZZES */}
              {currentLesson.quizzes && currentLesson.quizzes.length > 0 && (
                <section className="bg-slate-950 border border-slate-800 rounded-3xl p-6 md:p-10 space-y-8 shadow-2xl">
                  <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                    <HelpCircle className="text-secondary-400" size={26} />
                    <div>
                      <h2 className="text-xl font-gobold uppercase text-white tracking-wide">
                        Evaluación de la Lección
                      </h2>
                      <p className="text-xs text-slate-400 font-medium">
                        Responde estas preguntas para afianzar lo aprendido.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-8">
                    {currentLesson.quizzes.map((quiz: any, qIdx: number) => {
                      const qType = quiz.type || "MULTIPLE_CHOICE";

                      return (
                        <div key={qIdx} className="space-y-4">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-gobold text-secondary-400 bg-secondary-950/60 px-2 py-0.5 rounded-md border border-secondary-800">
                              {qType === "OPEN" ? "Reflexión Abierta" : qType === "TRUE_FALSE" ? "Falso / Verdadero" : "Opción Múltiple"}
                            </span>
                          </div>
                          <p className="text-sm md:text-base font-gobold text-slate-200">
                            {qIdx + 1}. {quiz.question}
                          </p>

                          {/* TIPO: PREGUNTA ABIERTA */}
                          {qType === "OPEN" && (
                            <div className="space-y-2">
                              <textarea
                                rows={3}
                                disabled={quizSubmitted}
                                value={openAnswers[qIdx] || ""}
                                onChange={(e) =>
                                  setOpenAnswers((prev) => ({
                                    ...prev,
                                    [qIdx]: e.target.value,
                                  }))
                                }
                                placeholder="Escribe aquí tu respuesta y reflexión personal..."
                                className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 text-xs md:text-sm text-slate-100 outline-none focus:border-secondary-500 transition resize-y"
                              />
                              {quizSubmitted && (
                                <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold bg-emerald-950/40 border border-emerald-800/40 p-3 rounded-xl">
                                  <CheckCircle2 size={16} />
                                  Tu reflexión ha sido registrada con éxito para tu crecimiento espiritual.
                                </div>
                              )}
                            </div>
                          )}

                          {/* TIPO: FALSO / VERDADERO */}
                          {qType === "TRUE_FALSE" && (
                            <div className="grid grid-cols-2 gap-3">
                              {["Verdadero", "Falso"].map((label, optIdx) => {
                                const isSelected = selectedAnswers[qIdx] === optIdx;
                                const isCorrect = quiz.correctOptionIndex === optIdx;

                                let btnStyle = "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700";
                                if (quizSubmitted) {
                                  if (isCorrect) {
                                    btnStyle = "bg-emerald-950/80 border-emerald-500/80 text-emerald-200 font-bold";
                                  } else if (isSelected && !isCorrect) {
                                    btnStyle = "bg-red-950/80 border-red-500/80 text-red-200 font-bold";
                                  }
                                } else if (isSelected) {
                                  btnStyle = "bg-secondary-500/20 border-secondary-500 text-white font-bold";
                                }

                                return (
                                  <button
                                    key={optIdx}
                                    disabled={quizSubmitted}
                                    onClick={() =>
                                      setSelectedAnswers((prev) => ({
                                        ...prev,
                                        [qIdx]: optIdx,
                                      }))
                                    }
                                    className={`p-4 rounded-2xl border text-sm font-gobold uppercase tracking-wide transition-all flex items-center justify-center gap-2 ${btnStyle}`}
                                  >
                                    <span>{label}</span>
                                    {quizSubmitted && isCorrect && (
                                      <CheckCircle2 size={16} className="text-emerald-400" />
                                    )}
                                  </button>
                                );
                              })}
                            </div>
                          )}

                          {/* TIPO: OPCIÓN MÚLTIPLE */}
                          {qType === "MULTIPLE_CHOICE" && quiz.options && (
                            <div className="space-y-2.5">
                              {quiz.options.map((opt: string, oIdx: number) => {
                                const isSelected = selectedAnswers[qIdx] === oIdx;
                                const isCorrect = quiz.correctOptionIndex === oIdx;

                                let optionStyle = "bg-slate-900 border-slate-800 text-slate-300";
                                if (quizSubmitted) {
                                  if (isCorrect) {
                                    optionStyle = "bg-emerald-950/80 border-emerald-500/80 text-emerald-200 font-semibold";
                                  } else if (isSelected && !isCorrect) {
                                    optionStyle = "bg-red-950/80 border-red-500/80 text-red-200 font-semibold";
                                  }
                                } else if (isSelected) {
                                  optionStyle = "bg-secondary-500/20 border-secondary-500 text-white font-semibold";
                                }

                                return (
                                  <button
                                    key={oIdx}
                                    disabled={quizSubmitted}
                                    onClick={() =>
                                      setSelectedAnswers((prev) => ({
                                        ...prev,
                                        [qIdx]: oIdx,
                                      }))
                                    }
                                    className={`w-full text-left p-4 rounded-2xl border text-xs md:text-sm transition-all flex items-center justify-between ${optionStyle}`}
                                  >
                                    <span>{opt}</span>
                                    {quizSubmitted && isCorrect && (
                                      <CheckCircle2 size={18} className="text-emerald-400" />
                                    )}
                                  </button>
                                );
                              })}
                            </div>
                          )}

                          {quizSubmitted && quiz.explanation && (
                            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-xs text-slate-300 italic">
                              <span className="font-bold text-secondary-400 not-italic mr-1">Explicación:</span>
                              {quiz.explanation}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* RESULTADO Y ENVIAR */}
                  <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
                    {quizScore ? (
                      <div className="flex items-center gap-3">
                        <Award className="text-emerald-400" size={28} />
                        <div>
                          <span className="text-xs font-gobold uppercase text-slate-400">Resultado</span>
                          <p className="text-lg font-gobold text-white">
                            {quizScore.score} de {quizScore.total} Respuestas Correctas
                          </p>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={handleQuizSubmit}
                        disabled={Object.keys(selectedAnswers).length < currentLesson.quizzes.length}
                        className="bg-secondary-500 text-slate-950 font-gobold px-8 py-3.5 rounded-2xl text-xs uppercase tracking-widest hover:bg-secondary-400 transition shadow-lg disabled:opacity-50"
                      >
                        Enviar Evaluación
                      </button>
                    )}
                  </div>
                </section>
              )}

              {/* NAVEGACIÓN ENTRE LECCIONES */}
              <div className="pt-8 border-t border-slate-800 flex items-center justify-between gap-4">
                <button
                  onClick={handlePrevLesson}
                  disabled={activeModuleIndex === 0 && activeLessonIndex === 0}
                  className="px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl text-xs font-gobold uppercase tracking-widest transition flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={16} />
                  Anterior
                </button>

                <button
                  onClick={() => {
                    handleToggleComplete(true);
                    handleNextLesson();
                  }}
                  className="px-8 py-3.5 bg-secondary-500 hover:bg-secondary-400 text-slate-950 rounded-2xl text-xs font-gobold uppercase tracking-widest transition shadow-xl flex items-center gap-2"
                >
                  Siguiente Tema
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-slate-400 font-medium">Selecciona una lección del temario para comenzar.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
