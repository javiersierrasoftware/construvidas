"use client";

import { Footprints, Bike, Waves } from 'lucide-react';
import Link from 'next/link';

const services = [
  {
    icon: <Footprints size={40} className="text-secondary-500" />,
    title: "LEGADO (JÓVENES)",
    subtitle: "Discipulado, amistad y propósito",
    description: "Espacio dedicado para adolescentes y jóvenes, donde conectamos a través de la fe, la amistad y un propósito claro en Dios.",
    features: [
      "Reuniones dinámicas todos los sábados",
      "Discipulado enfocado en la juventud",
      "Actividades de integración y servicio",
      "Mentoreo espiritual para la vida"
    ],
    linkText: "Saber más de Legado",
    link: "/join",
  },
  {
    icon: <Bike size={40} className="text-secondary-500" />,
    title: "CASAS DE VIDA",
    subtitle: "Iglesia pequeña en tu hogar",
    description: "Grupos pequeños que se reúnen en casas por toda la ciudad para estudiar la Biblia, orar y fortalecer los lazos de familia.",
    features: [
      "Reuniones todos los lunes",
      "Compañerismo cercano y genuino",
      "Estudio profundo de la Palabra",
      "Apoyo mutuo y oración en familia"
    ],
    linkText: "Encuentra tu Casa de Vida",
    link: "/join",
  },
  {
    icon: <Waves size={40} className="text-secondary-500" />,
    title: "PROYECCIÓN SOCIAL",
    subtitle: "Una iglesia para la ciudad",
    description: "Acciones concretas de servicio y amor al prójimo, extendiendo la mano a quienes más lo necesitan en Sincelejo.",
    features: [
      "Brigadas de apoyo comunitario",
      "Servicio social en sectores vulnerables",
      "Impacto positivo en nuestra ciudad",
      "Voluntariado con propósito cristiano"
    ],
    linkText: "Unirme a Proyección Social",
    link: "/join",
  },
];

const ConstruVidasServices = () => {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-gobold tracking-tight text-slate-900 uppercase">
            NUESTROS PROGRAMAS
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Link href={service.link} key={index} className="block group h-full">
              <div
                className="bg-white border border-accent-300 rounded-3xl p-8 flex flex-col h-full transition-all duration-300 hover:border-secondary-500/50 hover:shadow-xl group-hover:-translate-y-2 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary-600/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-secondary-600/10 transition-all duration-500"></div>

                <div className="mb-6 relative z-10">
                  <div className="p-3 bg-accent-100 rounded-2xl w-fit group-hover:bg-secondary-600/10 transition-colors duration-300">
                    {service.icon}
                  </div>
                </div>

                <h3 className="text-2xl font-gobold mb-2 text-slate-900 uppercase tracking-wide group-hover:text-slate-500 transition-colors">
                  {service.title}
                </h3>

                <p className="text-slate-500 font-semibold mb-4 text-xs uppercase tracking-wider">
                  {service.subtitle}
                </p>

                <p className="text-slate-800 text-sm leading-relaxed mb-6 font-medium">
                  {service.description}
                </p>

                <div className="space-y-3 mb-8 flex-grow">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start text-sm text-slate-800 group/item font-medium">
                      <span className="text-slate-500 mr-2 mt-0.5 flex-shrink-0 group-hover:text-secondary-500 transition-colors">•</span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto pt-4 border-t border-accent-200 w-full">
                  <span className="text-slate-500 font-gobold text-sm tracking-wide group-hover:text-secondary-500 transition-colors flex items-center gap-2">
                    {service.linkText.replace('👉 ', '')}
                    <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ConstruVidasServices;