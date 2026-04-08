"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Share2 } from "lucide-react";
import { toast } from "react-toastify";

export default function PublicStoriesPage() {

  const [stories, setStories] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const itemsPerPage = 9; // mostrar 9 como galería

  // Cargar historias
  useEffect(() => {
    fetch("/api/stories")
      .then((res) => res.json())
      .then((data) =>
        setStories(data.sort((a: any, b: any) => b.createdAt.localeCompare(a.createdAt)))
      )
      .catch(console.error);
  }, []);

  // Filtrar
  const filtered = stories.filter(
    (s) =>
      (s.author && s.author.toLowerCase().includes(search.toLowerCase())) ||
      (s.content && s.content.toLowerCase().includes(search.toLowerCase())) ||
      (s.title && s.title.toLowerCase().includes(search.toLowerCase()))
  );

  // Paginación
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  // Function to handle sharing
  const handleShare = async (story: any) => {
    const shareData = {
      title: `Historia de ${story.author} en CONSTRUVIDAS`,
      text: `${story.author}: "${story.content}"`,
      url: window.location.origin + "/stories",
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        toast.info("¡Enlace copiado al portapapeles!");
      }
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };

  return (
    <main className="max-w-6xl mx-auto px-4 pt-28 pb-16 space-y-8">
      <h2 className="text-secondary-600 text-sm font-gobold uppercase tracking-[0.3em] mb-2">Comunidad</h2>
      <h1 className="text-4xl md:text-5xl font-gobold text-slate-900 uppercase tracking-tight">Historias de la Comunidad</h1>
      <p className="text-slate-600 max-w-2xl text-lg font-medium">Testimonios y vivencias de nuestra familia espiritual en Sincelejo.</p>

      {/* BUSCADOR */}
      <div className="flex justify-between items-center mt-8">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Buscar testimonios..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full bg-white border border-slate-200 px-6 py-4 rounded-2xl text-slate-900 shadow-sm focus:ring-2 focus:ring-secondary-500/20 focus:border-secondary-500 transition-all outline-none"
          />
        </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-10">
        {paginated.map((story) => (
          <div
            key={story._id}
            className="flex flex-col bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
          >
            {/* Imagen igual al Feed */}
            <div className="relative w-full h-80 bg-slate-100 overflow-hidden">
              <Image
                src={story.image}
                alt={story.title || "Imagen de la historia"}
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-2">
                   <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600">
                      {story.author.charAt(0).toUpperCase()}
                   </div>
                   <p className="font-gobold text-slate-900 uppercase tracking-wide">{story.author}</p>
                </div>
                <p className="text-sm text-slate-600 line-clamp-4 leading-relaxed font-medium">
                  {story.content}
                </p>
                <div className="pt-2">
                  <span className="text-[10px] font-bold text-secondary-600 uppercase tracking-widest bg-secondary-50 px-2 py-1 rounded-md">
                    {story.title || "Testimonio"}
                  </span>
                </div>
              </div>

              {/* Botón Compartir */}
              <button
                onClick={() => handleShare(story)}
                className="flex items-center justify-center gap-2 w-full py-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-2xl text-sm font-gobold uppercase tracking-widest text-slate-700 transition-all"
              >
                <Share2 size={16} /> Compartir
              </button>
            </div>
          </div>
        ))}
      </div>


      {/* PAGINACIÓN */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-3 mt-12 pb-10">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-6 py-3 rounded-2xl font-gobold transition-all shadow-sm ${page === i + 1
                ? "bg-slate-900 text-white shadow-lg"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {/* SOBRE CONSTRUVIDAS */}
      <section className="py-24 border-t border-slate-200 mt-20 text-center">
        <h2 className="text-4xl font-gobold mb-8 text-slate-900 uppercase tracking-tight">
          NUESTRA IDENTIDAD
        </h2>

        <p className="text-slate-600 max-w-3xl mx-auto mb-12 text-xl leading-relaxed font-medium">
          ConstruVidas no es solo una iglesia, es una familia que cree en el poder de Dios 
          para restaurar vidas, fortalecer hogares y transformar nuestra ciudad.
        </p>

        <div className="bg-slate-50 border border-slate-200 rounded-[3rem] p-12 max-w-5xl mx-auto mb-12 shadow-sm">
          <h3 className="text-2xl font-gobold text-slate-900 mb-10 uppercase tracking-tight">Cimentados en:</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            <div className="flex flex-col items-center gap-4 group">
              <div className="p-5 bg-white rounded-3xl shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
                <span className="text-3xl">📖</span>
              </div>
              <span className="text-slate-800 font-gobold uppercase tracking-widest text-xs">La Palabra</span>
            </div>
            <div className="flex flex-col items-center gap-4 group">
              <div className="p-5 bg-white rounded-3xl shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
                <span className="text-3xl">🙏</span>
              </div>
              <span className="text-slate-800 font-gobold uppercase tracking-widest text-xs">La Oración</span>
            </div>
            <div className="flex flex-col items-center gap-4 group">
              <div className="p-5 bg-white rounded-3xl shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
                <span className="text-3xl">🏠</span>
              </div>
              <span className="text-slate-800 font-gobold uppercase tracking-widest text-xs">La Familia</span>
            </div>
            <div className="flex flex-col items-center gap-4 group">
              <div className="p-5 bg-white rounded-3xl shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
                <span className="text-3xl">🤝</span>
              </div>
              <span className="text-slate-800 font-gobold uppercase tracking-widest text-xs">El Servicio</span>
            </div>
          </div>
        </div>

        <p className="text-2xl md:text-3xl font-gobold text-slate-900 uppercase tracking-tight">
          No caminas solo. <span className="text-secondary-600">Caminas en familia.</span>
        </p>
      </section>

    </main>
  );
}