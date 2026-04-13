"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Loader2, Calendar, Clock, MapPin, DollarSign, Image as ImageIcon, Briefcase, Info, ArrowLeft } from "lucide-react";
import AdminAuthGuard from "@/components/auth/AdminAuthGuard";
import Link from "next/link";

const MINISTRIES = [
  "Social",
  "Alabanza",
  "Niños",
  "Jóvenes",
  "Hombres",
  "Mujeres",
  "Parejas",
  "Misiones",
  "Otro"
];

function EditEventAdminPageContent() {
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  
  const [form, setForm] = useState({
    name: "",
    ministry: "",
    date: "",
    time: "",
    maxRegistrationDate: "",
    maxRegistrationTime: "",
    location: "",
    description: "",
    price: "0",
    image: ""
  });

  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    async function fetchEventData() {
      try {
        setPageLoading(true);
        const res = await fetch(`/api/events/admin/${id}`);
        const result = await res.json();

        if (!res.ok || !result.ok) {
          throw new Error(result.message || "No se pudo cargar el evento.");
        }

        const event = result.data;
        const formatDate = (d: any) => d ? new Date(d).toISOString().split('T')[0] : "";

        setForm({
          name: event.name || "",
          ministry: event.ministry || "",
          date: formatDate(event.date),
          time: event.time || "",
          maxRegistrationDate: formatDate(event.maxRegistrationDate),
          maxRegistrationTime: event.maxRegistrationTime || "",
          location: event.location || "",
          description: event.description || "",
          price: event.price?.toString() || "0",
          image: event.image || ""
        });
        setPreview(event.image || null);
      } catch (err: any) {
        setErrorMsg(err.message);
      } finally {
        setPageLoading(false);
      }
    }

    fetchEventData();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);
    setErrorMsg(null);
    setLoading(true);

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });

      if (imageFile) {
        formData.append("image", imageFile);
      }

      const res = await fetch(`/api/events/admin/${id}`, {
        method: "PUT",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.message || "Error al actualizar el evento");
      }

      setFeedback("¡Evento actualizado exitosamente!");
      setTimeout(() => {
        router.push("/events/manage");
      }, 1500);
    } catch (err: any) {
      setErrorMsg(err.message || "Error al actualizar el evento");
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
             <div className="flex flex-col items-center gap-4">
                <Loader2 className="animate-spin text-secondary-500" size={40} />
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Cargando evento...</p>
             </div>
        </div>
    );
  }

  return (
    <main className="min-h-screen pt-24 pb-20 px-6 bg-slate-50/50">
      <div className="max-w-4xl mx-auto space-y-8">
        <header>
          <Link href="/events/manage" className="flex items-center gap-2 text-slate-400 hover:text-secondary-600 transition-colors mb-4 text-xs font-bold uppercase tracking-widest">
            <ArrowLeft size={16} /> Volver a gestión
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <span className="bg-secondary-100 text-secondary-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                Edición de Evento
            </span>
          </div>
          <h1 className="text-4xl font-gobold text-slate-900 uppercase tracking-tight">Editar Evento</h1>
        </header>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* COLUMNA IZQUIERDA: IMAGEN */}
            <div className="md:col-span-1 space-y-6">
                <div className="bg-white border border-slate-200 rounded-[2.5rem] p-6 shadow-sm">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-4">Imagen del Evento</label>
                    <div className="relative group aspect-square rounded-[2rem] bg-slate-50 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center overflow-hidden transition-all hover:border-secondary-400">
                        {preview ? (
                            <>
                                <img src={preview} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <button type="button" onClick={() => {setImageFile(null); setPreview(form.image)}} className="bg-white text-slate-500 p-2 rounded-full shadow-lg">
                                        <ImageIcon size={20} />
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="text-center p-6">
                                <ImageIcon size={40} className="mx-auto text-slate-300 mb-2" />
                                <p className="text-[10px] font-bold text-slate-400 uppercase">Haz clic para subir</p>
                            </div>
                        )}
                        <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                    </div>
                </div>

                <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-xl">
                    <h3 className="text-lg font-gobold uppercase mb-4 flex items-center gap-2">
                        <Info size={18} /> Resumen
                    </h3>
                    <div className="text-xs space-y-4 font-medium">
                        <div>
                             <p className="text-slate-400 uppercase tracking-widest text-[9px] mb-1">Última actualización</p>
                             <p className="text-white">Hoy</p>
                        </div>
                        <div>
                             <p className="text-slate-400 uppercase tracking-widest text-[9px] mb-1">Estado</p>
                             <span className="text-secondary-400">Público y Activo</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* COLUMNA DERECHA: DATOS */}
            <div className="md:col-span-2 space-y-8">
                <section className="bg-white border border-slate-200 rounded-[2.5rem] p-10 shadow-sm space-y-6">
                    <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-3">
                            Nombre del Evento
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-secondary-500 transition-all font-semibold text-lg"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-3">
                                <Briefcase size={14} /> Ministerio Organizador
                            </label>
                            <select
                                name="ministry"
                                value={form.ministry}
                                onChange={handleChange}
                                required
                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-secondary-500 appearance-none font-bold"
                            >
                                <option value="">Seleccionar...</option>
                                {MINISTRIES.map(m => <option key={m} value={m}>{m}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-3">
                                <DollarSign size={14} /> Valor de Inscripción
                            </label>
                            <input
                                type="number"
                                name="price"
                                value={form.price}
                                onChange={handleChange}
                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-secondary-500 font-gobold text-xl text-secondary-600"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-3">
                            <MapPin size={14} /> Lugar
                        </label>
                        <input
                            type="text"
                            name="location"
                            value={form.location}
                            onChange={handleChange}
                            required
                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-secondary-500 font-medium"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-3">
                                <Calendar size={14} /> Fecha del Evento
                            </label>
                            <input
                                type="date"
                                name="date"
                                value={form.date}
                                onChange={handleChange}
                                required
                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-secondary-500 font-bold"
                            />
                        </div>
                        <div>
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-3">
                                <Clock size={14} /> Hora Inicio
                            </label>
                            <input
                                type="time"
                                name="time"
                                value={form.time}
                                onChange={handleChange}
                                required
                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-secondary-500 font-bold"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-3">
                                <Calendar size={14} className="text-red-400" /> Fecha Límite Registro
                            </label>
                            <input
                                type="date"
                                name="maxRegistrationDate"
                                value={form.maxRegistrationDate}
                                onChange={handleChange}
                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-secondary-500 font-bold"
                            />
                        </div>
                        <div>
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-3">
                                <Clock size={14} className="text-red-400" /> Hora Límite
                            </label>
                            <input
                                type="time"
                                name="maxRegistrationTime"
                                value={form.maxRegistrationTime}
                                onChange={handleChange}
                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-secondary-500 font-bold"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-3">
                            <Info size={14} /> Descripción
                        </label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            rows={6}
                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-secondary-500 font-medium resize-none shadow-inner"
                        />
                    </div>

                    {feedback && (
                        <div className="bg-green-50 text-green-600 px-6 py-4 rounded-2xl text-xs font-bold border border-green-100">
                          {feedback}
                        </div>
                    )}
                    {errorMsg && (
                        <div className="bg-red-50 text-red-600 px-6 py-4 rounded-2xl text-xs font-bold border border-red-100">
                          {errorMsg}
                        </div>
                    )}

                    <div className="flex justify-end pt-4">
                        <button
                        type="submit"
                        disabled={loading}
                        className="bg-slate-900 text-white font-gobold uppercase tracking-widest px-10 py-5 rounded-[2rem] disabled:opacity-50 shadow-xl hover:bg-secondary-600 transition-all flex items-center gap-3"
                        >
                        {loading && <Loader2 className="animate-spin" size={18} />}
                        {loading ? "Actualizando..." : "Guardar Cambios"}
                        </button>
                    </div>
                </section>
            </div>
        </form>
      </div>
    </main>
  );
}

export default function EditEventAdminPage() {
  return (
    <AdminAuthGuard>
      <EditEventAdminPageContent />
    </AdminAuthGuard>
  );
}
