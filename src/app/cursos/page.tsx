"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, Layers, CheckCircle2, PlayCircle, Sparkles, UserCheck, ArrowRight, Award, Clock, ShieldCheck } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function CursosPage() {
  const { data: session } = useSession();
  const router = useRouter();

  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState("Todos");
  const [enrollingId, setEnrollingId] = useState<string | null>(null);

  const categories = ["Todos", "Fundamentos", "Discipulado", "Liderazgo", "Vida Cristiana"];

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/courses?category=${encodeURIComponent(categoryFilter)}`);
      const data = await res.json();

      if (Array.isArray(data)) {
        if (data.length === 0 && categoryFilter === "Todos") {
          // Trigger seed automatically if empty
          await fetch("/api/courses/seed", { method: "POST" });
          const resSeed = await fetch("/api/courses");
          const seedData = await resSeed.json();
          setCourses(Array.isArray(seedData) ? seedData : []);
        } else {
          setCourses(data);
        }
      }
    } catch (err) {
      console.error("Error cargando cursos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [categoryFilter]);

  const handleEnroll = async (courseId: string) => {
    if (!session) {
      router.push(`/login?callbackUrl=/cursos/${courseId}`);
      return;
    }

    try {
      setEnrollingId(courseId);
      const res = await fetch(`/api/courses/${courseId}/enroll`, {
        method: "POST",
      });

      if (res.ok) {
        router.push(`/cursos/${courseId}`);
      } else {
        const errorData = await res.json();
        alert(errorData.message || "No se pudo realizar la inscripción.");
      }
    } catch (error) {
      console.error("Error al inscribirse:", error);
    } finally {
      setEnrollingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* HERO BANNER DE FORMACIÓN */}
        <div className="relative bg-slate-900 rounded-[2.5rem] p-8 md:p-14 text-white overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-secondary-500/20 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary-500/20 border border-secondary-500/30 rounded-full text-secondary-300 text-xs font-gobold uppercase tracking-widest">
              <Sparkles size={16} />
              Plataforma Virtual de Formación en Cristo
            </div>
            <h1 className="text-4xl md:text-6xl font-gobold uppercase tracking-tight leading-tight">
              Creciendo juntos en <span className="text-secondary-400">la Palabra</span> y la Verdad
            </h1>
            <p className="text-slate-300 text-base md:text-lg font-medium leading-relaxed">
              Explora nuestros cursos estructurados por módulos, enseñanzas en video, versículos bíblicos y evaluaciones guiadas para transformar tu vida espiritual.
            </p>
            {session && (
              <div className="pt-2 flex flex-wrap gap-4">
                <Link
                  href="/cursos/mis-cursos"
                  className="bg-white text-slate-900 font-gobold px-6 py-3.5 rounded-2xl text-xs uppercase tracking-widest hover:bg-secondary-400 transition-all shadow-lg flex items-center gap-2"
                >
                  <UserCheck size={18} />
                  Mis Cursos Inscritos
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* FILTROS POR CATEGORÍA */}
        <div className="flex flex-wrap items-center gap-3 border-b border-slate-200 pb-4">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-2">Categorías:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-5 py-2.5 rounded-2xl text-xs font-gobold uppercase tracking-wider transition-all ${
                categoryFilter === cat
                  ? "bg-slate-900 text-white shadow-md"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* TARJETAS DE CURSOS */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-3xl p-6 h-96 animate-pulse border border-slate-200" />
            ))}
          </div>
        ) : courses.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
            <BookOpen size={48} className="mx-auto text-slate-300" />
            <h3 className="text-xl font-gobold uppercase text-slate-800">No hay cursos disponibles</h3>
            <p className="text-slate-500 text-sm">No encontramos cursos en esta categoría por el momento.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => {
              const enrolled = course.userEnrollment?.enrolled;
              const progress = course.userEnrollment?.progressPercent || 0;
              const moduleCount = course.modules ? course.modules.length : 0;

              return (
                <div
                  key={course._id}
                  className="bg-white rounded-[2rem] border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col group hover:-translate-y-1"
                >
                  {/* IMAGEN DE PORTADA */}
                  <div className="relative h-48 w-full bg-slate-900 overflow-hidden">
                    <Image
                      src={course.coverImage}
                      alt={course.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                    
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                      <span className="bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-gobold uppercase tracking-widest px-3 py-1 rounded-full border border-white/10">
                        {course.category}
                      </span>
                      <span className="bg-secondary-500/90 text-slate-950 text-[10px] font-gobold uppercase tracking-widest px-3 py-1 rounded-full">
                        {course.level}
                      </span>
                      {course.rewardFruits > 0 && (
                        <span className="bg-amber-400 text-slate-950 text-[10px] font-gobold uppercase tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                          <Award size={12} className="text-slate-900" />
                          +{course.rewardFruits} Frutos
                        </span>
                      )}
                    </div>

                    {enrolled && (
                      <div className="absolute bottom-3 right-4 bg-emerald-500/90 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1">
                        <CheckCircle2 size={12} />
                        Inscrito ({progress}%)
                      </div>
                    )}
                  </div>

                  {/* CONTENIDO DEL CURSO */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <h3 className="text-xl font-gobold uppercase text-slate-900 group-hover:text-secondary-600 transition-colors leading-snug">
                        {course.title}
                      </h3>
                      {course.instructor && (
                        <p className="text-xs font-semibold text-secondary-700">
                          Instructor: {course.instructor}
                        </p>
                      )}
                      <p className="text-slate-600 text-sm font-medium leading-relaxed line-clamp-3">
                        {course.description}
                      </p>

                      {course.goal && (
                        <div className="bg-secondary-50/70 border border-secondary-100 rounded-xl p-2.5 flex items-start gap-2 text-secondary-900 text-xs">
                          <span className="text-secondary-600 font-bold flex-shrink-0">🎯 Meta:</span>
                          <span className="font-medium text-[11px] leading-tight line-clamp-2">
                            {course.goal}
                          </span>
                        </div>
                      )}

                      {course.enablesDescription && (
                        <div className="bg-purple-50/70 border border-purple-100 rounded-xl p-2.5 flex items-start gap-2 text-purple-900 text-xs">
                          <ShieldCheck size={14} className="text-purple-600 flex-shrink-0 mt-0.5" />
                          <span className="font-medium text-[11px] leading-tight line-clamp-2">
                            {course.enablesDescription}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* ESTADÍSTICAS */}
                    <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 font-semibold">
                      <div className="flex items-center gap-1.5">
                        <Layers size={16} className="text-secondary-600" />
                        <span>{moduleCount} Módulos</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <BookOpen size={16} className="text-secondary-600" />
                        <span>{course.totalLessons} Temas</span>
                      </div>
                      {course.durationHours && (
                        <div className="flex items-center gap-1.5">
                          <Clock size={15} className="text-secondary-600" />
                          <span>{course.durationHours}</span>
                        </div>
                      )}
                    </div>

                    {/* BARRA DE PROGRESO SI ESTÁ INSCRITO */}
                    {enrolled && (
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-[11px] font-bold text-slate-500">
                          <span>Tu Avance</span>
                          <span>{progress}%</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-secondary-500 h-full transition-all duration-500"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* ACCIÓN */}
                    <div className="pt-2">
                      {enrolled ? (
                        <Link
                          href={`/cursos/${course._id}`}
                          className="w-full bg-slate-900 text-white font-gobold py-3.5 rounded-2xl flex items-center justify-center gap-2 text-xs uppercase tracking-widest hover:bg-secondary-600 transition-all shadow-md"
                        >
                          <PlayCircle size={16} />
                          Continuar Curso
                        </Link>
                      ) : (
                        <button
                          onClick={() => handleEnroll(course._id)}
                          disabled={enrollingId === course._id}
                          className="w-full bg-secondary-500 text-slate-950 font-gobold py-3.5 rounded-2xl flex items-center justify-center gap-2 text-xs uppercase tracking-widest hover:bg-secondary-400 transition-all shadow-md disabled:opacity-50"
                        >
                          {enrollingId === course._id ? (
                            "Inscribiendo..."
                          ) : (
                            <>
                              Inscribirme al Curso
                              <ArrowRight size={16} />
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
