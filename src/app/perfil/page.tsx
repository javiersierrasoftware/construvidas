"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LogOut, User, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Dashboard() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const user = session?.user;

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  const logout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  if (!user) return null;

  return (
    <main className="min-h-screen bg-slate-50 pt-32 pb-20 px-6">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* TÍTULO */}
        <div className="flex items-center gap-4">
          <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
            <User size={32} className="text-secondary-600" />
          </div>
          <div>
            <h2 className="text-secondary-600 text-[10px] font-gobold uppercase tracking-[0.4em]">Mi Cuenta</h2>
            <h1 className="text-4xl font-gobold text-slate-900 uppercase tracking-tight">Mi Perfil</h1>
          </div>
        </div>

        {/* CONTENEDOR PRINCIPAL */}
        <div className="grid md:grid-cols-3 gap-8">
            {/* COLUMNA INFO */}
            <section className="md:col-span-1 bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-xl h-fit">
                <h2 className="text-xl font-gobold text-slate-900 mb-6 uppercase tracking-tight">Información Personal</h2>

                <div className="space-y-4">
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nombre</label>
                        <p className="text-slate-900 font-semibold">{user.name}</p>
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Email</label>
                        <p className="text-slate-900 font-semibold">{user.email}</p>
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Rol</label>
                        <span className="inline-block px-3 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-widest rounded-md">
                            {user.role}
                        </span>
                    </div>
                </div>

                <div className="pt-8 pt-4 border-t border-slate-100 mt-8">
                    <button
                    onClick={logout}
                    className="w-full inline-flex items-center justify-center gap-2 bg-red-50 text-red-600 font-gobold px-6 py-4 rounded-2xl hover:bg-red-100 transition-all uppercase tracking-widest text-xs"
                    >
                    <LogOut size={18} /> Cerrar sesión
                    </button>
                </div>
            </section>

            {/* COLUMNA CONTENIDO/ADMIN */}
            <div className="md:col-span-2 space-y-8">
                {/* PRÓXIMAMENTE */}
                <section className="bg-white border border-slate-200 rounded-[2.5rem] p-10 text-center shadow-lg overflow-hidden relative group">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary-500 to-accent-500"></div>
                    <p className="text-2xl text-slate-900 font-gobold uppercase tracking-tight mb-2">
                        Próximamente
                    </p>
                    <p className="text-slate-500 font-medium">Nuevas funcionalidades para nuestra comunidad espiritual.</p>
                </section>

                {/* SECCIÓN DE ADMIN */}
                {user.role?.toUpperCase() === "ADMIN" && (
                <section className="bg-white border border-slate-200 rounded-[2.5rem] p-10 shadow-2xl relative">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 bg-slate-900 rounded-xl">
                            <ShieldCheck size={28} className="text-white" />
                        </div>
                        <h2 className="text-2xl font-gobold text-slate-900 uppercase tracking-tight">Panel de Administrador</h2>
                    </div>

                    <p className="text-slate-500 font-medium mb-10 leading-relaxed">
                        Desde aquí puedes gestionar el contenido y las actividades de la plataforma ConstruVidas.
                    </p>

                    <div className="space-y-10">
                        {/* CATEGORÍA ADMIN */}
                        {[
                            {
                                title: "Historias",
                                links: [
                                    { text: "Crear Nueva Historia", href: "/stories/create" },
                                    { text: "Gestionar Historias", href: "/stories/manage" }
                                ]
                            },
                            {
                                title: "Eventos",
                                links: [
                                    { text: "Crear Nuevo Evento", href: "/events/create", primary: true },
                                    { text: "Gestionar Eventos", href: "/events/manage" }
                                ]
                            },
                            {
                                title: "Tienda",
                                links: [
                                    { text: "Crear Producto", href: "/admin/products/create" },
                                    { text: "Gestionar Productos", href: "/admin/products/manage" },
                                    { text: "Ventas Realizadas", href: "/admin/sales" }
                                ]
                            },
                            {
                                title: "Hero Slider",
                                links: [
                                    { text: "Gestionar Hero Slider", href: "/admin/hero-slider" }
                                ]
                            }
                        ].map((cat, idx) => (
                            <div key={idx} className="space-y-4">
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">{cat.title}</h3>
                            <div className="flex flex-wrap gap-3">
                                {cat.links.map((link, lIdx) => (
                                    <Link
                                        key={lIdx}
                                        href={link.href}
                                        className={`inline-block font-gobold py-4 px-8 rounded-2xl transition-all uppercase tracking-widest text-[11px] shadow-sm ${
                                            link.primary 
                                            ? "bg-slate-900 text-white hover:bg-secondary-600 hover:shadow-lg" 
                                            : "bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200"
                                        }`}
                                    >
                                        {link.text}
                                    </Link>
                                ))}
                            </div>
                            </div>
                        ))}
                    </div>
                </section>
                )}
            </div>
        </div>
      </div>
    </main>
  );
}