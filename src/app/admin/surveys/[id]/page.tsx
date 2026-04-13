"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Plus, Trash2, GripVertical, Save, ArrowLeft, Type, List, CheckCircle2, Eye } from "lucide-react";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import { generateSlug } from "@/lib/slugs";
import AdminAuthGuard from "@/components/auth/AdminAuthGuard";

type QuestionType = 'text' | 'radio' | 'select' | 'multiple';

interface Question {
  id: string;
  type: QuestionType;
  label: string;
  options: string[];
  required: boolean;
}

export default function EditSurveyPage() {
  const router = useRouter();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [active, setActive] = useState(true);
  const [slug, setSlug] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const fetchSurvey = async () => {
      try {
        const res = await fetch(`/api/admin/surveys/${id}`);
        const data = await res.json();
        if (res.ok) {
          setTitle(data.title);
          setDescription(data.description || "");
          setSlug(data.slug || "");
          setQuestions(data.questions || []);
          setActive(data.active);
        } else {
          alert("Error al cargar la encuesta");
          router.push("/admin/surveys");
        }
      } catch (error) {
        console.error("Error fetching survey:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSurvey();
  }, [id, router]);

  const addQuestion = (type: QuestionType) => {
    const newQuestion: Question = {
      id: uuidv4(),
      type,
      label: "",
      options: (type === 'radio' || type === 'select' || type === 'multiple') ? ["Opción 1"] : [],
      required: false
    };
    setQuestions([...questions, newQuestion]);
  };

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const updateQuestion = (id: string, updates: Partial<Question>) => {
    setQuestions(questions.map(q => q.id === id ? { ...q, ...updates } : q));
  };

  const addOption = (questionId: string) => {
    const question = questions.find(q => q.id === questionId);
    if (question) {
      updateQuestion(questionId, { options: [...question.options, `Nueva Opción ${question.options.length + 1}`] });
    }
  };

  const updateOption = (questionId: string, optionIndex: number, value: string) => {
    const question = questions.find(q => q.id === questionId);
    if (question) {
      const newOptions = [...question.options];
      newOptions[optionIndex] = value;
      updateQuestion(questionId, { options: newOptions });
    }
  };

  const removeOption = (questionId: string, optionIndex: number) => {
    const question = questions.find(q => q.id === questionId);
    if (question && question.options.length > 1) {
      const newOptions = [...question.options];
      newOptions.splice(optionIndex, 1);
      updateQuestion(questionId, { options: newOptions });
    }
  };

  const handleSave = async (isPublic: boolean) => {
    if (!title) return alert("Por favor ingresa un título");
    if (questions.length === 0) return alert("Por favor agrega al menos una pregunta");

    setSaving(true);
    try {
      const res = await fetch(`/api/admin/surveys/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, slug, questions, active: isPublic }),
      });

      if (res.ok) {
        router.push("/admin/surveys");
      } else {
        const error = await res.json();
        alert(error.message || "Error al actualizar la encuesta");
      }
    } catch (error) {
      alert("Error de conexión");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="pt-32 text-center">Cargando editor...</div>;

  return (
    <main className="min-h-screen pt-24 pb-20 px-6 max-w-4xl mx-auto">
      <div className="mb-10 flex items-center justify-between">
        <Link href="/admin/surveys" className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition font-bold uppercase tracking-widest text-xs">
          <ArrowLeft size={16} /> Volver
        </Link>
        <div className="flex gap-3">
          <button
            onClick={() => handleSave(false)}
            disabled={saving}
            className="flex items-center gap-2 bg-slate-100 text-slate-700 font-bold px-6 py-3 rounded-2xl hover:bg-slate-200 transition-all text-[10px] uppercase tracking-widest disabled:opacity-50"
          >
            Guardar Borrador
          </button>
          <button
            onClick={() => handleSave(true)}
            disabled={saving}
            className="flex items-center gap-2 bg-gradient-to-br from-secondary-400 to-accent-400 text-black font-gobold px-8 py-3 rounded-2xl hover:shadow-xl transition-all text-[10px] uppercase tracking-widest disabled:opacity-50"
          >
            <Save size={18} /> {saving ? "Guardando..." : "Actualizar y Publicar"}
          </button>
        </div>
      </div>

      <div className="space-y-8">
        {/* HEADER SECTION */}
        <div className="bg-white border border-slate-200 rounded-[2.5rem] p-10 shadow-sm border-t-[12px] border-t-secondary-500">
           <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Título de la Encuesta"
                className="w-full text-4xl font-gobold text-slate-900 uppercase tracking-tight border-none outline-none placeholder:text-slate-200"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (!slug) {
                    setSlug(generateSlug(e.target.value));
                  }
                }}
              />
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Enlace: /surveys/</span>
                <input
                  type="text"
                  placeholder="nombre-corto"
                  className="text-xs font-bold text-secondary-600 outline-none border-b border-secondary-100 focus:border-secondary-500 bg-transparent"
                  value={slug}
                  onChange={(e) => setSlug(generateSlug(e.target.value))}
                />
              </div>
            </div>
            <Link href={`/surveys/${slug || id}`} target="_blank" className="p-3 bg-slate-50 text-slate-400 hover:text-secondary-500 rounded-full transition shadow-sm" title="Vista previa">
              <Eye size={20} />
            </Link>
           </div>
          <textarea
            placeholder="Descripción (opcional)"
            className="w-full text-slate-500 outline-none border-none resize-none placeholder:text-slate-300"
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* QUESTIONS LIST */}
        <div className="space-y-6">
          {questions.map((q, index) => (
            <div key={q.id} className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm group">
              <div className="flex items-center gap-4 mb-6">
                 <div className="text-slate-300">
                    <GripVertical size={20} />
                 </div>
                 <input
                  type="text"
                  placeholder="Pregunta sin título"
                  className="flex-1 text-xl font-bold text-slate-800 outline-none border-b border-transparent focus:border-slate-100 pb-1"
                  value={q.label}
                  onChange={(e) => updateQuestion(q.id, { label: e.target.value })}
                />
                <select 
                  className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-sm font-semibold outline-none"
                  value={q.type}
                  onChange={(e) => updateQuestion(q.id, { type: e.target.value as QuestionType })}
                >
                  <option value="text">Respuesta rápida</option>
                  <option value="radio">Opción única</option>
                  <option value="multiple">Opción múltiple</option>
                  <option value="select">Lista desplegable</option>
                </select>
              </div>

              {/* OPTIONS */}
              {(q.type === 'radio' || q.type === 'multiple' || q.type === 'select') && (
                <div className="space-y-3 pl-9 mb-6">
                  {q.options.map((opt, optIdx) => (
                    <div key={optIdx} className="flex items-center gap-3 group/opt">
                      {q.type === 'multiple' ? <div className="w-4 h-4 border-2 border-slate-200 rounded" /> : <div className="w-4 h-4 border-2 border-slate-200 rounded-full" />}
                      <input
                        type="text"
                        className="flex-1 text-slate-600 outline-none border-b border-transparent focus:border-slate-100"
                        value={opt}
                        onChange={(e) => updateOption(q.id, optIdx, e.target.value)}
                      />
                      <button onClick={() => removeOption(q.id, optIdx)} className="text-slate-200 hover:text-red-400 opacity-0 group-hover/opt:opacity-100 transition">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                  <button onClick={() => addOption(q.id)} className="text-secondary-600 text-xs font-bold hover:underline pl-7">
                    + Añadir opción
                  </button>
                </div>
              )}

              <div className="flex justify-end items-center gap-6 pt-6 border-t border-slate-50">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Obligatoria</span>
                  <input
                    type="checkbox"
                    checked={q.required}
                    onChange={(e) => updateQuestion(q.id, { required: e.target.checked })}
                    className="w-4 h-4 rounded border-slate-200 text-secondary-600 focus:ring-secondary-500"
                  />
                </label>
                <button onClick={() => removeQuestion(q.id)} className="text-slate-300 hover:text-red-500 transition">
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ADD QUESTION STICKY BOX */}
        <div className="bg-slate-900 rounded-[2rem] p-4 flex justify-center gap-4 sticky bottom-8 shadow-2xl">
          <button onClick={() => addQuestion('text')} className="flex items-center gap-2 text-white hover:text-secondary-400 transition font-bold uppercase tracking-widest text-[10px] px-4 py-2"><Type size={18} /> Texto</button>
          <button onClick={() => addQuestion('radio')} className="flex items-center gap-2 text-white hover:text-secondary-400 transition font-bold uppercase tracking-widest text-[10px] px-4 py-2"><CheckCircle2 size={18} /> Unica</button>
          <button onClick={() => addQuestion('multiple')} className="flex items-center gap-2 text-white hover:text-secondary-400 transition font-bold uppercase tracking-widest text-[10px] px-4 py-2"><List size={18} /> Múltiple</button>
        </div>
      </div>
    </main>
  );
}
