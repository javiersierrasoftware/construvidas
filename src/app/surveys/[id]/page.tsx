"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { CheckCircle2, Send, AlertCircle } from "lucide-react";
import Image from "next/image";

export default function PublicSurveyPage() {
  const { id } = useParams();
  const router = useRouter();
  const [survey, setSurvey] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [responses, setResponses] = useState<Record<string, any>>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSurvey = async () => {
      try {
        const res = await fetch(`/api/surveys/${id}`);
        const data = await res.json();
        if (res.ok) {
          setSurvey(data);
        } else {
          setError(data.message || "No se pudo cargar la encuesta");
        }
      } catch (err) {
        setError("Error de conexión");
      } finally {
        setLoading(false);
      }
    };
    fetchSurvey();
  }, [id]);

  const handleResponseChange = (questionId: string, value: any) => {
    setResponses({ ...responses, [questionId]: value });
  };

  const handleCheckboxChange = (questionId: string, option: string, checked: boolean) => {
    const currentValues = responses[questionId] || [];
    if (checked) {
      handleResponseChange(questionId, [...currentValues, option]);
    } else {
      handleResponseChange(questionId, currentValues.filter((v: string) => v !== option));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required questions
    for (const q of survey.questions) {
      if (q.required && (!responses[q.id] || (Array.isArray(responses[q.id]) && responses[q.id].length === 0))) {
        return alert(`La pregunta "${q.label}" es obligatoria.`);
      }
    }

    setSubmitting(true);
    try {
      const formattedAnswers = Object.entries(responses).map(([questionId, value]) => ({
        questionId,
        value
      }));

      const res = await fetch(`/api/surveys/${id}/responses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: formattedAnswers }),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        alert("Hubo un error al enviar tus respuestas.");
      }
    } catch (err) {
      alert("Error de conexión");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
        <div className="bg-white p-10 rounded-[2.5rem] shadow-xl text-center max-w-md w-full">
          <AlertCircle className="mx-auto text-red-500 mb-4" size={64} />
          <h1 className="text-2xl font-bold text-slate-900 mb-2">¡Oops!</h1>
          <p className="text-slate-500 mb-8">{error}</p>
          <button onClick={() => router.push("/")} className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl">
            Volver al Inicio
          </button>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
        <div className="bg-white p-10 rounded-[2.5rem] shadow-xl text-center max-w-md w-full border-t-[12px] border-t-secondary-500">
          <CheckCircle2 className="mx-auto text-green-500 mb-4" size={64} />
          <h1 className="text-3xl font-gobold text-slate-900 uppercase mb-2">¡Gracias!</h1>
          <p className="text-slate-500 mb-8">Tus respuestas han sido enviadas correctamente.</p>
          <button 
            onClick={() => {
              setSubmitted(false);
              setResponses({});
            }} 
            className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl hover:bg-secondary-600 transition-all uppercase tracking-widest text-xs"
          >
            Enviar otra respuesta
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-6 flex justify-center">
      <div className="w-full max-w-3xl space-y-6">
        {/* HEADER */}
        <div className="bg-white border border-slate-200 rounded-[2rem] p-8 md:p-12 shadow-sm border-t-[12px] border-t-secondary-500 overflow-hidden relative">
           <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <Image src="/construvidastransparente.png" alt="Logo" width={40} height={40} />
                <span className="text-xs font-gobold tracking-[0.3em] text-slate-400">CONSTRUVIDAS</span>
              </div>
              <h1 className="text-4xl font-gobold text-slate-900 uppercase tracking-tight mb-4">{survey.title}</h1>
              <p className="text-slate-500 leading-relaxed italic">{survey.description}</p>
           </div>
        </div>

        {/* FORMS */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {survey.questions.map((q: any) => (
            <div key={q.id} className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm">
              <label className="block text-xl font-bold text-slate-800 mb-6">
                {q.label} {q.required && <span className="text-red-500">*</span>}
              </label>

              {q.type === 'text' && (
                <input
                  type="text"
                  required={q.required}
                  onChange={(e) => handleResponseChange(q.id, e.target.value)}
                  placeholder="Tu respuesta"
                  className="w-full border-b border-slate-200 py-2 outline-none focus:border-secondary-500 transition-all font-medium text-slate-600"
                />
              )}

              {q.type === 'radio' && (
                <div className="space-y-4">
                  {q.options.map((opt: string) => (
                    <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative flex items-center justify-center">
                         <input
                          type="radio"
                          name={q.id}
                          required={q.required}
                          onChange={() => handleResponseChange(q.id, opt)}
                          className="peer appearance-none w-5 h-5 border-2 border-slate-200 rounded-full checked:border-secondary-500 transition-all"
                        />
                        <div className="absolute w-2.5 h-2.5 bg-secondary-500 rounded-full opacity-0 peer-checked:opacity-100 transition-all" />
                      </div>
                      <span className="text-slate-600 font-medium group-hover:text-slate-900 transition-colors">{opt}</span>
                    </label>
                  ))}
                </div>
              )}

              {q.type === 'multiple' && (
                <div className="space-y-4">
                  {q.options.map((opt: string) => (
                    <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative flex items-center justify-center">
                         <input
                          type="checkbox"
                          onChange={(e) => handleCheckboxChange(q.id, opt, e.target.checked)}
                          className="peer appearance-none w-5 h-5 border-2 border-slate-200 rounded-lg checked:bg-secondary-500 checked:border-secondary-500 transition-all"
                        />
                        <CheckCircle2 size={12} className="absolute text-white opacity-0 peer-checked:opacity-100 transition-all" />
                      </div>
                      <span className="text-slate-600 font-medium group-hover:text-slate-900 transition-colors">{opt}</span>
                    </label>
                  ))}
                </div>
              )}

              {q.type === 'select' && (
                <select
                  required={q.required}
                  onChange={(e) => handleResponseChange(q.id, e.target.value)}
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-slate-600 font-medium outline-none focus:border-secondary-500 transition-all"
                >
                  <option value="">Selecciona una opción</option>
                  {q.options.map((opt: string) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              )}
            </div>
          ))}

          <div className="pt-6">
             <button
              type="submit"
              disabled={submitting}
              className="w-full bg-slate-900 text-white font-gobold py-5 rounded-[2rem] hover:bg-secondary-600 hover:shadow-xl hover:shadow-secondary-500/20 transition-all uppercase tracking-widest flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {submitting ? "Enviando..." : (
                <>
                  Enviar Formulario <Send size={18} />
                </>
              )}
            </button>
          </div>
        </form>

        <footer className="text-center pt-8">
           <p className="text-[10px] uppercase font-bold text-slate-300 tracking-[0.4em]">Creado con ConstruVidas Forms</p>
        </footer>
      </div>
    </main>
  );
}
