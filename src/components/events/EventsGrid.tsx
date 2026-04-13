import Link from "next/link";
import Image from "next/image";
import { CalendarIcon, MapPin } from "lucide-react";
import { Event } from "@/types/Event";

interface EventsGridProps {
  events: Event[];
}

export default function EventsGrid({ events }: EventsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {events.map((event) => (
        <Link
          key={event.id}
          href={`/events/${event.id}`}
          className="group bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden hover:shadow-2xl hover:border-secondary-500/30 transition-all duration-500 block"
        >
          {/* IMAGEN */}
          <div className="relative w-full h-64 overflow-hidden">
            <Image
              src={event.image}
              alt={event.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl text-slate-900 font-gobold text-xs shadow-sm">
                {event.type || "Presencial"}
            </div>
          </div>

          {/* INFO */}
          <div className="p-8">
            <h3 className="text-2xl font-gobold text-slate-900 uppercase tracking-tight group-hover:text-secondary-600 transition-colors mb-4">{event.name}</h3>

            <div className="space-y-3">
                <p className="text-sm font-medium text-slate-600 flex items-center gap-3">
                    <CalendarIcon size={18} className="text-secondary-500" />
                    {event.date} · {event.time}
                </p>

                <p className="text-sm font-medium text-slate-500 flex items-center gap-3 italic">
                    <MapPin size={18} className="text-secondary-500" />
                    {event.location}
                </p>
            </div>

            <div className="mt-8 flex justify-between items-center pt-6 border-t border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Más información</span>
                <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-all">
                    <span className="text-xl">→</span>
                </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}