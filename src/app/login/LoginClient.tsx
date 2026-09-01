"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";

export default function LoginClient() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/perfil";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const email = String(formData.get("email") || "");
      const password = String(formData.get("password") || "");

      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl,
      });

      if (res?.error) {
        throw new Error("Credenciales inválidas. Verifica tu correo y contraseña.");
      }

      if (res?.ok) {
        window.dispatchEvent(new Event("storage"));

        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Error inesperado al iniciar sesión.");
      toast.error(err.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 pt-32 pb-20 px-6 flex items-center justify-center">
      <div className="w-full max-w-lg bg-white border border-slate-200 rounded-[2.5rem] p-12 shadow-2xl space-y-8">
        {/* TÍTULO */}
        <div className="text-center space-y-3">
          <h2 className="text-secondary-600 text-[10px] font-gobold uppercase tracking-[0.4em]">Bienvenido</h2>
          <h1 className="text-4xl font-gobold text-slate-900 uppercase tracking-tight">Inicia Sesión</h1>
          <p className="text-slate-500 text-sm font-medium leading-relaxed">
            Accede a tu cuenta y conéctate con la familia espiritual <span className="text-slate-900 font-bold">CONSTRUVIDAS</span>.
          </p>
        </div>

        {/* ERROR */}
        {errorMsg && (
          <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-2xl px-5 py-3 font-medium">
            {errorMsg}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div className="flex flex-col space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Correo Electrónico</label>
            <input
              required
              name="email"
              type="email"
              placeholder="correo@ejemplo.com"
              className="bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 focus:border-secondary-500 focus:ring-4 focus:ring-secondary-500/10 transition-all outline-none font-medium"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between items-center ml-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Contraseña</label>
              <Link href="/recuperar" className="text-[10px] font-bold text-secondary-600 uppercase tracking-widest hover:text-secondary-700 transition">¿Olvidaste tu contraseña?</Link>
            </div>
            <input
              required
              name="password"
              type="password"
              placeholder="••••••••"
              className="bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 focus:border-secondary-500 focus:ring-4 focus:ring-secondary-500/10 transition-all outline-none font-medium"
            />
          </div>

          {/* BOTÓN */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 text-white font-gobold py-5 rounded-2xl hover:bg-secondary-600 hover:shadow-xl hover:shadow-secondary-500/20 transition-all uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed mt-4"
          >
            {loading ? "Verificando..." : "Ingresar"}
          </button>
        </form>

        {/* ENLACE A REGISTRO */}
        <div className="pt-4 text-center">
            <p className="text-sm text-slate-500 font-medium">
            ¿No tienes cuenta aún?{" "}
            <Link href="/register" className="text-secondary-600 font-bold hover:text-secondary-700 transition underline underline-offset-4">
                Crear una cuenta
            </Link>
            </p>
        </div>
      </div>
    </main>
  );
}
