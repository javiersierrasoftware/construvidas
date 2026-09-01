"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Plus,
  Edit,
  Trash2,
  Calendar,
  Bookmark,
  Search,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminDevotionalsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [devotionals, setDevotionals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchDevotionals = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/devotionals?admin=true");
      const data = await res.json();
      if (Array.isArray(data)) {
        setDevotionals(data);
      }
    } catch (err) {
      console.error("Error al cargar devocionales admin:", err);
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
      fetchDevotionals();
    }
  }, [session, status]);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`¿Deseas eliminar el devocional "${title}"?`)) return;

    try {
      setDeletingId(id);
      const res = await fetch(`/api/devotionals/${id}`, { method: "DELETE" });
      if (res.ok) {
        setDevotionals((prev) => prev.filter((d) => d._id !== id));
      } else {
        alert("No se pudo eliminar el devocional");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setDeletingId(null);
    }
  };

  const filtered = devotionals.filter(
    (d) =>
      d.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.bibleVerse?.reference?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              Gestión de Devocionales Diarios
            </h1>
            <p className="text-slate-500 text-sm font-medium">
              Carga y programa la Palabra del Día que aparecerá en la página principal para toda la iglesia.
            </p>
          </div>

          <Link
            href="/admin/devotionals/create"
            className="bg-slate-900 text-white font-gobold px-6 py-3.5 rounded-2xl text-xs uppercase tracking-widest hover:bg-secondary-600 transition shadow-lg flex items-center gap-2"
          >
            <Plus size={18} />
            Crear Devocional
          </Link>
        </div>

        {/* BUSCADOR */}
        <div className="relative max-w-md">
          <Search size={18} className="absolute left-4 top-3.5 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por título o versículo..."
            className="w-full bg-white border border-slate-200 rounded-2xl pl-11 pr-4 py-3 text-slate-900 focus:border-secondary-500 outline-none font-medium shadow-sm text-sm"
          />
        </div>

        {/* LISTA */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white h-24 rounded-2xl animate-pulse border border-slate-200" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
            <Sparkles size={48} className="mx-auto text-slate-300" />
            <h3 className="text-xl font-gobold uppercase text-slate-800">
              No hay devocionales cargados
            </h3>
            <p className="text-slate-500 text-sm">
              Comienza publicando la Palabra del día para edificar a la congregación.
            </p>
            <Link
              href="/admin/devotionals/create"
              className="inline-block bg-slate-900 text-white font-gobold px-6 py-3 rounded-2xl text-xs uppercase tracking-widest hover:bg-secondary-600 transition"
            >
              Crear Devocional
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {filtered.map((d) => {
              const formattedDate = new Date(d.publishDate).toLocaleDateString("es-CO", {
                day: "numeric",
                month: "long",
                year: "numeric",
              });

              return (
                <div
                  key={d._id}
                  className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                        <Calendar size={14} className="text-secondary-600" />
                        {formattedDate}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                          d.isPublished
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-amber-50 text-amber-700 border border-amber-200"
                        }`}
                      >
                        {d.isPublished ? "Publicado" : "Borrador"}
                      </span>
                    </div>

                    <h3 className="text-lg font-gobold text-slate-900 uppercase">
                      {d.title}
                    </h3>

                    {d.bibleVerse && (
                      <p className="text-xs text-slate-600 font-medium flex items-center gap-1.5">
                        <Bookmark size={14} className="text-secondary-500" />
                        <span className="font-bold">{d.bibleVerse.reference}:</span> «{d.bibleVerse.text}»
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-3 w-full md:w-auto justify-end border-t md:border-t-0 border-slate-100 pt-3 md:pt-0">
                    <Link
                      href={`/admin/devotionals/${d._id}/edit`}
                      className="p-2.5 bg-slate-900 text-white hover:bg-secondary-600 rounded-xl transition shadow-sm"
                      title="Editar Devocional"
                    >
                      <Edit size={18} />
                    </Link>

                    <button
                      onClick={() => handleDelete(d._id, d.title)}
                      disabled={deletingId === d._id}
                      className="p-2.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl transition"
                      title="Eliminar Devocional"
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
