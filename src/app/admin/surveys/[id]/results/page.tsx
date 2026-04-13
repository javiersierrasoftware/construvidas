"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft, BarChart2, Users, Calendar } from "lucide-react";
import Link from "next/link";

export default function SurveyResultsPage() {
  const { id } = useParams();
  const [data, setData] = useState<any>(null);
  const [responses, setResponses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [dateRange, setDateRange] = useState("all");
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [surveyRes, responsesRes] = await Promise.all([
          fetch(`/api/admin/surveys/${id}`),
          fetch(`/api/admin/surveys/${id}/responses`)
        ]);
        
        if (surveyRes.ok) setData(await surveyRes.json());
        if (responsesRes.ok) setResponses(await responsesRes.json());
      } catch (err) {
        console.error("Error fetching results:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const toggleFilter = (questionId: string, value: string) => {
    setActiveFilters(prev => {
      const next = { ...prev };
      if (next[questionId] === value) {
        delete next[questionId];
      } else {
        next[questionId] = value;
      }
      return next;
    });
  };

  const filteredResponses = responses.filter(resp => {
    // 1. Date Filter
    const date = new Date(resp.createdAt);
    const now = new Date();
    let dateMatch = true;
    
    if (dateRange === "today") dateMatch = date.toDateString() === now.toDateString();
    else if (dateRange === "week") dateMatch = date >= new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    else if (dateRange === "month") dateMatch = date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();

    if (!dateMatch) return false;

    // 2. Interactive Filters
    for (const [qId, val] of Object.entries(activeFilters)) {
      const answer = resp.answers.find((a: any) => a.questionId === qId);
      if (!answer) return false;
      if (Array.isArray(answer.value)) {
        if (!answer.value.includes(val)) return false;
      } else {
        if (answer.value !== val) return false;
      }
    }

    return true;
  });

  if (loading) return <div className="pt-32 text-center text-slate-500 font-medium">Cargando tablero interactivo...</div>;
  if (!data) return <div className="pt-32 text-center text-red-500 font-bold">Encuesta no encontrada</div>;

  return (
    <main className="min-h-screen pt-24 pb-20 px-6 max-w-5xl mx-auto">
      <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <Link href="/admin/surveys" className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition font-bold uppercase tracking-widest text-xs">
          <ArrowLeft size={16} /> Volver a encuestas
        </Link>
        
        <div className="flex items-center gap-4">
           {Object.keys(activeFilters).length > 0 && (
             <button 
              onClick={() => setActiveFilters({})}
              className="text-[10px] font-bold text-red-500 uppercase hover:underline"
             >
                Limpiar Filtros
             </button>
           )}
           <select 
              value={dateRange} 
              onChange={(e) => setDateRange(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-widest outline-none focus:border-secondary-500"
           >
              <option value="all">Todo el tiempo</option>
              <option value="today">Hoy</option>
              <option value="week">Última semana</option>
              <option value="month">Este mes</option>
           </select>
           <div className="bg-white border border-slate-100 rounded-xl px-4 py-2 flex items-center gap-2 shadow-sm">
              <Users size={16} className="text-secondary-500" />
              <span className="text-sm font-bold text-slate-700">{filteredResponses.length} Respuestas</span>
           </div>
        </div>
      </div>

      <div className="mb-12">
        <h1 className="text-4xl font-gobold text-slate-900 uppercase tracking-tight mb-2">{data.title}</h1>
        <div className="flex flex-wrap gap-2">
            <p className="text-slate-500 mr-4">Análisis de datos interactivo</p>
            {Object.entries(activeFilters).map(([qId, val]) => (
              <span key={qId} className="bg-secondary-100 text-secondary-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 animate-in zoom-in duration-300">
                {val} <button onClick={() => toggleFilter(qId, val)}>×</button>
              </span>
            ))}
        </div>
      </div>

      <div className="space-y-8">
        {data.questions.map((q: any) => {
          const stats: Record<string, number> = {};
          if (q.type !== 'text') {
            filteredResponses.forEach(resp => {
              const answer = resp.answers.find((a: any) => a.questionId === q.id);
              if (answer) {
                 if (Array.isArray(answer.value)) {
                    answer.value.forEach((v: any) => { stats[v] = (stats[v] || 0) + 1; });
                 } else {
                    stats[answer.value] = (stats[answer.value] || 0) + 1;
                 }
              }
            });
          }

          return (
            <div key={q.id} className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm">
              <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                 <span className="w-2.5 h-2.5 bg-secondary-500 rounded-full"></span>
                 {q.label}
              </h3>

              {q.type === 'text' ? (
                <div className="space-y-3">
                  {filteredResponses.map((resp, i) => {
                    const ans = resp.answers.find((a: any) => a.questionId === q.id);
                    if (!ans?.value) return null;
                    return (
                      <div key={i} className="bg-slate-50 p-5 rounded-2xl border border-slate-100 text-sm text-slate-600 relative group">
                         <span className="absolute -left-2 top-4 w-1 h-4 bg-slate-200 rounded-full group-hover:bg-secondary-400 transition-colors"></span>
                         {ans.value}
                         <div className="text-[10px] text-slate-300 mt-2 font-bold uppercase tracking-widest">
                            {new Date(resp.createdAt).toLocaleDateString()}
                         </div>
                      </div>
                    );
                  })}
                  {filteredResponses.length === 0 && <p className="text-slate-300 italic text-sm">No hay respuestas que coincidan con estos filtros</p>}
                </div>
              ) : (
                <div className="space-y-4">
                   {q.options.map((opt: string) => {
                     const isSelected = activeFilters[q.id] === opt;
                     const count = stats[opt] || 0;
                     const percentage = filteredResponses.length > 0 ? (count / filteredResponses.length) * 100 : 0;
                     return (
                       <div 
                        key={opt} 
                        className={`cursor-pointer group transition-all ${isSelected ? "opacity-100" : "opacity-100 hover:translate-x-1"}`}
                        onClick={() => toggleFilter(q.id, opt)}
                       >
                          <div className={`flex justify-between text-sm font-bold mb-2 transition-colors ${isSelected ? "text-secondary-600" : "text-slate-800"}`}>
                             <span>{opt} {isSelected && "✓"}</span>
                             <span className="text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">{count} ({percentage.toFixed(1)}%)</span>
                          </div>
                          <div className={`w-full h-3.5 rounded-full overflow-hidden transition-all duration-300 ${isSelected ? "bg-secondary-100" : "bg-slate-100"}`}>
                             <div 
                                className={`h-full transition-all duration-1000 ${isSelected ? "bg-gradient-to-r from-secondary-500 to-accent-500" : "bg-slate-400 group-hover:bg-slate-600"}`}
                                style={{ width: `${percentage}%` }}
                             />
                          </div>
                       </div>
                     );
                   })}
                   {filteredResponses.length === 0 && <p className="text-slate-400 italic text-sm">No hay respuestas que coincidan con estos filtros</p>}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
}
