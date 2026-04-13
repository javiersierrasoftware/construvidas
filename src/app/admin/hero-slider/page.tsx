"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import { Loader2, Pencil, Trash2 } from 'lucide-react';
import AdminAuthGuard from "@/components/auth/AdminAuthGuard";

interface HeroSlide {
  _id: string;
  image: string;
  title: string;
  subtitle: string;
  buttonLink: string;
  order: number;
}

function ManageHeroSliderPageContent() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState<HeroSlide | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    buttonLink: "",
    order: "",
    image: null as File | null,
  });
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const fetchSlides = async () => {
    setError(null);
    try {
      const res = await fetch("/api/admin/hero-slider", { credentials: "include" });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Error al cargar los slides.");
      }
      if (Array.isArray(data)) {
        setSlides(data);
      } else {
        throw new Error(data.message || "La respuesta del servidor no es válida.");
      }
    } catch (err: any) {
      setError(err.message || "Ocurrió un error inesperado.");
      setSlides([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData({ ...formData, image: file });
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, image: null });
      setPreviewImage(null);
    }
  };

  const resetForm = () => {
    setFormData({ title: "", subtitle: "", buttonLink: "", order: "", image: null });
    setPreviewImage(null);
    setCurrentSlide(null);
    setIsModalOpen(false);
    setIsSubmitting(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const data = new FormData();
    data.append("title", formData.title);
    data.append("subtitle", formData.subtitle);
    data.append("buttonLink", formData.buttonLink);
    data.append("order", formData.order);
    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      const url = currentSlide ? `/api/admin/hero-slider/${currentSlide._id}` : "/api/admin/hero-slider";
      const method = currentSlide ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        body: data,
        credentials: "include",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to save hero slide");
      }

      toast.success("Hero slide guardado con éxito!");
      resetForm();
      await fetchSlides();
    } catch (error: any) {
      toast.error(error.message || "Error saving hero slide.");
      setIsSubmitting(false);
    }
  };

  const handleEdit = (slide: HeroSlide) => {
    setCurrentSlide(slide);
    setFormData({
      title: slide.title,
      subtitle: slide.subtitle,
      buttonLink: slide.buttonLink,
      order: slide.order.toString(),
      image: null,
    });
    setPreviewImage(slide.image);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this hero slide?")) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/hero-slider/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to delete hero slide");
      }

      toast.success("Hero slide eliminado con éxito!");
      await fetchSlides();
    } catch (error: any) {
      toast.error(error.message || "Error deleting hero slide.");
    }
  };

  if (isLoading) {
    return (
      <main className="flex flex-col items-center justify-center min-h-[70vh] p-8">
        <Loader2 className="h-16 w-16 text-secondary-500 animate-spin" />
        <p className="mt-4 text-xl text-slate-700">Cargando...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex flex-col items-center justify-center min-h-[70vh] p-8">
        <p className="text-red-500 text-xl">{error}</p>
        <p className="text-slate-700 mt-2">Asegúrate de haber iniciado sesión como Administrador.</p>
      </main>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
            <h2 className="text-secondary-600 text-[10px] font-gobold uppercase tracking-[0.4em]">Administración</h2>
            <h1 className="text-4xl font-gobold text-slate-900 uppercase tracking-tight">Administrar Hero Slider</h1>
        </div>
        <button
          onClick={() => {
            setIsModalOpen(true);
            setCurrentSlide(null);
            setFormData({ title: "", subtitle: "", buttonLink: "", order: "", image: null });
            setPreviewImage(null);
          }}
          className="bg-slate-900 text-white font-gobold py-4 px-8 rounded-2xl shadow-lg hover:bg-secondary-600 transition-all uppercase tracking-widest text-xs"
        >
          Agregar Nuevo Slide
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm overflow-y-auto h-full w-full flex justify-center items-center z-50 p-4">
          <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl max-w-lg w-full border border-slate-200 animate-in fade-in zoom-in duration-300">
            <h2 className="text-2xl font-gobold mb-8 text-slate-900 uppercase tracking-tight">
              {currentSlide ? "Editar Slide" : "Crear Nuevo Slide"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="title" className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Título</label>
                <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 focus:border-secondary-500 focus:ring-4 focus:ring-secondary-500/10 transition-all outline-none font-medium" required />
              </div>
              <div className="space-y-2">
                <label htmlFor="subtitle" className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Subtítulo</label>
                <textarea name="subtitle" id="subtitle" value={formData.subtitle} onChange={handleChange} rows={3} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 focus:border-secondary-500 focus:ring-4 focus:ring-secondary-500/10 transition-all outline-none font-medium" required ></textarea>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label htmlFor="buttonLink" className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Link del Botón</label>
                    <input type="url" name="buttonLink" id="buttonLink" value={formData.buttonLink} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 focus:border-secondary-500 focus:ring-4 focus:ring-secondary-500/10 transition-all outline-none font-medium" required />
                </div>
                <div className="space-y-2">
                    <label htmlFor="order" className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Orden</label>
                    <input type="number" name="order" id="order" value={formData.order} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 focus:border-secondary-500 focus:ring-4 focus:ring-secondary-500/10 transition-all outline-none font-medium" required />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="image" className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Imagen</label>
                <div className="flex flex-col gap-4">
                    <input type="file" name="image" id="image" accept="image/*" onChange={handleFileChange} className="w-full text-sm text-slate-500 file:mr-4 file:py-3 file:px-6 file:rounded-2xl file:border-0 file:text-xs file:font-gobold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 transition-all cursor-pointer"/>
                    {previewImage && <div className="w-full h-40 relative border border-slate-200 rounded-2xl overflow-hidden shadow-sm"><Image src={previewImage} alt="Image Preview" layout="fill" objectFit="cover" /></div>}
                </div>
              </div>
              <div className="flex justify-end space-x-3 pt-6">
                <button type="button" onClick={resetForm} disabled={isSubmitting} className="px-8 py-4 bg-slate-50 text-slate-700 font-gobold rounded-2xl hover:bg-slate-100 transition-all uppercase tracking-widest text-[10px] shadow-sm">Cancelar</button>
                <button type="submit" disabled={isSubmitting} className="px-8 py-4 bg-slate-900 text-white font-gobold rounded-2xl hover:bg-secondary-600 hover:shadow-xl transition-all uppercase tracking-widest text-[10px] flex items-center justify-center">
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isSubmitting ? 'Guardando...' : (currentSlide ? "Actualizar" : "Crear")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-100">
                <thead className="bg-slate-50/50">
                    <tr>
                    <th className="py-4 px-6 text-left text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Imagen</th>
                    <th className="py-4 px-6 text-left text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Título</th>
                    <th className="py-4 px-6 text-left text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Subtítulo</th>
                    <th className="py-4 px-6 text-left text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Orden</th>
                    <th className="py-4 px-6 text-left text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Acciones</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                    {slides.map((slide) => (
                    <tr key={slide._id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-6 border-b border-slate-50">
                            <div className="w-24 h-14 relative rounded-xl overflow-hidden shadow-sm border border-slate-200">
                                <Image src={slide.image} alt={slide.title} layout="fill" objectFit="cover"/>
                            </div>
                        </td>
                        <td className="px-6 py-6 font-semibold text-slate-900 border-b border-slate-50">{slide.title}</td>
                        <td className="px-6 py-6 text-sm text-slate-500 border-b border-slate-50 max-w-xs truncate">{slide.subtitle}</td>
                        <td className="px-6 py-6 font-bold text-slate-900 border-b border-slate-50">{slide.order}</td>
                        <td className="px-6 py-6 border-b border-slate-50">
                            <div className="flex gap-2">
                                <button onClick={() => handleEdit(slide)} className="p-3 bg-slate-50 text-slate-700 rounded-xl hover:bg-slate-100 transition-all shadow-sm border border-slate-100"><Pencil size={18} /></button>
                                <button onClick={() => handleDelete(slide._id)} className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-all shadow-sm border border-red-50"><Trash2 size={18} /></button>
                            </div>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
}

export default function ManageHeroSlider() {
  return (
    <AdminAuthGuard>
      <ManageHeroSliderPageContent />
    </AdminAuthGuard>
  )
}