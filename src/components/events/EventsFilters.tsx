"use client";

import { useState } from "react";

interface EventsFiltersProps {
  onFilterChange: (filters: {
    search: string;
    type: string;
    city: string;
  }) => void;
}

export default function EventsFilters({ onFilterChange }: EventsFiltersProps) {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [city, setCity] = useState("");

  const handleUpdate = () => {
    onFilterChange({ search, type, city });
  };

  return (
    <div className="bg-white border border-slate-200 rounded-[2rem] p-8 mb-10 shadow-lg space-y-6">
      <h3 className="text-xl font-gobold text-slate-900 uppercase tracking-tight">Filtrar eventos</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* BUSCADOR */}
        <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Búsqueda</label>
            <input
            type="text"
            placeholder="¿Qué estás buscando?"
            value={search}
            onChange={(e) => {
                setSearch(e.target.value);
                onFilterChange({ search: e.target.value, type, city });
            }}
            className="w-full bg-slate-50 border border-slate-100 text-slate-900 rounded-xl px-4 py-3 focus:border-secondary-500 focus:ring-4 focus:ring-secondary-500/10 transition-all outline-none text-sm font-medium"
            />
        </div>

        {/* SELECT TIPO */}
        <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Categoría</label>
            <select
            value={type}
            onChange={(e) => {
                setType(e.target.value);
                onFilterChange({ search, type: e.target.value, city });
            }}
            className="w-full bg-slate-50 border border-slate-100 text-slate-900 rounded-xl px-4 py-3 focus:border-secondary-500 transition-all outline-none text-sm font-medium appearance-none"
            >
            <option value="">Todas las categorías</option>
            <option value="Servicio">Servicios</option>
            <option value="Congreso">Congresos</option>
            <option value="Vigilia">Vigilias</option>
            <option value="Ministerio">Ministerios</option>
            </select>
        </div>

        {/* SELECT CIUDAD */}
        <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Lugar</label>
            <select
            value={city}
            onChange={(e) => {
                setCity(e.target.value);
                onFilterChange({ search, type, city: e.target.value });
            }}
            className="w-full bg-slate-50 border border-slate-100 text-slate-900 rounded-xl px-4 py-3 focus:border-secondary-500 transition-all outline-none text-sm font-medium appearance-none"
            >
            <option value="">Cualquier lugar</option>
            <option value="Sede Principal">Sede Principal</option>
            <option value="Sincelejo">Sincelejo</option>
            <option value="Virtual">Virtual</option>
            </select>
        </div>
      </div>
    </div>
  );
}