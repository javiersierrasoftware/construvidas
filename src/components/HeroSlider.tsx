"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";

interface HeroSlide {
  _id: string;
  image: string;
  title: string;
  subtitle: string;
  buttonLink: string;
  order: number;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  const { data: slides, error, isLoading } = useSWR<HeroSlide[]>("/api/admin/hero-slider", fetcher, {
    revalidateOnFocus: false,
  });

  // All hooks must be called before any conditional returns.
  useEffect(() => {
    // Guard against running the effect if data is not yet available or valid
    if (!slides || !Array.isArray(slides) || slides.length === 0) {
      return;
    }

    const sortedSlides = [...slides].sort((a, b) => a.order - b.order);

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % sortedSlides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [slides]); // Depend on the slides data itself

  // Conditional rendering can happen after all hooks are called.
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Failed to load slides.</div>;
  if (!Array.isArray(slides) || slides.length === 0) return null;

  // Sort slides for rendering
  const sortedSlides = [...slides].sort((a, b) => a.order - b.order);

  return (
    <div className="relative w-full h-[49vh] md:h-[56vh] overflow-hidden rounded-2xl">
      {/* SLIDES */}
      {sortedSlides.map((slide, index) => (
        <div
          key={slide._id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === current ? "opacity-100" : "opacity-0"
            }`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-white/50"></div>
          <div className="absolute inset-0 flex flex-col justify-center items-start px-10 md:px-20 text-slate-900">
            <h1 className="text-4xl md:text-6xl font-gobold mb-3 drop-shadow-lg uppercase tracking-tight">
              {slide.title}
            </h1>
            <p className="text-lg md:text-2xl mb-6 text-slate-900 font-medium drop-shadow-md">
              {slide.subtitle}
            </p>
            <Link
              href="/join"
              className="px-8 py-4 rounded-xl text-white font-gobold bg-slate-900 hover:bg-secondary-600 shadow-xl transition-all text-lg uppercase tracking-wide border border-white/20"
            >
              ¡Planifica tu visita!
            </Link>
          </div>
        </div>
      ))}
      {/* DOTS INDICADORES */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
        {sortedSlides.map((_, i) => (
          <button
            key={i}
            className={`h-3 w-3 rounded-full transition ${i === current ? "bg-secondary-400" : "bg-white/40"
              }`}
            onClick={() => setCurrent(i)}
          ></button>
        ))}
      </div>
    </div>
  );
}
