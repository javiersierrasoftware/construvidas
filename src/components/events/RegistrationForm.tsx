"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Event } from "@/types/Event";

type EventProps = Pick<Event, "price" | "distances" | "categories" | "shirtSizes"> & { _id: string };

interface RegistrationFormProps {
  event: EventProps;
  user: { id: string; email: string; name: string; role: string } | null;
  calculatedPrice: number;
}

export default function RegistrationForm({ event, user, calculatedPrice }: RegistrationFormProps) {
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    cedula: "",
    gender: "Hombre", // Default gender
    phoneNumber: "",
    dateOfBirth: "", // YYYY-MM-DD format
    distance: event.distances?.[0] || "",
    category: event.categories?.[0] || "",
    tshirtSize: event.shirtSizes?.[0] || "M", // Default to first available shirt size
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/events/register/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId: event._id,
          ...formData,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to create payment link.");
      }

      if (result.redirectUrl) {
        window.location.href = result.redirectUrl;
      } else {
        throw new Error("No redirect URL received from server.");
      }
    } catch (err: any) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
            <label htmlFor="name" className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
            Nombre Completo
            </label>
            <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 focus:border-secondary-500 focus:ring-4 focus:ring-secondary-500/10 transition-all outline-none font-medium"
            placeholder="Tu nombre"
            />
        </div>
        <div className="space-y-2">
            <label htmlFor="email" className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
            Correo Electrónico
            </label>
            <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 focus:border-secondary-500 focus:ring-4 focus:ring-secondary-500/10 transition-all outline-none font-medium"
            placeholder="tu@email.com"
            />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
            <label htmlFor="cedula" className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
            Cédula
            </label>
            <input
            type="text"
            id="cedula"
            name="cedula"
            value={formData.cedula}
            onChange={handleChange}
            required
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 focus:border-secondary-500 focus:ring-4 focus:ring-secondary-500/10 transition-all outline-none font-medium"
            placeholder="Documento de identidad"
            />
        </div>
        <div className="space-y-2">
            <label htmlFor="phoneNumber" className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
            Teléfono móvil
            </label>
            <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 focus:border-secondary-500 focus:ring-4 focus:ring-secondary-500/10 transition-all outline-none font-medium"
            placeholder="Ej: 3001234567"
            />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
            <label htmlFor="dateOfBirth" className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
            Fecha de Nacimiento
            </label>
            <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 focus:border-secondary-500 focus:ring-4 focus:ring-secondary-500/10 transition-all outline-none font-medium"
            />
        </div>
        <div className="space-y-2">
            <label htmlFor="gender" className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
            Género
            </label>
            <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 focus:border-secondary-500 focus:ring-4 focus:ring-secondary-500/10 transition-all outline-none font-medium appearance-none"
            >
            <option value="Hombre">Hombre</option>
            <option value="Mujer">Mujer</option>
            </select>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
          {event.distances && event.distances.length > 0 && (
            <div className="space-y-2">
              <label htmlFor="distance" className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
                Distancia
              </label>
              <select
                id="distance"
                name="distance"
                value={formData.distance}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 focus:border-secondary-500 focus:ring-4 focus:ring-secondary-500/10 transition-all outline-none font-medium appearance-none"
              >
                {event.distances.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </div>
          )}
          {event.categories && event.categories.length > 0 && (
            <div className="space-y-2">
              <label htmlFor="category" className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
                Categoría
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 focus:border-secondary-500 focus:ring-4 focus:ring-secondary-500/10 transition-all outline-none font-medium appearance-none"
              >
                {event.categories.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
          )}
          {event.shirtSizes && event.shirtSizes.length > 0 && (
            <div className="space-y-2">
              <label htmlFor="tshirtSize" className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
                Talla de Camiseta
              </label>
              <select
                id="tshirtSize"
                name="tshirtSize"
                value={formData.tshirtSize}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 focus:border-secondary-500 focus:ring-4 focus:ring-secondary-500/10 transition-all outline-none font-medium appearance-none"
              >
                {event.shirtSizes.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
          )}
      </div>

      <div className="pt-6">
        <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-slate-900 text-white font-gobold py-5 rounded-2xl hover:bg-secondary-600 hover:shadow-xl transition-all uppercase tracking-widest text-xs shadow-lg disabled:opacity-50"
        >
            {isLoading ? "Procesando..." : `Inscribirme y pagar ${calculatedPrice.toLocaleString()} COP`}
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-center text-sm font-medium border border-red-100 animate-pulse">
            {error}
        </div>
      )}
    </form>
  );
}
