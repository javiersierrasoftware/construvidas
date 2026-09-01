"use client";

import { Sun, Waves, Footprints } from 'lucide-react';
import Link from 'next/link';

const kidsServices = [
  {
    icon: <Sun size={40} className="text-secondary-500" />,
    title: "Enseñanza Bíblica",
    description: "Espacios creativos donde los niños aprenden principios bíblicos de una forma divertida y adaptada a su edad.",
    link: "/join",
  },
  {
    icon: <Waves size={40} className="text-secondary-500" />,
    title: "Entorno Seguro",
    description: "Contamos con un equipo de voluntarios capacitados que cuidan y guían a tus hijos mientras disfrutas del servicio.",
    link: "/join",
  },
  {
    icon: <Footprints size={40} className="text-secondary-500" />,
    title: "Propósito desde la Infancia",
    description: "Ayudamos a los más pequeños a descubrir su identidad como hijos de Dios y a desarrollar su fe desde temprano.",
    link: "/join",
  },
];

const ConstruVidasKidsServices = () => {
  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-gobold tracking-tight text-slate-900 uppercase mb-6">
            CONSTRUVIDAS KIDS
          </h2>

          <h3 className="text-2xl md:text-3xl font-gobold text-slate-900 mb-6 uppercase tracking-tight">
            Formamos niños con propósito
          </h3>

          <p className="max-w-3xl mx-auto text-lg text-slate-800 leading-relaxed mb-8">
            Programa espiritual y formativo para niños de 3 a 14 años, enfocado en el crecimiento,
            la confianza y el amor de Dios.
          </p>

          <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-sm md:text-base text-slate-800 font-semibold">
            <div className="flex items-center gap-2 bg-white px-5 py-2.5 rounded-full border border-accent-300 shadow-sm hover:border-secondary-500/50 transition-colors">
              <span className="text-secondary-500">✨</span> Formación Espiritual
            </div>
            <div className="flex items-center gap-2 bg-white px-5 py-2.5 rounded-full border border-accent-300 shadow-sm hover:border-secondary-500/50 transition-colors">
              <span className="text-secondary-500">🤸</span> Recreación Sana
            </div>
            <div className="flex items-center gap-2 bg-white px-5 py-2.5 rounded-full border border-accent-300 shadow-sm hover:border-secondary-500/50 transition-colors">
              <span className="text-secondary-500">🛡️</span> Ambiente Seguro
            </div>
            <div className="flex items-center gap-2 bg-white px-5 py-2.5 rounded-full border border-accent-300 shadow-sm hover:border-secondary-500/50 transition-colors">
              <span className="text-secondary-500">🤝</span> Amor y Compañerismo
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {kidsServices.map((service, index) => (
            <Link href={service.link} key={index} className="block group">
              <div
                className="bg-white border border-accent-300 rounded-3xl shadow-lg group-hover:border-secondary-500/50 p-8 flex flex-col items-center text-center transition-all duration-300 transform group-hover:-translate-y-1 h-full"
              >
                <div className="mb-6">
                  {service.icon}
                </div>
                <h3 className="text-xl font-gobold mb-3 text-slate-900 uppercase tracking-tight">{service.title}</h3>
                <p className="text-slate-800 text-sm leading-relaxed font-medium">
                  {service.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ConstruVidasKidsServices;