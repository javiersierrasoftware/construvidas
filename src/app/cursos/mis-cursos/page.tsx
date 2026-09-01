"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, CheckCircle2, PlayCircle, Layers, ArrowLeft, Award } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function MisCursosPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?callbackUrl=/cursos/mis-cursos");
      return;
    }

    if (session?.user) {
      fetch("/api/courses")
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            const myEnrolled = data.filter((c: any) => c.userEnrollment?.enrolled);
            setCourses(myEnrolled);
          }
        })
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [session, status]);

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* ENCABEZADO */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
          <div className="space-y-2">
            <Link
              href="/cursos"
              className="inline-flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-slate-900 transition uppercase tracking-widest"
            >
              <ArrowLeft size={14} /> Volver al catálogo de cursos
            </Link>
            <h1 className="text-3xl md:text-4xl font-gobold text-slate-900 uppercase tracking-tight">
              Mis Cursos en Formación
            </h1>
            <p className="text-slate-500 text-sm font-medium">
              Hola, <span className="text-slate-900 font-bold">{session?.user?.name}</span>. Sigue avanzando en tu camino de fe.
            </p>
          </div>

          <div className="bg-slate-900 text-white p-6 rounded-2xl flex items-center gap-4 shadow-lg">
            <Award className="text-secondary-400" size={32} />
            <div>
              <span className="text-[10px] font-gobold text-slate-400 uppercase tracking-widest block">Inscripciones</span>
              <p className="text-xl font-gobold">{courses.length} Cursos Activos</p>
            </div>
          </div>
        </div>

        {/* LISTADO DE CURSOS */}
        {loading ? (
          <div className="grid md:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <div key={i} className="bg-white h-48 rounded-3xl animate-pulse border border-slate-200" />
            ))}
          </div>
        ) : courses.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
            <BookOpen size={48} className="mx-auto text-slate-300" />
            <h3 className="text-xl font-gobold uppercase text-slate-800">Aún no estás inscrito en ningún curso</h3>
            <p className="text-slate-500 text-sm max-w-md mx-auto">
              Explora nuestra Plataforma Virtual de Formación e inscríbete para iniciar tu proceso hoy.
            </p>
            <Link
              href="/cursos"
              className="inline-block bg-slate-900 text-white font-gobold px-8 py-3.5 rounded-2xl text-xs uppercase tracking-widest hover:bg-secondary-600 transition shadow-md"
            >
              Explorar Cursos
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {courses.map((course) => {
              const progress = course.userEnrollment?.progressPercent || 0;
              const isCompleted = course.userEnrollment?.status === "COMPLETADO";

              return (
                <div
                  key={course._id}
                  className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all space-y-5 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex gap-4 items-start">
                      <div className="relative h-20 w-24 rounded-2xl overflow-hidden bg-slate-900 flex-shrink-0 border border-slate-100">
                        <Image
                          src={course.coverImage}
                          alt={course.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] font-gobold text-secondary-600 bg-secondary-50 px-2.5 py-0.5 rounded-full uppercase tracking-widest">
                          {course.category}
                        </span>
                        <h3 className="text-lg font-gobold text-slate-900 uppercase leading-snug">
                          {course.title}
                        </h3>
                      </div>
                    </div>

                    <div className="space-y-1.5 pt-2">
                      <div className="flex justify-between text-xs font-bold text-slate-600">
                        <span>Avance del Curso</span>
                        <span className={isCompleted ? "text-emerald-600" : "text-slate-900"}>
                          {progress}% {isCompleted && "¡Completado!"}
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-500 ${
                            isCompleted ? "bg-emerald-500" : "bg-slate-900"
                          }`}
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <Link
                    href={`/cursos/${course._id}`}
                    className="w-full bg-slate-900 text-white font-gobold py-3.5 rounded-2xl flex items-center justify-center gap-2 text-xs uppercase tracking-widest hover:bg-secondary-600 transition shadow-md"
                  >
                    <PlayCircle size={16} />
                    {progress > 0 ? "Continuar Lección" : "Comenzar Lección"}
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
