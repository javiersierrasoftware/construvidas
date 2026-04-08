"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, MapPin, Search } from "lucide-react";

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch("/api/events");
        if (!res.ok) {
          throw new Error("No se pudieron cargar los eventos.");
        }
        const data = await res.json();
        setEvents(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-CO", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC", // Fix timezone
    });
  };

  const formatTime = (timeStr?: string) => {
    if (!timeStr) return "";
    const [hours, minutes] = timeStr.split(":").map(Number);
    if (isNaN(hours) || isNaN(minutes)) return timeStr;
    const ampm = hours >= 12 ? "PM" : "AM";
    const h12 = hours % 12 || 12;
    return `${h12}:${minutes.toString().padStart(2, "0")} ${ampm}`;
  };

  // Filtrar eventos según el término de búsqueda
  const filteredEvents = events.filter(
    (event) =>
      (event.name && event.name.toLowerCase().includes(search.toLowerCase())) ||
      (event.location && event.location.toLowerCase().includes(search.toLowerCase()))
  );

  if (loading) {
    return <div className="text-center py-40">Cargando eventos...</div>;
  }

  if (error) {
    return <div className="text-center py-40 text-red-400">Error: {error}</div>;
  }

  return (
    <main className="max-w-6xl mx-auto px-4 pt-28 pb-16 space-y-12">
      <header>
        <h2 className="text-secondary-600 text-sm font-gobold uppercase tracking-[0.3em] mb-2">Agenda</h2>
        <h1 className="text-4xl md:text-5xl font-gobold text-slate-900 uppercase tracking-tight">Próximos Eventos</h1>
        <p className="text-slate-600 max-w-2xl text-lg font-medium mt-4">
          Mantente al tanto de nuestros servicios, congresos, vigilias y actividades especiales de nuestra comunidad.
        </p>
      </header>

      {/* Barra de Búsqueda */}
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

      <div className="space-y-8">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <Link
              href={`/events/${event._id}`}
              key={event._id}
              className="group flex flex-col md:flex-row gap-8 bg-white border border-slate-200 rounded-[2rem] p-6 hover:shadow-2xl hover:border-secondary-500/30 transition-all duration-500"
            >
              <div className="relative w-full md:w-1/3 h-64 rounded-2xl overflow-hidden shadow-inner bg-slate-100">
                <Image
                  src={event.image || "/event-placeholder.jpg"}
                  alt={event.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex-1 flex flex-col justify-center space-y-4">
                <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-secondary-50 text-secondary-600 text-[10px] font-bold uppercase tracking-widest rounded-md">
                        {event.category || "Evento"}
                    </span>
                </div>
                <h2 className="text-3xl font-gobold text-slate-900 uppercase tracking-tight group-hover:text-secondary-600 transition-colors">
                    {event.name}
                </h2>
                <div className="flex flex-wrap items-center gap-6 text-sm font-semibold text-slate-600">
                  <span className="flex items-center gap-2">
                    <Calendar size={18} className="text-secondary-500" /> {formatDate(event.date)}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock size={18} className="text-secondary-500" /> {formatTime(event.time)}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                  <MapPin size={18} className="text-secondary-500" /> {event.location}
                </div>
                <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 pt-2">
                  {event.description}
                </p>
                <div className="pt-4">
                    <span className="text-slate-900 font-gobold text-sm uppercase tracking-widest flex items-center gap-2 group-hover:text-secondary-500 transition-colors">
                        Saber más
                        <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                    </span>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="bg-slate-50 border border-slate-200 rounded-[3rem] py-24 text-center">
            <Calendar size={48} className="mx-auto text-slate-300 mb-4" />
            <p className="text-slate-500 font-medium text-lg">
              No hay eventos programados por el momento.
            </p>
            <p className="text-slate-400 text-sm mt-2">¡Pronto tendremos nuevas actividades para ti!</p>
          </div>
        )}
      </div>
    </main>
  );
}