"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Menu, X, ShoppingCart, ChevronDown } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

type UserSession = {
  name?: string;
  role?: string;
  [key: string]: any;
} | null;

type AdminSection = "historias" | "eventos" | "tienda" | "hero" | null;

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState<AdminSection>(null);

  const { data: session } = useSession();
  const user = session?.user as UserSession | undefined;

  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const toggleMobile = () => setMobileOpen((v) => !v);
  const toggleProfileMenu = () => setMenuOpen((v) => !v);

  const toggleCart = useCartStore((state) => state.toggleCart);
  const items = useCartStore((state) => state.items);
  const totalItems = items.reduce((acc, item) => acc + item.qty, 0);

  /* ---------------------- CERRAR MENÚ CLICK AFUERA (DESKTOP PERFIL) ---------------------- */
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }

    if (menuOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  /* ---------------------- BLOQUEAR SCROLL CUANDO MENÚ MÓVIL ABIERTO ---------------------- */
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  /* ------------------------- LOGOUT ------------------------- */
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/login" });
    setMenuOpen(false);
    setMobileOpen(false);
    setAdminOpen(null);
  };

  const closeMobile = () => {
    setMobileOpen(false);
    setAdminOpen(null);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-xl border-b border-accent-300 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="h-10 w-10 relative transition-transform duration-300 group-hover:scale-110">
            <Image
              src="/construvidastransparente.png"
              alt="CONSTRUVIDAS Logo"
              fill
              className="object-contain"
            />
          </div>
          <div className="flex flex-col leading-none select-none">
            <span className="text-slate-900 font-gobold text-2xl tracking-tight uppercase">CONSTRUVIDAS</span>
            <span className="text-slate-500 text-[9px] uppercase tracking-[0.3em] font-bold opacity-100">
              Iglesia Cristiana
            </span>
          </div>
        </Link>

        {/* MENU DESKTOP */}
        <div className="hidden md:flex items-center gap-8 text-sm">
          <NavLinks />

          {/* CARRITO */}
          <button
            onClick={toggleCart}
            className="relative hover:text-secondary-400 transition text-gray-200"
            aria-label="Abrir carrito"
          >
            <ShoppingCart size={20} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-gradient-to-br from-secondary-400 to-accent-400 text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>

          {/* SESIÓN */}
          {!user ? (
            <Link
              href="/login"
              className="bg-gradient-to-br from-secondary-400 to-accent-400 text-black font-semibold px-5 py-1.5 rounded-full"
            >
              Ingresar
            </Link>
          ) : (
            <div className="relative" ref={menuRef}>
              <button
                onClick={toggleProfileMenu}
                className="flex items-center gap-2"
                aria-label="Abrir menú de perfil"
              >
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-secondary-400 to-accent-400 text-black font-bold flex items-center justify-center">
                  {user?.name?.charAt(0)?.toUpperCase() ?? "U"}
                </div>
                <ChevronDown size={18} className="text-slate-800" />
              </button>

              {/* ---------- MENU DESPLEGABLE ---------- */}
              {menuOpen && (
                <div className="absolute right-0 mt-4 w-72 bg-white border border-slate-100 rounded-[2rem] shadow-2xl z-50 overflow-hidden py-4 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="px-6 py-4 mb-2 border-b border-slate-50">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Bienvenido</p>
                    <p className="text-sm font-gobold text-slate-900 uppercase truncate">{user?.name}</p>
                  </div>

                  <Link
                    href="/perfil"
                    className="block px-6 py-3 text-sm font-medium hover:bg-slate-50 hover:text-secondary-600 transition text-slate-600"
                    onClick={() => setMenuOpen(false)}
                  >
                    Mi Perfil
                  </Link>

                  {/* ---------- ADMIN ---------- */}
                  {user?.role === "ADMIN" && (
                    <div className="mt-2">
                      <div className="px-6 py-3 text-[10px] uppercase tracking-[0.2em] text-secondary-500 font-bold bg-secondary-50/50">
                        Administración
                      </div>

                      <div className="px-2 pb-2">
                        <div className="mt-2 flex flex-col gap-1">
                            <Link
                            href="/stories/manage"
                            className="block px-6 py-2.5 text-xs font-bold hover:bg-slate-50 transition text-slate-500 rounded-xl"
                            onClick={() => setMenuOpen(false)}
                            >
                            Gestionar Historias
                            </Link>

                            <Link
                            href="/events/manage"
                            className="block px-6 py-2.5 text-xs font-bold hover:bg-slate-50 transition text-slate-500 rounded-xl"
                            onClick={() => setMenuOpen(false)}
                            >
                            Gestionar Eventos
                            </Link>

                            <Link
                            href="/admin/products/manage"
                            className="block px-6 py-2.5 text-xs font-bold hover:bg-slate-50 transition text-slate-500 rounded-xl"
                            onClick={() => setMenuOpen(false)}
                            >
                            Gestionar Tienda
                            </Link>

                             <Link
                             href="/admin/surveys"
                             className="block px-6 py-2.5 text-xs font-bold hover:bg-slate-50 transition text-slate-500 rounded-xl"
                             onClick={() => setMenuOpen(false)}
                             >
                             Gestionar Encuestas
                             </Link>

                            <Link
                            href="/admin/hero-slider"
                            className="block px-6 py-2.5 text-xs font-bold hover:bg-slate-50 transition text-slate-500 rounded-xl"
                            onClick={() => setMenuOpen(false)}
                            >
                            Hero Slider
                            </Link>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="mt-4 pt-4 border-t border-slate-50 px-2">
                    <button
                        onClick={handleLogout}
                        className="flex items-center w-full text-left px-6 py-3 text-sm font-bold text-red-500 hover:bg-red-50 transition rounded-2xl"
                    >
                        Cerrar sesión
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ICONOS MOBILE */}
        <div className="flex md:hidden items-center gap-4">
          <button onClick={toggleCart} className="relative p-2" aria-label="Abrir carrito">
            <ShoppingCart size={22} className="text-slate-900" />
            {totalItems > 0 && (
              <span className="absolute top-1 right-1 bg-secondary-600 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-lg transform translate-x-1 -translate-y-1">
                {totalItems}
              </span>
            )}
          </button>

          <button onClick={toggleMobile} className="p-2" aria-label="Abrir menú">
            {mobileOpen ? <X size={26} className="text-slate-900" /> : <Menu size={26} className="text-slate-900" />}
          </button>
        </div>
      </div>

      {/* OVERLAY */}
      {mobileOpen && (
        <button
          aria-label="Cerrar menú"
          onClick={closeMobile}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[55] md:hidden animate-in fade-in duration-500"
        />
      )}

      {/* DRAWER MOBILE */}
      <div
        className={`fixed top-0 right-0 w-[20rem] max-w-[85vw] h-dvh bg-white border-l border-slate-100 shadow-2xl transform transition-transform duration-500 ease-out z-[60] md:hidden ${mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex justify-between items-center p-8 border-b border-slate-50">
            <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Navegación</p>
                <span className="text-xl font-gobold text-slate-900 uppercase tracking-tight">Menú Principal</span>
            </div>
          <button onClick={closeMobile} className="p-2 hover:bg-slate-50 rounded-full transition-colors" aria-label="Cerrar menú">
            <X size={26} className="text-slate-400" />
          </button>
        </div>

        <div className="flex flex-col p-8 overflow-y-auto h-[calc(100vh-100px)]">
          {/* Links principales */}
          <div className="flex flex-col gap-2">
            <MobileLink href="/" onClick={closeMobile}>Inicio</MobileLink>
            <MobileLink href="/stories" onClick={closeMobile}>Comunidad</MobileLink>
            <MobileLink href="/discipulado" onClick={closeMobile}>Discipulado</MobileLink>
            <MobileLink href="/events" onClick={closeMobile}>Eventos</MobileLink>
            {/* <MobileLink href="/tienda" onClick={closeMobile}>Tienda</MobileLink> */}
            <MobileLink href="/join" onClick={closeMobile}>Únete</MobileLink>
          </div>

          <div className="my-8 border-t border-slate-50" />

          {/* Sesión */}
          {!user ? (
            <Link
              href="/login"
              onClick={closeMobile}
              className="bg-slate-900 text-white font-gobold py-5 rounded-2xl text-center uppercase tracking-widest text-xs shadow-lg"
            >
              Ingresar
            </Link>
          ) : (
            <>
              <div className="flex flex-col gap-2">
                <MobileLink href="/perfil" onClick={closeMobile}>Mi Perfil</MobileLink>
              </div>

              {/* ADMIN: ACORDEÓN */}
              {user?.role === "ADMIN" && (
                <div className="mt-8 pt-8 border-t border-slate-50">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-secondary-500 font-bold mb-6">
                    Administración
                  </div>

                  <div className="space-y-4">
                    <MobileSection
                        title="Historias"
                        open={adminOpen === "historias"}
                        onToggle={() => setAdminOpen((v) => (v === "historias" ? null : "historias"))}
                    >
                        <MobileAdminLink href="/stories/create" onClick={closeMobile}>
                        Crear historia
                        </MobileAdminLink>
                        <MobileAdminLink href="/stories/manage" onClick={closeMobile}>
                        Gestionar historias
                        </MobileAdminLink>
                    </MobileSection>

                    <MobileSection
                        title="Eventos"
                        open={adminOpen === "eventos"}
                        onToggle={() => setAdminOpen((v) => (v === "eventos" ? null : "eventos"))}
                    >
                        <MobileAdminLink href="/events/create" onClick={closeMobile}>
                        Crear evento
                        </MobileAdminLink>
                        <MobileAdminLink href="/events/manage" onClick={closeMobile}>
                        Gestionar eventos
                        </MobileAdminLink>
                    </MobileSection>

                    <MobileSection
                        title="Tienda"
                        open={adminOpen === "tienda"}
                        onToggle={() => setAdminOpen((v) => (v === "tienda" ? null : "tienda"))}
                    >
                        <MobileAdminLink href="/admin/products/manage" onClick={closeMobile}>
                        Gestionar tienda
                        </MobileAdminLink>
                        <MobileAdminLink href="/admin/sales" onClick={closeMobile}>
                        Ventas realizadas
                        </MobileAdminLink>
                    </MobileSection>

                    <MobileSection
                        title="Hero Slider"
                        open={adminOpen === "hero"}
                        onToggle={() => setAdminOpen((v) => (v === "hero" ? null : "hero"))}
                    >
                        <MobileAdminLink href="/admin/hero-slider" onClick={closeMobile}>
                        Gestionar Hero Slider
                        </MobileAdminLink>
                    </MobileSection>

                    <MobileSection
                        title="Encuestas"
                        open={adminOpen === "surveys"}
                        onToggle={() => setAdminOpen((v) => (v === "surveys" ? null : "surveys"))}
                    >
                        <MobileAdminLink href="/admin/surveys" onClick={closeMobile}>
                        Gestionar Encuestas
                        </MobileAdminLink>
                        <MobileAdminLink href="/admin/surveys/create" onClick={closeMobile}>
                        Crear Nueva Encuesta
                        </MobileAdminLink>
                    </MobileSection>
                  </div>
                </div>
              )}

              <button onClick={handleLogout} className="mt-12 text-red-500 font-bold text-center py-4 bg-red-50 rounded-2xl border border-red-100 uppercase tracking-widest text-[10px]">
                Cerrar sesión
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

/* --------------------- LINKS DESKTOP --------------------- */
function NavLinks() {
  return (
    <div className="flex items-center gap-10">
      <Link href="/" className="text-slate-600 hover:text-secondary-600 transition font-bold uppercase tracking-widest text-[10px]">Inicio</Link>
      <Link href="/stories" className="text-slate-600 hover:text-secondary-600 transition font-bold uppercase tracking-widest text-[10px]">Comunidad</Link>
      <Link href="/discipulado" className="text-slate-600 hover:text-secondary-600 transition font-bold uppercase tracking-widest text-[10px]">Discipulado</Link>
      <Link href="/events" className="text-slate-600 hover:text-secondary-600 transition font-bold uppercase tracking-widest text-[10px]">Eventos</Link>
      {/* <Link href="/tienda" className="text-slate-600 hover:text-secondary-600 transition font-bold uppercase tracking-widest text-[10px]">Tienda</Link> */}
      <Link href="/join" className="text-slate-600 hover:text-secondary-600 transition font-bold uppercase tracking-widest text-[10px]">Únete</Link>
    </div>
  );
}

/* --------------------- LINK MOBILE --------------------- */
function MobileLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block text-slate-600 hover:text-secondary-600 transition font-gobold uppercase tracking-widest text-lg py-1"
    >
      {children}
    </Link>
  );
}

/* --------------------- SECCIÓN COLAPSABLE (MOBILE ADMIN) --------------------- */
function MobileSection({
  title,
  open,
  onToggle,
  children,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-2">
      <button onClick={onToggle} className="w-full flex items-center justify-between py-2 text-left">
        <span className="text-xs uppercase tracking-wider text-slate-400 font-bold">
          {title}
        </span>
        <ChevronDown
          size={16}
          className={`text-slate-400 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="mt-4 space-y-4 pl-4 border-l-2 border-slate-50 flex flex-col">
          {children}
        </div>
      )}
    </div>
  );
}

/* --------------------- LINK ADMIN (MOBILE) --------------------- */
function MobileAdminLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="text-slate-600 hover:text-secondary-600 transition font-bold text-sm"
    >
      {children}
    </Link>
  );
}