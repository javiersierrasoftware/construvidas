"use client";

import { Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function EventsFeed() {
  const [events, setEvents] = useState([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));

    fetch("/api/events?limit=3")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch(console.error);
  }, []);

  return (
    <section id="eventos">
      <div className="max-w-6xl mx-auto px-4">

        {/* HEADER */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-4">
            <img src="/construvidastransparente.png" alt="Logo" className="h-10 w-10 object-contain" />

            <div>
              <h2 className="text-3xl font-gobold text-slate-900 uppercase tracking-tight">VIVE LA COMUNIDAD</h2>
              <p className="text-slate-500 text-sm font-semibold uppercase tracking-widest">Próximos eventos</p>
            </div>
          </div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {events.map((event: any) => {

            const formatDate = (dateString: string) => {
              return new Date(dateString).toLocaleDateString("es-CO", {
                day: "numeric",
                month: "long",
                year: "numeric",
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
                className="relative bg-white border border-accent-300 rounded-3xl overflow-hidden shadow-lg group hover:shadow-xl transition-all"
              >
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-2 text-slate-500">
                    <Calendar size={20} />
                    <h3 className="text-xl font-gobold text-slate-900 uppercase tracking-tight">{event.name}</h3>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-slate-800 font-medium">
                      <span className="font-bold text-primary-950">Fecha:</span> {formatDate(event.date)}
                    </p>
                    <p className="text-sm text-slate-800 font-medium">
                      <span className="font-bold text-primary-950">Hora:</span> {formatTime(event.time)}
                    </p>
                    <p className="text-sm text-slate-800 font-medium">
                      <span className="font-bold text-primary-950">Lugar:</span> {event.location}
                    </p>
                  </div>

                  {/* PRECIO */}
                  {event.price && (
                    <p className="text-2xl font-gobold text-slate-900 mt-4">
                      {event.price === "0" || event.price.toLowerCase() === "gratis"
                        ? "Gratis"
                        : event.price}
                    </p>
                  )}
                </div>
                <div className="p-6 pt-0 flex justify-between items-center bg-gray-50 border-t border-accent-100">
                  <Link href={`/events/${event._id}`} className="text-slate-500 hover:text-secondary-500 text-sm font-bold transition-colors">
                    Ver detalles
                  </Link>
                  {isRegistrationClosed ? (
                    <span className="bg-red-50 text-red-600 border border-red-100 px-4 py-2 rounded-xl text-sm font-bold">
                      Cerrado
                    </span>
                  ) : (
                    <Link href={`/events/register/${event._id}`} className="bg-primary-500 text-slate-900 px-5 py-2 rounded-xl text-sm font-gobold uppercase tracking-wide hover:bg-primary-600 transition shadow-md border border-primary-600">
                      Inscribirme
                    </Link>
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