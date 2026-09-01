"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Trash2,
  Pencil,
  Search,
  CheckSquare,
  Square,
  Star,
  StarOff,
  Plus,
} from "lucide-react";
import Link from "next/link";

export default function ManageStories() {
  const [stories, setStories] = useState<any[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const itemsPerPage = 6;

  // 👉 Cargar historias
  useEffect(() => {
    fetch("/api/stories")
      .then((res) => res.json())
      .then((data) => setStories(data.reverse()))
      .catch(console.error);
  }, []);

  // 👉 Filtrar historias
  const filteredStories = stories.filter(
    (s) =>
      (s.author && s.author.toLowerCase().includes(search.toLowerCase())) ||
      (s.content && s.content.toLowerCase().includes(search.toLowerCase())) ||
      (s.title && s.title.toLowerCase().includes(search.toLowerCase()))
  );

  // 👉 Paginación
  const totalPages = Math.ceil(filteredStories.length / itemsPerPage);
  const paginated = filteredStories.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  // 👉 Selección múltiple
  const toggleSelect = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // 👉 Marcar / desmarcar destacada
  const toggleFeatured = async (story: any) => {
    try {
      const res = await fetch(`/api/stories/${story._id}/featured`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ featured: !story.featured }),
      });

      if (!res.ok) {
        throw new Error("No se pudo actualizar el estado de destacada.");
      }

      setStories((prev) =>
        prev.map((s) =>
          s._id === story._id ? { ...s, featured: !s.featured } : s
        )
      );
    } catch (error) {
      console.error(error);
      alert("Error al actualizar la historia.");
    }
  };


  // 👉 Eliminar múltiples
  const deleteSelected = async () => {
    if (selected.length === 0) return;

    const ok = confirm(
      `¿Eliminar ${selected.length} historia(s)? Esta acción no se puede deshacer.`
    );
    if (!ok) return;

    await Promise.all(
      selected.map((id) => fetch(`/api/stories/${id}`, { method: "DELETE" }))
    );

    setStories((prev) => prev.filter((s) => !selected.includes(s._id)));
    setSelected([]);
  };

  // 👉 Eliminar una
  const deleteOne = async (id: string) => {
    try {
      const res = await fetch(`/api/stories/${id}`, { method: "DELETE" });
      if (!res.ok) {
        throw new Error("No se pudo eliminar la historia.");
      }
      setStories((prev) => prev.filter((s) => s._id !== id));
    } catch (error) {
      console.error(error);
      alert("Error al eliminar la historia.");
    } finally {
      setConfirmDeleteId(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* ENCABEZADO */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        {/* Buscador */}
        <div className="flex items-center gap-4 bg-white border border-slate-200 px-6 py-4 rounded-2xl w-full md:w-1/2 shadow-sm focus-within:ring-2 focus-within:ring-secondary-500/20 transition-all">
          <Search size={22} className="text-slate-400" />
          <input
            type="text"
            placeholder="Buscar testimonios..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent outline-none text-slate-900 w-full font-medium"
          />
        </div>

        {/* Boton Crear */}
        <Link
          href="/stories/create"
          className="flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-2xl font-gobold text-xs uppercase tracking-widest shadow-lg hover:bg-secondary-600 transition-all"
        >
          <Plus size={18} /> Crear testimonio
        </Link>
      </div>

      {/* Boton eliminar masivo */}
      {selected.length > 0 && (
        <button
          onClick={deleteSelected}
          className="bg-red-50 text-red-600 px-6 py-3 rounded-xl text-xs font-gobold uppercase tracking-widest hover:bg-red-100 transition-all border border-red-100"
        >
          Eliminar seleccionas ({selected.length})
        </button>
      )}

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {paginated.map((post) => (
          <div
            key={post._id}
            className="group relative bg-white border border-slate-200 rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            {/* Checkbox */}
            <button
              className="absolute top-4 left-4 z-10 p-2 bg-white/80 backdrop-blur-md rounded-xl border border-slate-200 shadow-sm hover:bg-white transition-all"
              onClick={() => toggleSelect(post._id)}
            >
              {selected.includes(post._id) ? (
                <CheckSquare size={22} className="text-secondary-600" />
              ) : (
                <Square size={22} className="text-slate-300" />
              )}
            </button>

            {/* Acciones */}
            <div className="absolute top-4 right-4 flex gap-2 z-10">
              {/* Editar */}
              <Link
                href={`/stories/edit/${post._id}`}
                className="p-2.5 bg-white/80 backdrop-blur-md rounded-xl border border-slate-200 shadow-sm hover:bg-white transition-all"
              >
                <Pencil size={18} className="text-slate-700" />
              </Link>

              {/* Eliminar */}
              <button
                onClick={() => setConfirmDeleteId(post._id)}
                className="p-2.5 bg-white/80 backdrop-blur-md rounded-xl border border-slate-200 shadow-sm hover:bg-red-50 transition-all"
              >
                <Trash2 size={18} className="text-red-500" />
              </button>
            </div>


            {/* Destacar */}
            <button
              onClick={() => toggleFeatured(post)}
              className="absolute bottom-4 left-4 z-10 px-4 py-2 rounded-xl text-[10px] font-gobold uppercase tracking-widest bg-white/80 backdrop-blur-md border border-slate-100 shadow-sm hover:bg-white transition-all"
            >
              {post.featured ? (
                <span className="flex items-center gap-2 text-yellow-600">
                  <Star size={14} fill="currentColor" /> Destacada
                </span>
              ) : (
                <span className="flex items-center gap-2 text-slate-400">
                  <Star size={14} /> Destacar
                </span>
              )}
            </button>

            {/* Imagen (igual que Feed) */}
            <div className="relative w-full h-80 bg-slate-100 overflow-hidden">
              <Image
                src={post.image}
                alt={post.title || "Imagen de la historia"}
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>

            {/* Texto */}
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                 <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-600">
                    {post.author.charAt(0).toUpperCase()}
                 </div>
                 <p className="font-gobold text-slate-900 uppercase tracking-wide text-sm">{post.author}</p>
              </div>
              <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed font-medium">
                {post.content}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* PAGINACIÓN */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-3 mt-10">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-5 py-2.5 rounded-xl font-gobold text-xs transition-all ${page === i + 1
                ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20"
                : "bg-white border border-slate-200 text-slate-500 hover:bg-slate-50"
                }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {/* MODAL ELIMINAR */}
      {confirmDeleteId && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl max-w-md w-full border border-slate-100 animate-in fade-in zoom-in duration-300">
            <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mb-6">
                <Trash2 size={32} className="text-red-500" />
            </div>
            <h3 className="text-2xl font-gobold text-slate-900 uppercase tracking-tight mb-3">Eliminar testimonio</h3>
            <p className="text-slate-500 font-medium leading-relaxed mb-8">
              ¿Estás seguro de eliminar este testimonio? Esta acción no se puede deshacer y se borrará permanentemente.
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="flex-1 px-6 py-4 rounded-2xl bg-slate-50 text-slate-700 font-gobold text-xs uppercase tracking-widest hover:bg-slate-100 transition-all shadow-sm"
              >
                Cancelar
              </button>

              <button
                onClick={() => deleteOne(confirmDeleteId)}
                className="flex-1 px-6 py-4 rounded-2xl bg-red-600 text-white font-gobold text-xs uppercase tracking-widest hover:bg-red-700 transition-all shadow-lg shadow-red-500/20"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}