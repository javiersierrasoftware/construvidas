"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Pencil, Trash2 } from "lucide-react";

export default function StoryTable({
  onEdit,
  onDelete,
  onBulkDelete,
}: any) {
  const [stories, setStories] = useState([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [page, setPage] = useState(1);

  const perPage = 6;

  useEffect(() => {
    fetch("/api/stories")
      .then((res) => res.json())
      .then((data) =>
        setStories(
          data.sort(
            (a: any, b: any) => b.createdAt.localeCompare(a.createdAt)
          )
        )
      );
  }, []);

  const filtered = stories.filter(
    (s: any) =>
      s.user.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase())
  );

  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const toggleSelect = (id: string) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="space-y-8">
      {/* 🔍 BUSCADOR + ELIMINACIÓN MASIVA */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center gap-4 bg-white border border-slate-200 px-6 py-4 rounded-2xl w-full md:w-1/2 shadow-sm focus-within:ring-2 focus-within:ring-secondary-500/20 transition-all">
          <input
            placeholder="Buscar testimonio..."
            className="bg-transparent outline-none text-slate-900 w-full font-medium"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {selected.length > 0 && (
          <button
            onClick={() => onBulkDelete(selected)}
            className="bg-red-50 text-red-600 px-8 py-4 rounded-2xl font-gobold text-xs uppercase tracking-widest hover:bg-red-100 transition-all border border-red-100"
          >
            Eliminar seleccionados ({selected.length})
          </button>
        )}
      </div>

      {/* 🖼️ GRID DE HISTORIAS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {paginated.map((story: any) => (
          <div
            key={story._id}
            className="group relative bg-white border border-slate-200 rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            {/* 🎨 IMAGEN */}
            <div className="relative w-full h-80 bg-slate-100 overflow-hidden">
              <Image
                src={story.image}
                alt={story.user}
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>

            {/* CONTENIDO */}
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="font-gobold text-slate-900 uppercase tracking-wide text-sm">{story.user}</p>
                  <p className="text-slate-400 text-xs font-medium uppercase tracking-widest">{story.userTag}</p>
                </div>
                <span className="px-3 py-1 bg-secondary-50 text-secondary-600 text-[10px] font-bold uppercase tracking-widest rounded-md">
                  {story.category}
                </span>
              </div>

              <p className="text-slate-600 text-sm line-clamp-3 leading-relaxed font-medium mb-6">
                {story.description}
              </p>

              {/* ACCIONES */}
              <div className="flex justify-between items-center pt-6 border-t border-slate-100">
                <div className="flex gap-2">
                    <button 
                        onClick={() => onEdit(story)}
                        className="p-2.5 bg-slate-50 text-slate-700 rounded-xl hover:bg-slate-100 transition-all shadow-sm border border-slate-100"
                    >
                        <Pencil size={18} />
                    </button>
                    <button 
                        onClick={() => onDelete([story._id])}
                        className="p-2.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-all shadow-sm border border-red-50"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Seleccionar</span>
                    <input
                      type="checkbox"
                      checked={selected.includes(story._id)}
                      onChange={() => toggleSelect(story._id)}
                      className="h-6 w-6 accent-secondary-500 cursor-pointer rounded-lg border-slate-200"
                    />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* PAGINACIÓN */}
      <div className="flex justify-center gap-3 pt-10">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-6 py-3 rounded-xl bg-white border border-slate-200 text-slate-500 font-gobold text-sm hover:bg-slate-50 disabled:opacity-30 disabled:hover:bg-white transition-all shadow-sm"
        >
          Anterior
        </button>

        <button
          disabled={page * perPage >= filtered.length}
          onClick={() => setPage((p) => p + 1)}
          className="px-6 py-3 rounded-xl bg-white border border-slate-200 text-slate-500 font-gobold text-sm hover:bg-slate-50 disabled:opacity-30 disabled:hover:bg-white transition-all shadow-sm"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}