import { connectDB } from "@/lib/mongodb";
import Event from "@/models/Event";
import { Calendar, Clock, MapPin, Tag, Info, ArrowLeft, Share2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import QRCode from "react-qr-code";

async function getEvent(id: string) {
  await connectDB();
  const event = await Event.findById(id).lean();
  return JSON.parse(JSON.stringify(event));
}

export default async function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = await getEvent(id);

  if (!event) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-CO", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
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

  const isRegistrationClosed = event.maxRegistrationDate && new Date() > new Date(event.maxRegistrationDate);

  return (
    <main className="min-h-screen bg-slate-50/50 pt-28 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <Link href="/events" className="inline-flex items-center gap-2 text-slate-400 hover:text-secondary-600 transition-colors mb-8 text-xs font-bold uppercase tracking-widest">
            <ArrowLeft size={16} /> Volver a eventos
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* COLUMNA IZQUIERDA: CONTENIDO */}
          <div className="lg:col-span-2 space-y-8">
            <header className="space-y-4">
               <div className="flex items-center gap-2">
                 <span className="bg-secondary-100 text-secondary-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                    {event.ministry || "Evento"}
                 </span>
               </div>
               <h1 className="text-4xl md:text-6xl font-gobold text-slate-900 uppercase tracking-tight leading-none">
                 {event.name}
               </h1>
            </header>

            <div className="relative aspect-video rounded-[3rem] overflow-hidden shadow-2xl border border-white">
              <Image
                src={event.image || "/event-placeholder.jpg"}
                alt={event.name}
                fill
                className="object-cover"
                priority
              />
            </div>

            <section className="bg-white rounded-[3rem] p-10 shadow-sm border border-slate-100">
               <h3 className="text-xl font-gobold text-slate-900 uppercase tracking-tight mb-6 flex items-center gap-3">
                 <Info size={24} className="text-secondary-500" /> Descripción del Evento
               </h3>
               <div className="text-slate-600 leading-relaxed font-medium whitespace-pre-wrap">
                 {event.description}
               </div>
            </section>
          </div>

          {/* COLUMNA DERECHA: SIDEBAR */}
          <aside className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-[3rem] p-8 shadow-xl sticky top-28">
              <div className="space-y-8">
                {/* BOTON INSCRIPCION */}
                <div>
                   {isRegistrationClosed ? (
                     <div className="w-full bg-red-50 text-red-600 font-gobold py-5 rounded-2xl text-center uppercase tracking-widest text-xs border border-red-100 italic">
                       Inscripciones Cerradas
                     </div>
                   ) : (
                     <Link
                       href={`/events/register/${event._id}`}
                       className="block w-full bg-slate-900 text-white font-gobold py-5 rounded-2xl text-center uppercase tracking-widest text-xs shadow-lg hover:bg-secondary-600 transition-all transform hover:-translate-y-1"
                     >
                       Inscribirse Ahora
                     </Link>
                   )}
                </div>

                <div className="pt-2">
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Información del Encuentro</p>
                   
                   <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-secondary-50 rounded-xl text-secondary-600">
                           <Calendar size={20} />
                        </div>
                        <div>
                           <p className="text-sm font-bold text-slate-900 leading-tight capitalize">{formatDate(event.date)}</p>
                           <p className="text-[10px] text-slate-400 font-bold uppercase mt-1 flex items-center gap-1">
                             <Clock size={10} /> {formatTime(event.time)}
                           </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-secondary-50 rounded-xl text-secondary-600">
                           <MapPin size={20} />
                        </div>
                        <div>
                           <p className="text-sm font-bold text-slate-900 leading-tight">{event.location}</p>
                           <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Lugar del evento</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-secondary-50 rounded-xl text-secondary-600">
                           <Tag size={20} />
                        </div>
                        <div>
                           <p className="text-sm font-bold text-slate-900 leading-tight">
                             {event.price === 0 || event.price === "0" ? "Gratis" : `$${Number(event.price).toLocaleString()}`}
                           </p>
                           <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Valor de inscripción</p>
                        </div>
                      </div>
                   </div>
                </div>

                {/* QR CODE */}
                <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 flex flex-col items-center gap-4">
                  <div className="bg-white p-3 rounded-2xl shadow-inner border border-slate-100">
                    <QRCode
                      value={`${typeof window !== 'undefined' ? window.location.origin : ''}/events/register/${event._id}`}
                      size={140}
                      level="H"
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] font-bold text-slate-900 uppercase tracking-widest">Inscríbete escaneando</p>
                    <p className="text-[9px] text-slate-400 font-medium px-4 mt-1 leading-tight">Escanea este código QR para ir al formulario de inscripción.</p>
                  </div>
                </div>

                <div className="flex justify-center">
                   <button className="text-slate-400 hover:text-secondary-600 transition-colors flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
                     <Share2 size={16} /> Compartir Evento
                   </button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
