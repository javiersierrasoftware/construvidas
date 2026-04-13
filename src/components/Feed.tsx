"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Feed() {
  const [stories, setStories] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));

    fetch("/api/stories?featured=1")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setStories(data);
        } else {
          console.error("API Error or invalid data:", data);
          setStories([]);
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setStories([]);
      });
  }, []);

  return (
    <section id="comunidad">
      <div className="max-w-6xl mx-auto px-4">

        {/* HEADER */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-4">
            <img src="/construvidastransparente.png" alt="Logo" className="h-10 w-10 object-contain" />

            <div>
              <h2 className="text-3xl font-gobold text-slate-900 uppercase tracking-tight">COMUNIDAD</h2>
              <p className="text-slate-500 text-sm font-semibold uppercase tracking-widest">Últimas publicaciones</p>
            </div>
          </div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stories.map((post: any) => {
            const authorName = post.author || post.user || "Usuario CONSTRUVIDAS";
            const userInitial = authorName.charAt(0).toUpperCase();

            return (
              <article
                key={post._id}
                className="relative bg-white border border-accent-300 rounded-3xl overflow-hidden shadow-lg group hover:shadow-xl transition-all"
              >
                {/* IMAGEN NORMALIZADA */}
                <div className="relative w-full h-80 bg-accent-100 rounded-t-3xl overflow-hidden">
                  <Image
                    src={post.image}
                    alt="post"
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                {/* USER INFO */}
                <div className="flex justify-between items-center px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-primary-100 
                                     flex items-center justify-center 
                                     text-slate-900 font-bold border border-primary-200 shadow-sm">
                      {userInitial}
                    </div>

                    <div className="flex flex-col leading-tight">
                      <p className="font-bold text-primary-950 text-base">
                        {authorName}
                      </p>
                      <span className="text-xs text-slate-500 font-medium">
                        @{post.userTag || authorName.toLowerCase().replace(/\s+/g, '')}
                      </span>
                    </div>
                  </div>

                  <span className="px-3 py-1 text-xs rounded-full 
                                   bg-accent-100 border border-accent-200 
                                   text-slate-800 font-semibold">
                    {post.category || "General"}
                  </span>
                </div>

                {/* DESCRIPTION */}
                <div className="px-6 pb-6">
                  <p className="text-sm text-slate-800 leading-relaxed font-medium">
                    {post.content || post.description}
                  </p>
                </div>
              </article>
            );
          })}

        </div>
      </div>
    </section>
  );
}