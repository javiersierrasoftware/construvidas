"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Calendar, Clock, MapPin, Users, CreditCard } from "lucide-react";
import { openRegistration } from "@/utils/registration";

export default function EventsSection() {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    async function fetchEvents() {
      try {
        // Obtenemos solo los 3 eventos más próximos
        const res = await fetch("/api/events?limit=3");
        if (res.ok) {
          const data = await res.json();
          setEvents(data);
        }
      } catch (error) {
        console.error("Error cargando eventos para la sección principal:", error);
      }
    }
    fetchEvents();
  }, []);

  return (
    <section className="w-full py-12" id="eventos">
      {/* CONTENEDOR PRINCIPAL */}
      <div className="max-w-6xl mx-auto px-6">
        {/* TITULO */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100 shadow-sm">
                <Calendar className="text-secondary-600" size={24} />
            </div>
            <div>
              <h2 className="text-3xl font-gobold text-slate-900 uppercase tracking-tight">Próximos Eventos</h2>
              <p className="text-slate-500 font-medium text-sm">
                Actividades, servicios especiales y congresos para toda la familia
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/events"
              className="bg-slate-900 text-white font-gobold px-8 py-4 rounded-2xl text-[10px] uppercase tracking-widest shadow-lg hover:bg-secondary-600 transition-all"
            >
              Ver calendario completo
            </Link>
          </div>
        </div>

        {/* LISTA DE EVENTOS */}
        <div className="grid gap-6">
          {events.map((event) => {
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
                key={event.id || event._id}
                className="group bg-white border border-slate-200 rounded-[2rem] p-6 hover:shadow-2xl hover:border-secondary-500/30 transition-all duration-300 flex flex-col md:flex-row items-center justify-between gap-6"
              >
                {/* IZQUIERDA */}
                <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left w-full">
                  <div
                    className="h-20 w-20 rounded-3xl bg-slate-50 border border-slate-100 
                                flex flex-col items-center justify-center shadow-sm"
                  >
                    <span className="text-xs font-bold text-secondary-600 uppercase tracking-widest">
                        {new Date(event.date).toLocaleDateString("es-CO", { month: "short" }).replace(".", "")}
                    </span>
                    <span className="text-2xl font-gobold text-slate-900">
                        {new Date(event.date).getDate() + 1}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/events/${event._id || event.id}`}
                      className="text-xl font-gobold text-slate-900 uppercase tracking-tight group-hover:text-secondary-600 transition-colors"
                    >
                      {event.name}
                    </Link>

                    <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 mt-3 text-xs font-medium text-slate-500">
                      <span className="inline-flex items-center gap-1.5">
                        <Clock size={14} className="text-secondary-500" />
                        {event.time}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin size={14} className="text-secondary-500" />
                        {event.location}
                      </span>
                      {event.slotsLeft && (
                        <span className="inline-flex items-center gap-1.5">
                          <Users size={14} className="text-secondary-500" />
                          Cupos: {event.slotsLeft}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* DERECHA */}
                <div className="flex flex-col md:items-end items-center gap-4 w-full md:w-auto mt-4 md:mt-0">
                  <div className="flex items-center gap-3">
                      {event.price && (
                        <div className="bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
                            <span className="text-xs font-gobold text-slate-900 uppercase tracking-widest">
                            {event.price === "0" || event.price.toLowerCase() === "gratis"
                                ? "Gratis"
                                : `$${event.price}`}
                            </span>
                        </div>
                      )}
                      <span className="px-4 py-2 bg-secondary-50 text-secondary-600 text-[10px] font-bold uppercase tracking-widest rounded-xl">
                        {event.type || "Presencial"}
                      </span>
                  </div>

                  {isRegistrationClosed ? (
                    <span className="px-8 py-4 bg-red-50 text-red-600 text-[10px] font-gobold uppercase tracking-widest rounded-2xl border border-red-100">
                      Inscripciones Cerradas
                    </span>
                  ) : (
                    <button
                      onClick={() => openRegistration(event.id || event._id, event.distance)}
                      className="bg-slate-900 text-white font-gobold px-8 py-4 rounded-2xl text-[10px] uppercase tracking-widest hover:bg-secondary-600 transition-all shadow-lg"
                    >
                      Inscribirme Ahora
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}