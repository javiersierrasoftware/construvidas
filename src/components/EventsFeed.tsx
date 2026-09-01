"use client";

import { Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function EventsFeed() {
  const [events, setEvents] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));

    fetch("/api/events?limit=3")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setEvents(data);
        } else {
          console.error("API Error or invalid data:", data);
          setEvents([]);
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setEvents([]);
      });
  }, []);

  return (
    <section id="eventos" className="py-12">
      <div className="max-w-6xl mx-auto px-6">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100 shadow-sm">
                <Calendar className="text-secondary-600" size={24} />
            </div>
            <div>
              <h2 className="text-3xl font-gobold text-slate-900 uppercase tracking-tight">VIVE LA COMUNIDAD</h2>
              <p className="text-slate-500 text-sm font-medium">Próximos eventos y actividades especiales</p>
            </div>
          </div>
          
          <Link
            href="/events"
            className="bg-slate-900 text-white font-gobold px-8 py-4 rounded-2xl text-[10px] uppercase tracking-widest shadow-lg hover:bg-secondary-600 transition-all"
          >
            Ver Calendario
          </Link>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.map((event: any) => {

            const formatDate = (dateString: string) => {
              return new Date(dateString).toLocaleDateString("es-CO", {
                day: "numeric",
                month: "long",
                year: "numeric",
                timeZone: "UTC",
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

            let isRegistrationClosed = false;
            if (event.maxRegistrationDate) {
              const now = new Date();
              const deadline = new Date(event.maxRegistrationDate);

              if (event.maxRegistrationTime) {
                const [hours, minutes] = event.maxRegistrationTime.split(":").map(Number);
                deadline.setUTCHours(hours, minutes, 0, 0);
              } else {
                deadline.setUTCHours(23, 59, 59, 999);
              }

              if (now > deadline) {
                isRegistrationClosed = true;
              }
            }

            return (
              <article
                key={event._id}
                className="group relative bg-white border border-slate-200 rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col"
              >
                <div className="p-8 space-y-6 flex-1">
                  <div className="space-y-2">
                    <span className="px-3 py-1 bg-secondary-50 text-secondary-600 text-[10px] font-bold uppercase tracking-widest rounded-md">
                        {event.category || "Evento"}
                    </span>
                    <h3 className="text-2xl font-gobold text-slate-900 uppercase tracking-tight group-hover:text-secondary-600 transition-colors">{event.name}</h3>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-slate-600">
                        <Calendar size={16} className="text-secondary-500" />
                        <span className="text-sm font-medium">{formatDate(event.date)}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-600">
                        <span className="w-1 h-1 bg-secondary-500 rounded-full ml-1.5"></span>
                        <span className="text-sm font-medium ml-1.5">{formatTime(event.time)}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-400">
                        <span className="text-[10px] font-bold uppercase tracking-widest ml-1">{event.location}</span>
                    </div>
                  </div>

                  {/* PRECIO */}
                  {event.price && (
                    <div className="pt-4 mt-auto">
                        <p className="text-3xl font-gobold text-slate-900">
                          {event.price === 0 || event.price === "0"
                            ? "Gratis"
                            : `$ ${Number(event.price).toLocaleString()}`}
                        </p>
                    </div>
                  )}
                </div>

                <div className="p-8 pt-0 flex flex-col gap-3">
                  {isRegistrationClosed ? (
                    <span className="text-center bg-red-50 text-red-600 border border-red-100 py-4 rounded-2xl text-[10px] font-gobold uppercase tracking-widest">
                      Inscripciones Cerradas
                    </span>
                  ) : (
                    <Link href={`/events/register/${event._id}`} className="bg-slate-900 text-white text-center py-4 rounded-2xl text-[10px] font-gobold uppercase tracking-widest hover:bg-secondary-600 transition-all shadow-lg">
                      Inscribirme Ahora
                    </Link>
                  )}
                  <Link href={`/events/${event._id}`} className="text-slate-400 hover:text-slate-900 text-[10px] font-gobold text-center uppercase tracking-widest transition-colors">
                    Ver Detalles
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}