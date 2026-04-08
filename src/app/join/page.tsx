import Link from "next/link";
import Image from "next/image";

export default function JoinPage() {
  return (
    <main className="min-h-screen pt-28 pb-20 px-6">
      {/* CONTENEDOR */}
      <div className="max-w-5xl mx-auto space-y-20">
        {/* INTRO */}
        <section className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-gobold uppercase tracking-tight">
            Únete a <span className="text-secondary-400">CONSTRUVIDAS</span>
          </h1>
          <p className="text-slate-800 max-w-2xl mx-auto text-lg font-medium">
            Un lugar para crecer espiritualmente, conectar con la familia de Dios
            y vivir una vida con propósito y fe.
          </p>
        </section>

        {/* BENEFICIOS */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              title: "Crecimiento Espiritual",
              desc: "Encuentros de fe y enseñanzas bíblicas para fortalecer tu caminar con Dios.",
            },
            {
              title: "Comunidad de Fe",
              desc: "Conecta con personas que comparten tus valores y te motivan a ser mejor.",
            },
            {
              title: "Impacto y Servicio",
              desc: "Participa en actividades que transforman vidas y sirven a nuestra ciudad.",
            },
          ].map((benefit, i) => (
            <div
              key={i}
              className="bg-white/40 border border-primary-800/30 rounded-3xl p-8 hover:border-secondary-400/50 transition backdrop-blur-sm"
            >
              <h3 className="text-xl font-gobold mb-4 uppercase tracking-wide text-slate-900">{benefit.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{benefit.desc}</p>
            </div>
          ))}
        </section>

        {/* IMPACTO SOCIAL */}
        <section className="space-y-6 text-center">
          <h2 className="text-3xl font-gobold uppercase tracking-tight">Viviendo con Propósito</h2>
          <p className="text-slate-800 max-w-3xl mx-auto text-lg leading-relaxed">
            En CONSTRUVIDAS creemos en el poder de la fe para transformar vidas.
            Nuestra iglesia promueve valores espirituales, integración social y
            espacios de verdadera amistad. Buscamos construir comunidad a través del
            amor al prójimo, la palabra de Dios y el compañerismo.
          </p>
        </section>

        {/* PLANES DE SUSCRIPCIÓN */}
        <section className="space-y-10">
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl font-gobold mb-8 uppercase tracking-tight">
              Programas y Actividades
            </h2>
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-10 text-slate-800 text-lg font-medium">
              <span className="flex items-center gap-2">
                <span className="text-secondary-500">✔</span> Ministerios de Vida
              </span>
              <span className="flex items-center gap-2">
                <span className="text-secondary-500">✔</span> Eventos y Conferencias
              </span>
              <span className="flex items-center gap-2">
                <span className="text-secondary-500">✔</span> Crecimiento Familiar
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Ministerio de Alabanza",
                img: "/ministries/alabanza.png",
                desc: "Adoración y servicio a través de la música y las artes en cada servicio.",
              },
              {
                name: "Casas de Vida",
                img: "/ministries/casas_de_vida.png",
                desc: "Nuestros grupos pequeños que se reúnen en hogares por Sincelejo.",
              },
              {
                name: "Legado (Jóvenes)",
                img: "/ministries/legado.png",
                desc: "Un lugar para que los jóvenes encuentren su propósito en Dios.",
              },
              {
                name: "ConstruKids",
                img: "/ministries/construkids.png",
                desc: "Formación espiritual y cuidado para los más pequeños de la casa.",
              },
              {
                name: "Hombres e Integridad",
                img: "/ministries/hombres.png",
                desc: "Encuentros para fortalecer el liderazgo y la fe de cada varón.",
              },
              {
                name: "Mujeres de Propósito",
                img: "/ministries/mujeres.png",
                desc: "Espacios de crecimiento y edificación para la mujer de hoy.",
              },
            ].map((plan, i) => (
              <div
                key={i}
                className="bg-white/40 border border-primary-800/30 rounded-3xl overflow-hidden hover:border-secondary-400/50 transition duration-300 group flex flex-col backdrop-blur-sm"
              >
                {/* Imagen */}
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={plan.img}
                    alt={plan.name}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-500 opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-950 to-transparent"></div>
                  <div className="absolute bottom-4 left-6">
                    <h3 className="text-2xl font-gobold text-slate-900 uppercase tracking-tight">{plan.name}</h3>
                  </div>
                </div>

                {/* Contenido */}
                <div className="p-6 flex flex-col flex-grow">
                  <p className="text-slate-500 text-sm mb-8 flex-grow leading-relaxed">{plan.desc}</p>

                  <a
                    href="https://wa.me/573008384014?text=Hola,%20me%20gustaría%20saber%20más%20de%20ConstruVidas"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto w-full block text-center py-3 rounded-2xl bg-slate-800/5 border border-slate-700/50 text-slate-800 hover:bg-slate-900 hover:text-white transition-all font-gobold uppercase tracking-wide"
                  >
                    Saber más
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* LUGARES DE REUNIÓN */}
        <section className="space-y-6">
          <h2 className="text-3xl font-gobold uppercase tracking-tight">Nuestros Espacios</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                lugar: "Templo Principal",
                desc: "Calle 17 N.º 30-48, Dulce Nombre. Servicios generales Domingos 8 AM.",
              },
              { lugar: "Salón Legado", desc: "Espacio para jóvenes y adolescentes los Sábados." },
              { lugar: "ConstruKids", desc: "Ambiente diseñado para la formación de tus hijos." },
            ].map((s, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-200 rounded-3xl p-8 shadow-sm">
                <h3 className="text-xl font-gobold text-slate-900 uppercase tracking-tight mb-2">{s.lugar}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="text-center mt-10">
          <Link
            href="/register"
            className="
              w-full max-w-md mx-auto
              inline-flex items-center justify-center
              px-10 py-5
              bg-slate-900
              text-white font-gobold uppercase tracking-widest
              rounded-2xl
              text-lg
              hover:scale-105 transition-all
              shadow-2xl shadow-slate-900/20
              border border-white/10
            "
          >
            Crear mi cuenta y unirme
          </Link>

          <p className="text-slate-500 text-sm mt-6 font-medium">
            Forma parte de la familia espiritual más activa de Sincelejo.
          </p>
        </section>
      </div>
    </main>
  );
}