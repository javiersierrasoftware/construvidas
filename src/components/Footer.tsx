import { Instagram } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-32 bg-white border-t border-slate-100 py-24 pb-12">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-16">

        {/* LOGO & DESCRIPTION */}
        <div className="md:col-span-1">
            <div className="flex flex-col leading-none select-none mb-6">
                <span className="text-slate-900 font-gobold text-2xl tracking-tight uppercase">CONSTRUVIDAS</span>
                <span className="text-slate-500 text-[10px] uppercase tracking-[0.3em] font-bold">Iglesia Cristiana</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed font-medium">
                Edificando vidas sobre el fundamento de la fe, la esperanza y el amor en Jesucristo.
            </p>
        </div>

        {/* CONTACTO */}
        <div>
          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-8">Ubicación</h3>
          <div className="space-y-4">
              <p className="text-slate-600 text-sm font-medium">Calle 17 N.º 30-48, Dulce Nombre</p>
              <p className="text-slate-600 text-sm font-medium">Sincelejo, Sucre – Colombia</p>
              <div className="pt-2">
                <p className="text-slate-900 text-sm font-gobold uppercase tracking-widest mt-1">+57 300 838 4014</p>
              </div>
          </div>
        </div>

        {/* REDES */}
        <div>
          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-8">Comunidad</h3>
          <div className="space-y-4">
            <Link
                href="https://instagram.com/construvidas"
                target="_blank"
                className="flex items-center gap-3 text-slate-600 hover:text-secondary-600 transition-all font-bold text-sm"
            >
                <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-100">
                    <Instagram size={16} />
                </div>
                @construvidas
            </Link>
            <Link
                href="https://facebook.com/construvidas"
                target="_blank"
                className="flex items-center gap-3 text-slate-600 hover:text-secondary-600 transition-all font-bold text-sm"
            >
                <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-100 uppercase text-[10px] font-bold">
                    f
                </div>
                /construvidas
            </Link>
          </div>
        </div>

        {/* CREATIVO */}
        <div className="md:text-right">
          <p className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.3em] mb-6">Desarrollado por</p>
          <p className="font-gobold text-slate-900 text-2xl tracking-tighter opacity-80">TICSOFT S.A.S.</p>
          <Link
            href="https://www.ticsoft.co"
            target="_blank"
            className="text-secondary-500 hover:text-secondary-600 transition text-[10px] font-bold uppercase tracking-widest mt-2 inline-block border-b border-secondary-500/20 pb-1"
          >
            www.ticsoft.co
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-24 pt-12 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">
            © {new Date().getFullYear()} CONSTRUVIDAS — Todos los derechos reservados.
        </div>
        <div className="flex gap-8 text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">
            <Link href="/privacy" className="hover:text-slate-900 transition">Privacidad</Link>
            <Link href="/terms" className="hover:text-slate-900 transition">Términos</Link>
        </div>
      </div>
    </footer>
  );
}