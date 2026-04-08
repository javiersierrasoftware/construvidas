export default function DiscipuladoPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 pt-28 pb-20">

      <h1 className="text-4xl md:text-5xl font-gobold mb-6 text-slate-900 uppercase tracking-tight">PROCESO DE DISCIPULADO</h1>

      <p className="text-slate-600 leading-relaxed max-w-3xl mb-12 text-lg font-medium">
        En CONSTRUVIDAS, creemos que el discipulado es el camino para conocer a Jesús, 
        parecerse a Él y cumplir Su propósito en la tierra. No es solo adquirir conocimiento, 
        sino una transformación de vida que nos lleva a servir a Dios y a los demás de forma integral.
      </p>

      {/* SECCIÓN: ETAPAS DEL PROCESO */}
      <section className="mb-20">
        <h2 className="text-3xl font-gobold mb-8 text-slate-800 uppercase tracking-tight">
          Nuestra Ruta de Crecimiento
        </h2>
        <p className="text-slate-500 mb-10 max-w-2xl text-lg">
          Cada proceso sigue una estructura clara para acompañar tu evolución espiritual:
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            {
              title: "ENCUENTRO",
              desc: "Una experiencia personal y poderosa con el amor de Dios que marca el inicio de tu nueva vida."
            },
            {
              title: "ESCUELA DE VIDA",
              desc: "Formación en los fundamentos de la fe para crecer con raíces sólidas en la Palabra."
            },
            {
              title: "DISCIPULADO",
              desc: "Crecimiento continuo en grupos pequeños (Casas de Vida) para vivir el evangelio en comunidad."
            },
            {
              title: "LIDERAZGO",
              desc: "Capacitación para servir a otros y cumplir la Gran Comisión, multiplicando el amor de Dios."
            }
          ].map((item, index) => (
            <div key={index} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-secondary-500/30 transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-slate-100 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-slate-200 transition-all"></div>
              <span className="text-5xl font-gobold text-slate-200 mb-4 block group-hover:text-secondary-500/20 transition-colors">
                0{index + 1}
              </span>
              <h3 className="text-xl font-gobold text-slate-900 mb-3 uppercase tracking-wide group-hover:text-secondary-600 transition-colors">{item.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed relative z-10 font-medium">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200">
          <p className="text-slate-700 leading-relaxed text-lg italic">
            <span className="text-secondary-600 font-gobold not-italic mr-2">«</span>
            Por tanto, id, y haced discípulos a todas las naciones, bautizándolos en el nombre del Padre, y del Hijo, y del Espíritu Santo. 
            <span className="text-secondary-600 font-gobold not-italic ml-2">»</span>
            <span className="block mt-2 text-sm font-bold text-slate-500">— MATEO 28:19</span>
          </p>
        </div>
      </section>

      {/* SECCIÓN 1: VIDEOS DE ENSEÑANZA */}
      <section className="mb-20">
        <h2 className="text-2xl font-gobold mb-8 text-slate-800 uppercase tracking-tight">Recursos y Enseñanzas</h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="aspect-video w-full rounded-3xl overflow-hidden border border-slate-200 shadow-lg">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/sPgpoHl_Icg"
              title="Discipulado Video 1"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          <div className="aspect-video w-full rounded-3xl overflow-hidden border border-slate-200 shadow-lg">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/vVCrlgwrxl4"
              title="Discipulado Video 2"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      {/* SECCIÓN: QUÉ INCLUYE EL CAMINO */}
      <section className="mb-20">
        <h2 className="text-3xl font-gobold mb-10 text-center text-slate-900 uppercase tracking-tight">
          ¿QUÉ ENCONTRARÁS EN ESTE CAMINO?
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            "Mentoría espiritual personalizada",
            "Estudio sistemático de la Biblia",
            "Integración en una Casa de Vida",
            "Talleres de formación ministerial",
            "Descubrimiento de tus dones espirituales",
            "Apañamiento en momentos de crisis",
            "Seminarios de sanidad interior",
            "Capacitación en liderazgo cristiano",
            "Material de estudio trimestral"
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-3 bg-white px-6 py-5 rounded-2xl border border-slate-100 shadow-sm hover:border-secondary-300 transition-colors">
              <span className="text-secondary-600 flex-shrink-0">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </span>
              <span className="text-slate-700 font-semibold text-sm uppercase tracking-tight">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* BOTÓN FINAL */}
      <div className="text-center mt-12">
        <a
          href="https://wa.me/573008384014?text=Hola,%20quiero%20iniciar%20mi%20proceso%20de%20discipulado"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-slate-900 text-white font-gobold px-12 py-5 rounded-2xl text-xl uppercase tracking-widest hover:bg-secondary-600 transition-all shadow-xl shadow-slate-900/20"
        >
          Iniciar mi proceso hoy
        </a>
      </div>
    </div>
  );
}