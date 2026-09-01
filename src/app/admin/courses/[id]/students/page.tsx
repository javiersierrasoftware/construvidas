"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Users,
  CheckCircle2,
  Clock,
  Award,
  BookOpen,
  Search,
  Check,
  Mail,
  Send,
  X,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminCourseStudentsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: courseId } = use(params);
  const { data: session, status } = useSession();
  const router = useRouter();

  const [studentsData, setStudentsData] = useState<any[]>([]);
  const [courseTitle, setCourseTitle] = useState<string>("Curso");
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Modal Email State
  const [modalOpen, setModalOpen] = useState(false);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [sendingEmail, setSendingEmail] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (session?.user?.role !== "ADMIN") {
      router.push("/dashboard");
    } else {
      fetchData();
    }
  }, [courseId, session, status]);

  const fetchData = async () => {
    try {
      setLoading(true);

      // Fetch course details for header title
      if (courseId !== "all") {
        const cRes = await fetch(`/api/courses/${courseId}`);
        if (cRes.ok) {
          const cData = await cRes.json();
          setCourseTitle(cData.title || "Curso");
        }
      }

      // Fetch students enrollment data
      const url =
        courseId === "all"
          ? "/api/admin/courses/students"
          : `/api/admin/courses/students?courseId=${courseId}`;

      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setStudentsData(data);
      }
    } catch (err) {
      console.error("Error al cargar estudiantes:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSendBroadcast = async (e: React.FormEvent) => {
    e.preventDefault();
    setNotificationStatus(null);

    if (!emailSubject || !emailMessage) {
      alert("Ingresa el asunto y el mensaje del comunicado.");
      return;
    }

    try {
      setSendingEmail(true);
      const res = await fetch(`/api/admin/courses/${courseId}/notify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: emailSubject,
          message: emailMessage,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setNotificationStatus(data.message || "Notificación enviada con éxito.");
        setEmailSubject("");
        setEmailMessage("");
        setTimeout(() => {
          setModalOpen(false);
          setNotificationStatus(null);
        }, 2000);
      } else {
        alert(data.message || "Error al enviar correo.");
      }
    } catch (err: any) {
      console.error(err);
      alert("Error inesperado al enviar notificaciones.");
    } finally {
      setSendingEmail(false);
    }
  };

  const filtered = studentsData.filter(
    (item) =>
      item.student?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.student?.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* ENCABEZADO */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
          <div className="space-y-1">
            <Link
              href="/admin/courses"
              className="inline-flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-slate-900 transition uppercase tracking-widest"
            >
              <ArrowLeft size={14} /> Volver a cursos admin
            </Link>
            <h1 className="text-3xl md:text-4xl font-gobold text-slate-900 uppercase tracking-tight">
              Seguimiento de Discípulos
            </h1>
            <p className="text-slate-500 text-sm font-medium">
              Curso: <span className="text-slate-900 font-bold">{courseTitle}</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {courseId !== "all" && (
              <button
                onClick={() => setModalOpen(true)}
                className="bg-slate-900 text-white font-gobold px-6 py-3.5 rounded-2xl text-xs uppercase tracking-widest hover:bg-secondary-600 transition shadow-lg flex items-center gap-2"
              >
                <Mail size={16} />
                Enviar Recordatorio / Email
              </button>
            )}

            <div className="bg-slate-900 text-white p-6 rounded-2xl flex items-center gap-4 shadow-lg">
              <Users className="text-secondary-400" size={32} />
              <div>
                <span className="text-[10px] font-gobold text-slate-400 uppercase tracking-widest block">
                  Total Inscritos
                </span>
                <p className="text-xl font-gobold">{studentsData.length} Estudiantes</p>
              </div>
            </div>
          </div>
        </div>

        {/* BUSCADOR */}
        <div className="relative max-w-md">
          <Search size={18} className="absolute left-4 top-3.5 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por nombre o correo..."
            className="w-full bg-white border border-slate-200 rounded-2xl pl-11 pr-4 py-3 text-slate-900 focus:border-secondary-500 outline-none font-medium shadow-sm text-sm"
          />
        </div>

        {/* TABLA / TARJETAS DE ESTUDIANTES */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white h-28 rounded-3xl animate-pulse border border-slate-200" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
            <Users size={48} className="mx-auto text-slate-300" />
            <h3 className="text-xl font-gobold uppercase text-slate-800">
              No hay estudiantes inscritos aún
            </h3>
            <p className="text-slate-500 text-sm">
              Tan pronto los discípulos se inscriban al curso, su avance y evaluaciones aparecerán aquí.
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {filtered.map((item) => {
              const progress = item.progressPercent || 0;
              const isDone = item.status === "COMPLETADO";

              return (
                <div
                  key={item.id}
                  className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-2xl bg-slate-900 text-white font-gobold text-lg flex items-center justify-center">
                        {item.student?.name?.charAt(0)?.toUpperCase() || "D"}
                      </div>
                      <div>
                        <h3 className="text-lg font-gobold text-slate-900 uppercase">
                          {item.student?.name}
                        </h3>
                        <p className="text-xs text-slate-500 font-medium">{item.student?.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`text-xs font-gobold px-4 py-1.5 rounded-full uppercase tracking-wider ${
                          isDone
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-blue-50 text-blue-700 border border-blue-200"
                        }`}
                      >
                        {isDone ? "Completado" : "En Progreso"}
                      </span>
                    </div>
                  </div>

                  {/* PROGRESO Y FECHAS */}
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-bold text-slate-600">
                        <span>Progreso de Lectura y Temas</span>
                        <span>{progress}%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-500 ${
                            isDone ? "bg-emerald-500" : "bg-slate-900"
                          }`}
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <p className="text-[11px] text-slate-400 font-medium">
                        {item.completedLessonsCount} de {item.course?.totalLessons || 0} lecciones leídas y completadas
                      </p>
                    </div>

                    <div className="space-y-1 text-xs text-slate-600 font-medium">
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <Clock size={14} /> Fecha de Inscripción
                      </div>
                      <p className="font-bold text-slate-800">
                        {new Date(item.enrolledAt).toLocaleDateString("es-CO", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>

                    <div className="space-y-1 text-xs text-slate-600 font-medium">
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <Award size={14} className="text-secondary-600" /> Evaluaciones Realizadas
                      </div>
                      <p className="font-bold text-slate-800">
                        {item.quizAnswers?.length || 0} Evaluaciones Respondidas
                      </p>
                    </div>
                  </div>

                  {/* DETALLE DE EVALUACIONES */}
                  {item.quizAnswers && item.quizAnswers.length > 0 && (
                    <div className="pt-4 border-t border-slate-100 space-y-2">
                      <span className="text-[10px] font-gobold text-slate-400 uppercase tracking-widest">
                        Calificaciones de Quizzes / Evaluaciones
                      </span>
                      <div className="flex flex-wrap gap-3">
                        {item.quizAnswers.map((qa: any, idx: number) => (
                          <div
                            key={idx}
                            className="bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-xs flex items-center gap-2"
                          >
                            <Check size={14} className="text-emerald-500" />
                            <span className="font-semibold text-slate-700">
                              Nota: {qa.score} / {qa.totalQuestions}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* MODAL DE ENVÍO DE EMAIL / RECORDATORIO */}
      {modalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 max-w-lg w-full shadow-2xl space-y-6 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="space-y-1">
                <span className="text-[10px] font-gobold text-secondary-600 uppercase tracking-widest block">
                  Notificación a Estudiantes
                </span>
                <h3 className="text-xl font-gobold text-slate-900 uppercase">
                  Enviar Comunicado por Email
                </h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-2 hover:bg-slate-100 rounded-full transition"
              >
                <X size={20} className="text-slate-400" />
              </button>
            </div>

            {notificationStatus && (
              <div className="bg-emerald-50 text-emerald-700 border border-emerald-200 p-4 rounded-2xl text-xs font-bold text-center">
                {notificationStatus}
              </div>
            )}

            <form onSubmit={handleSendBroadcast} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Asunto del Comunicado *
                </label>
                <input
                  required
                  type="text"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  placeholder="Ej: Recordatorio: Nueva lección del Módulo 2 disponible"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-slate-900 focus:border-secondary-500 outline-none font-medium text-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Mensaje para los Estudiantes *
                </label>
                <textarea
                  required
                  rows={4}
                  value={emailMessage}
                  onChange={(e) => setEmailMessage(e.target.value)}
                  placeholder="Escribe el mensaje o recordatorio importante que llegará por correo..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-slate-900 focus:border-secondary-500 outline-none font-medium text-sm"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-gobold text-xs rounded-2xl uppercase tracking-wider transition"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  disabled={sendingEmail}
                  className="px-8 py-3 bg-slate-900 hover:bg-secondary-600 text-white font-gobold text-xs rounded-2xl uppercase tracking-widest transition shadow-lg flex items-center gap-2 disabled:opacity-50"
                >
                  <Send size={14} />
                  {sendingEmail ? "Enviando..." : "Enviar a Todos los Inscritos"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
