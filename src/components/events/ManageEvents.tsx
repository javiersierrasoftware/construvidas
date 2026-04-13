"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Trash2, Pencil, Search, Plus, Users } from "lucide-react";
import Link from "next/link";

export default function ManageEvents() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // Cargar eventos
  useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Filtrar eventos
  const filteredEvents = events.filter(
    (e) =>
      (e.name && e.name.toLowerCase().includes(search.toLowerCase())) ||
      (e.location && e.location.toLowerCase().includes(search.toLowerCase()))
  );

  // Eliminar un evento
  const deleteOne = async (id: string) => {
    try {
      const res = await fetch(`/api/events/admin/${id}`, {
        method: "DELETE",
        credentials: "include"
      });

      if (!res.ok) throw new Error("No se pudo eliminar el evento.");

      setEvents((prev) => prev.filter((e) => e._id !== id));
      setConfirmDeleteId(null);
    } catch (error) {
      console.error(error);
      alert("Error al eliminar el evento.");
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-CO", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC", // Fix timezone
    });
  };

  if (loading) {
    return <div className="text-center py-20">Cargando eventos...</div>;
  }

  return (
    <div className="space-y-8">
      {/* ENCABEZADO */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center gap-4 bg-white border border-slate-200 px-6 py-4 rounded-2xl w-full md:w-1/2 shadow-sm focus-within:ring-2 focus-within:ring-secondary-500/20 transition-all">
          <Search size={22} className="text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por nombre o ubicación..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent outline-none text-slate-900 w-full font-medium"
          />
        </div>

        <Link
          href="/events/create"
          className="flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-2xl font-gobold text-xs uppercase tracking-widest shadow-lg hover:bg-secondary-600 transition-all"
        >
          <Plus size={18} /> Crear Evento
        </Link>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredEvents.map((event) => (
          <div
            key={event._id}
            className="group relative bg-white border border-slate-200 rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            {/* Acciones */}
            <div className="absolute top-4 right-4 flex gap-2 z-10">
              <Link
                href={`/admin/events/${event._id}/registrations`}
                title="Ver Inscripciones"
                className="p-2.5 bg-white/80 backdrop-blur-md rounded-xl border border-slate-200 shadow-sm hover:bg-white transition-all"
              >
                <Users size={20} className="text-secondary-600" />
              </Link>
              <Link
                href={`/events/edit/${event._id}`}
                title="Editar Evento"
                className="p-2.5 bg-white/80 backdrop-blur-md rounded-xl border border-slate-200 shadow-sm hover:bg-white transition-all"
              >
                <Pencil size={20} className="text-slate-700" />
              </Link>
              <button
                onClick={() => setConfirmDeleteId(event._id)}
                title="Eliminar Evento"
                className="p-2.5 bg-white/80 backdrop-blur-md rounded-xl border border-slate-200 shadow-sm hover:bg-red-50 transition-all"
              >
                <Trash2 size={20} className="text-red-500" />
              </button>
            </div>


            <div className="relative w-full h-56 bg-slate-100 overflow-hidden">
              <Image
                src={event.image || "/event-placeholder.jpg"}
                alt={event.name}
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>

            <div className="p-6">
              <div className="flex items-center gap-2 mb-2">
                 <span className="px-3 py-1 bg-secondary-50 text-secondary-600 text-[10px] font-bold uppercase tracking-widest rounded-md">
                    {event.category || "Evento"}
                 </span>
              </div>
              <p className="font-gobold text-slate-900 uppercase tracking-tight text-xl mb-2">{event.name}</p>
              <div className="space-y-1">
                <p className="text-sm font-medium text-slate-600 flex items-center gap-2">
                    <span className="w-1 h-1 bg-secondary-500 rounded-full"></span>
                    {formatDate(event.date)}
                </p>
                <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">{event.location}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL ELIMINAR */}
      {confirmDeleteId && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl max-w-md w-full border border-slate-100 animate-in fade-in zoom-in duration-300">
            <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mb-6">
                <Trash2 size={32} className="text-red-500" />
            </div>
            <h3 className="text-2xl font-gobold text-slate-900 uppercase tracking-tight mb-3">Eliminar Evento</h3>
            <p className="text-slate-500 font-medium leading-relaxed mb-8">
              ¿Estás seguro de eliminar este evento? Esta acción no se puede deshacer y se borrará permanentemente.
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
