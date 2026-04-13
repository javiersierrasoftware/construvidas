"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Trash2, Edit3, BarChart2, Share2, Clipboard } from "lucide-react";
import AdminAuthGuard from "@/components/auth/AdminAuthGuard";

function AdminSurveysPageContent() {
  const [surveys, setSurveys] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSurveys = async () => {
    try {
      const res = await fetch("/api/admin/surveys");
      const data = await res.json();
      if (Array.isArray(data)) {
        setSurveys(data);
      }
    } catch (error) {
      console.error("Error fetching surveys:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSurveys();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de que deseas eliminar esta encuesta y todas sus respuestas?")) return;
    try {
      const res = await fetch(`/api/admin/surveys/${id}`, { method: "DELETE" });
      if (res.ok) {
        setSurveys(surveys.filter(s => s._id !== id));
      }
    } catch (error) {
      console.error("Error deleting survey:", error);
    }
  };

  const copyToClipboard = (survey: any) => {
    const identifier = survey.slug || survey._id;
    const url = `${window.location.origin}/surveys/${identifier}`;
    navigator.clipboard.writeText(url);
    alert("¡Enlace copiado al portapapeles!");
  };

  return (
    <main className="min-h-screen pt-24 pb-20 px-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-gobold text-slate-900 uppercase tracking-tight">Gestión de Encuestas</h1>
          <p className="text-slate-500">Crea y administra tus formularios personalizados</p>
        </div>
        <Link
          href="/admin/surveys/create"
          className="flex items-center gap-2 bg-slate-900 text-white font-gobold px-6 py-3 rounded-2xl hover:bg-secondary-600 transition-all shadow-lg text-[10px] uppercase tracking-widest"
        >
          <Plus size={18} /> Nueva Encuesta
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary-600"></div>
        </div>
      ) : surveys.length === 0 ? (
        <div className="text-center py-20 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm">
          <Clipboard className="mx-auto text-slate-300 mb-4" size={64} />
          <p className="text-xl font-medium text-slate-400">No hay encuestas creadas aún</p>
          <Link href="/admin/surveys/create" className="text-secondary-600 font-bold hover:underline mt-2 inline-block">
            Crea tu primera encuesta ahora
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {surveys.map((survey) => (
            <div key={survey._id} className="bg-white border border-slate-200 rounded-[2rem] p-6 shadow-sm hover:shadow-md transition-all flex flex-col">
              <div className="flex-1">
                <div className="flex justify-between items-start mb-4">
                  <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full ${survey.active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {survey.active ? "Activa" : "Cerrada"}
                  </span>
                  <div className="flex gap-2">
                    <button onClick={() => copyToClipboard(survey)} className="p-2 text-slate-400 hover:text-slate-900 transition" title="Copiar enlace público">
                      <Share2 size={18} />
                    </button>
                    <button onClick={() => handleDelete(survey._id)} className="p-2 text-slate-400 hover:text-red-500 transition" title="Eliminar encuesta">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                <h3 className="text-xl font-gobold text-slate-900 mb-2 uppercase">{survey.title}</h3>
                <p className="text-sm text-slate-500 line-clamp-2 mb-4">{survey.description || "Sin descripción"}</p>
                
                <div className="flex gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                   <span>{survey.questions?.length ?? 0} Preguntas</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-6">
                <Link
                  href={`/admin/surveys/${survey._id}`}
                  className="flex justify-center items-center gap-2 bg-slate-50 text-slate-700 hover:bg-slate-100 py-3 rounded-xl transition text-[10px] font-bold uppercase tracking-widest"
                >
                  <Edit3 size={14} /> Editar
                </Link>
                <Link
                  href={`/admin/surveys/${survey._id}/results`}
                  className="flex justify-center items-center gap-2 bg-secondary-50 text-secondary-600 hover:bg-secondary-100 py-3 rounded-xl transition text-[10px] font-bold uppercase tracking-widest"
                >
                  <BarChart2 size={14} /> Resultados
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
