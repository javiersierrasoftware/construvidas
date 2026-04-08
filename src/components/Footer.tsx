import { Instagram } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 bg-white/50 border-t border-primary-800/30 py-12">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-10">

        {/* CONTACTO */}
        <div>
          <h3 className="text-xl font-gobold mb-4 text-slate-800 uppercase tracking-wider">Contacto</h3>
          <p className="text-slate-500 text-sm">WhatsApp: +57 300 838 4014</p>
          <p className="text-slate-500 text-sm">Calle 17 N.º 30-48, Dulce Nombre</p>
          <p className="text-slate-500 text-sm">Sincelejo, Sucre – Colombia</p>
        </div>

        {/* REDES */}
        <div>
          <h3 className="text-xl font-gobold mb-4 text-slate-800 uppercase tracking-wider">Síguenos</h3>

          <Link
            href="https://instagram.com/construvidas"
            target="_blank"
            className="flex items-center gap-2 text-slate-700 hover:text-secondary-600 transition font-medium"
          >
            <Instagram size={20} />
            @construvidas
          </Link>
          <div className="mt-2 flex items-center gap-2 text-slate-700 text-sm">
            <span>Facebook:</span>
            <Link href="https://facebook.com/construvidas" target="_blank" className="hover:text-secondary-600 transition">
              /construvidas
            </Link>
          </div>
        </div>

        {/* CREDITO */}
        <div className="text-slate-500 text-sm">
          <p>Diseñado y desarrollado por</p>
          <p className="font-gobold text-slate-900 text-lg mt-1 tracking-tight">TICSOFT S.A.S.</p>
          <Link
            href="https://www.ticsoft.co"
            target="_blank"
            className="hover:text-secondary-400 transition text-sm font-medium"
          >
            www.ticsoft.co
          </Link>
        </div>
      </div>

      <div className="mt-12 text-center text-xs text-accent-600 font-medium tracking-wide">
        © {new Date().getFullYear()} CONSTRUVIDAS Iglesia Cristiana — Todos los derechos reservados.
      </div>
    </footer>
  );
}