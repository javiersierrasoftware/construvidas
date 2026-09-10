"use client";

import React, { useState, useRef } from "react";
import {
  Bold,
  Italic,
  Underline,
  AlignCenter,
  Heading2,
  List,
  Quote,
  Eye,
  Edit3,
} from "lucide-react";
import RichLessonContent from "./RichLessonContent";

interface RichLessonEditorProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  rows?: number;
}

export default function RichLessonEditor({
  value,
  onChange,
  placeholder = "Escribe el contenido de la lección...",
  rows = 4,
}: RichLessonEditorProps) {
  const [tab, setTab] = useState<"edit" | "preview">("edit");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const applyFormat = (prefix: string, suffix: string, defaultText: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart ?? 0;
    const end = textarea.selectionEnd ?? 0;
    const currentVal = value || "";
    const selectedText = currentVal.substring(start, end);

    const replacement = selectedText ? `${prefix}${selectedText}${suffix}` : `${prefix}${defaultText}${suffix}`;
    const newVal = currentVal.substring(0, start) + replacement + currentVal.substring(end);

    onChange(newVal);

    // Restore focus and cursor selection
    setTimeout(() => {
      textarea.focus();
      const cursorStart = start + prefix.length;
      const cursorEnd = selectedText ? cursorStart + selectedText.length : cursorStart + defaultText.length;
      textarea.setSelectionRange(cursorStart, cursorEnd);
    }, 10);
  };

  return (
    <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm focus-within:border-secondary-500 transition">
      {/* BARRA DE HERRAMIENTAS */}
      <div className="bg-slate-100/80 px-3 py-2 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1">
          <button
            type="button"
            onClick={() => applyFormat("**", "**", "texto en negrita")}
            className="p-1.5 hover:bg-white text-slate-700 hover:text-slate-950 rounded-lg transition"
            title="Negrita (**texto**)"
          >
            <Bold size={15} />
          </button>
          <button
            type="button"
            onClick={() => applyFormat("*", "*", "texto en cursiva")}
            className="p-1.5 hover:bg-white text-slate-700 hover:text-slate-950 rounded-lg transition"
            title="Cursiva (*texto*)"
          >
            <Italic size={15} />
          </button>
          <button
            type="button"
            onClick={() => applyFormat("<u>", "</u>", "texto subrayado")}
            className="p-1.5 hover:bg-white text-slate-700 hover:text-slate-950 rounded-lg transition"
            title="Subrayado (<u>texto</u>)"
          >
            <Underline size={15} />
          </button>

          <span className="w-px h-4 bg-slate-300 mx-1" />

          <button
            type="button"
            onClick={() => applyFormat("<center>", "</center>", "Texto Centrado")}
            className="p-1.5 hover:bg-white text-slate-700 hover:text-slate-950 rounded-lg transition flex items-center gap-1 text-[11px] font-bold"
            title="Centrar texto (<center>...</center>)"
          >
            <AlignCenter size={15} />
            <span className="hidden sm:inline">Centrar</span>
          </button>

          <span className="w-px h-4 bg-slate-300 mx-1" />

          <button
            type="button"
            onClick={() => applyFormat("### ", "\n", "Título de Sección")}
            className="p-1.5 hover:bg-white text-slate-700 hover:text-slate-950 rounded-lg transition flex items-center gap-1 text-[11px] font-bold"
            title="Encabezado / Título (### Título)"
          >
            <Heading2 size={15} />
            <span className="hidden sm:inline">Título</span>
          </button>
          <button
            type="button"
            onClick={() => applyFormat("• ", "\n", "Punto importante")}
            className="p-1.5 hover:bg-white text-slate-700 hover:text-slate-950 rounded-lg transition"
            title="Viñeta (• Elemento)"
          >
            <List size={15} />
          </button>
          <button
            type="button"
            onClick={() => applyFormat('> "', '" (Referencia)', "Versículo bíblico o cita clave")}
            className="p-1.5 hover:bg-white text-slate-700 hover:text-slate-950 rounded-lg transition flex items-center gap-1 text-[11px] font-bold"
            title="Cita Bíblica Destacada (> Cita)"
          >
            <Quote size={15} />
            <span className="hidden sm:inline">Cita Bíblica</span>
          </button>
        </div>

        {/* SELECTOR EDITAR / VISTA PREVIA */}
        <div className="flex items-center gap-1 bg-slate-200/80 p-0.5 rounded-xl text-xs font-gobold">
          <button
            type="button"
            onClick={() => setTab("edit")}
            className={`px-2.5 py-1 rounded-lg transition flex items-center gap-1 ${
              tab === "edit"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Edit3 size={13} />
            Editar
          </button>
          <button
            type="button"
            onClick={() => setTab("preview")}
            className={`px-2.5 py-1 rounded-lg transition flex items-center gap-1 ${
              tab === "preview"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Eye size={13} />
            Vista Previa
          </button>
        </div>
      </div>

      {/* ÁREA DE EDICIÓN O VISTA PREVIA */}
      {tab === "edit" ? (
        <textarea
          ref={textareaRef}
          rows={rows}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full p-4 text-xs font-sans text-slate-900 outline-none resize-y leading-relaxed bg-white"
        />
      ) : (
        <div className="p-5 bg-slate-900 min-h-[120px] rounded-b-2xl">
          {value.trim() ? (
            <RichLessonContent content={value} />
          ) : (
            <p className="text-xs text-slate-400 italic">
              No hay contenido para previsualizar. Escribe en la pestaña &quot;Editar&quot;.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
