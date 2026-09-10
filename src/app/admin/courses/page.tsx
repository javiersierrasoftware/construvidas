"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  BookOpen,
  Plus,
  Edit,
  Trash2,
  Users,
  Eye,
  Layers,
  CheckCircle,
  XCircle,
  Sparkles,
  Award,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminCoursesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchAdminCourses = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/courses?admin=true");
      const data = await res.json();
      if (Array.isArray(data)) {
        setCourses(data);
      }
    } catch (err) {
      console.error("Error al obtener cursos admin:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (session?.user?.role !== "ADMIN") {
      router.push("/dashboard");
    } else {
      fetchAdminCourses();
    }
  }, [session, status]);

  const handleDeleteCourse = async (id: string, title: string) => {
    if (!confirm(`¿Estás seguro de eliminar el curso "${title}"?`)) return;

    try {
      setDeletingId(id);
      const res = await fetch(`/api/courses/${id}`, { method: "DELETE" });
      if (res.ok) {
        setCourses((prev) => prev.filter((c) => c._id !== id));
      } else {
        alert("No se pudo eliminar el curso");
      }
    } catch (err) {
      console.error("Error al eliminar curso:", err);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* ENCABEZADO */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
          <div>
            <span className="text-[10px] font-gobold text-secondary-600 uppercase tracking-[0.3em] block mb-1">
              Panel de Administración
            </span>
            <h1 className="text-3xl md:text-4xl font-gobold text-slate-900 uppercase tracking-tight">
              Gestión de Cursos y Formación
            </h1>
            <p className="text-slate-500 text-sm font-medium">
              Crea módulos, temas, versículos, evaluaciones y realiza seguimiento a tus discípulos.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin/courses/create"
              className="bg-slate-900 text-white font-gobold px-6 py-3.5 rounded-2xl text-xs uppercase tracking-widest hover:bg-secondary-600 transition shadow-lg flex items-center gap-2"
            >
              <Plus size={18} />
              Crear Nuevo Curso
            </Link>
          </div>
        </div>

        {/* LISTADO DE CURSOS */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white h-24 rounded-2xl animate-pulse border border-slate-200" />
            ))}
          </div>
        ) : courses.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
            <BookOpen size={48} className="mx-auto text-slate-300" />
            <h3 className="text-xl font-gobold uppercase text-slate-800">No hay cursos creados aún</h3>
            <p className="text-slate-500 text-sm">Empieza creando el primer curso de discipulado para tu iglesia.</p>
            <Link
              href="/admin/courses/create"
              className="inline-block bg-slate-900 text-white font-gobold px-6 py-3 rounded-2xl text-xs uppercase tracking-widest hover:bg-secondary-600 transition"
            >
              Crear Curso
            </Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {courses.map((course) => {
              const moduleCount = course.modules ? course.modules.length : 0;
              return (
                <div
                  key={course._id}
                  className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row items-center justify-between gap-6"
                >
                  <div className="flex items-center gap-5 w-full md:w-auto">
                    <div className="relative h-20 w-24 rounded-2xl overflow-hidden bg-slate-900 flex-shrink-0 border border-slate-100">
                      <Image
                        src={course.coverImage}
                        alt={course.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-gobold text-secondary-600 bg-secondary-50 px-2 py-0.5 rounded-full uppercase tracking-widest">
                          {course.category}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                            course.isPublished
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-amber-50 text-amber-700 border border-amber-200"
                          }`}
                        >
                          {course.isPublished ? "Publicado" : "Borrador"}
                        </span>
                        {course.rewardFruits > 0 && (
                          <span className="text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Award size={11} className="text-amber-600" />
                            {course.rewardFruits} Frutos
                          </span>
                        )}
                        {course.enablesRoles && course.enablesRoles.length > 0 && (
                          <span className="text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <ShieldCheck size={11} className="text-purple-600" />
                            {course.enablesRoles.length} {course.enablesRoles.length === 1 ? "Rol" : "Roles"}
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-gobold text-slate-900 uppercase">
                        {course.title}
                      </h3>
                      {course.goal && (
                        <p className="text-xs text-slate-500 line-clamp-1 italic">
                          🎯 Meta: {course.goal}
                        </p>
                      )}
                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-semibold">
                        <span>{moduleCount} Módulos</span>
                        <span>•</span>
                        <span>{course.totalLessons || 0} Temas</span>
                        <span>•</span>
                        <span>Nivel {course.level}</span>
                        {course.durationHours && (
                          <>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Clock size={12} className="text-slate-400" />
                              {course.durationHours}
                            </span>
                          </>
                        )}
                        {course.instructor && (
                          <>
                            <span>•</span>
                            <span className="text-slate-600 italic">
                              {course.instructor}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* ACCIONES ADMIN */}
                  <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end pt-4 md:pt-0 border-t md:border-t-0 border-slate-100">
                    <Link
                      href={`/admin/courses/${course._id}/students`}
                      className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-gobold uppercase tracking-wider transition flex items-center gap-2"
                    >
                      <Users size={16} className="text-slate-600" />
                      Seguimiento Estudiantes
                    </Link>

                    <Link
                      href={`/cursos/${course._id}`}
                      target="_blank"
                      className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition"
                      title="Ver vista previa"
                    >
                      <Eye size={18} />
                    </Link>

                    <Link
                      href={`/admin/courses/${course._id}/edit`}
                      className="p-2.5 bg-slate-900 text-white hover:bg-secondary-600 rounded-xl transition shadow-sm"
                      title="Editar Curso"
                    >
                      <Edit size={18} />
                    </Link>

                    <button
                      onClick={() => handleDeleteCourse(course._id, course.title)}
                      disabled={deletingId === course._id}
                      className="p-2.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl transition"
                      title="Eliminar Curso"
                    >
                      <Trash2 size={18} />
                    </button>
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
