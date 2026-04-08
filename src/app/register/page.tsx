"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const name = String(formData.get("name") || "");
      const email = String(formData.get("email") || "");
      const password = String(formData.get("password") || "");
      const discipline = String(formData.get("discipline") || "");
      const goal = String(formData.get("goal") || "");

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, discipline, goal }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "No se pudo completar el registro.");
      }

      // Registro OK → redirigir a login
      router.push("/login");
    } catch (err: any) {
      setErrorMsg(err.message || "Error inesperado en el registro.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 pt-32 pb-20 px-6 flex items-center justify-center">
      <div className="w-full max-w-lg bg-white border border-slate-200 rounded-[2.5rem] p-12 shadow-2xl space-y-8">
        {/* TÍTULO */}
        <div className="text-center space-y-3">
          <h2 className="text-secondary-600 text-[10px] font-gobold uppercase tracking-[0.4em]">Registro</h2>
          <h1 className="text-4xl font-gobold text-slate-900 uppercase tracking-tight">Crear cuenta</h1>
          <p className="text-slate-500 text-sm font-medium leading-relaxed">
            Únete a la familia <span className="text-slate-900 font-bold">CONSTRUVIDAS</span> y sé parte de nuestra comunidad espiritual.
          </p>
        </div>

        {/* MENSAJE DE ERROR */}
        {errorMsg && (
          <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-2xl px-5 py-3 font-medium">
            {errorMsg}
          </div>
        )}

        {/* FORMULARIO */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nombre */}
          <div className="flex flex-col space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Nombre completo</label>
            <input
              required
              name="name"
              type="text"
              placeholder="Ej: Ernesto Pérez"
              className="bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 focus:border-secondary-500 focus:ring-4 focus:ring-secondary-500/10 transition-all outline-none font-medium"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Correo electrónico</label>
            <input
              required
              name="email"
              type="email"
              placeholder="correo@ejemplo.com"
              className="bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 focus:border-secondary-500 focus:ring-4 focus:ring-secondary-500/10 transition-all outline-none font-medium"
            />
          </div>

          {/* Contraseña */}
          <div className="flex flex-col space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Contraseña</label>
            <input
              required
              name="password"
              type="password"
              placeholder="Mínimo 6 caracteres"
              className="bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 focus:border-secondary-500 focus:ring-4 focus:ring-secondary-500/10 transition-all outline-none font-medium"
            />
          </div>

          {/* Ministerio de Interés */}
          <div className="flex flex-col space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Ministerio de Interés</label>
            <select
              required
              name="discipline"
              className="bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 focus:border-secondary-500 focus:ring-4 focus:ring-secondary-500/10 transition-all outline-none font-medium appearance-none"
            >
              <option value="">Selecciona una opción</option>
              <option value="casas_de_vida">Casas de Vida</option>
              <option value="alabanza">Ministerio de Alabanza</option>
              <option value="proyeccion">Proyección Social</option>
              <option value="legado">Legado (Jóvenes)</option>
              <option value="construkids">ConstruKids</option>
            </select>
          </div>

          {/* Objetivo Espiritual */}
          <div className="flex flex-col space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Tu propósito</label>
            <input
              required
              name="goal"
              type="text"
              placeholder="Ej: Crecer espiritualmente, servir a otros..."
              className="bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 focus:border-secondary-500 focus:ring-4 focus:ring-secondary-500/10 transition-all outline-none font-medium"
            />
          </div>

          {/* BOTÓN */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 text-white font-gobold py-5 rounded-2xl hover:bg-secondary-600 hover:shadow-xl hover:shadow-secondary-500/20 transition-all uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed mt-4"
          >
            {loading ? "Creando perfil..." : "Crear cuenta"}
          </button>
        </form>

        {/* Enlace a login */}
        <div className="pt-4 text-center">
            <p className="text-sm text-slate-500 font-medium">
            ¿Ya tienes una cuenta?{" "}
            <a href="/login" className="text-secondary-600 font-bold hover:text-secondary-700 transition underline underline-offset-4">
                Inicia sesión
            </a>
            </p>
        </div>
      </div>
    </main>
  );
}