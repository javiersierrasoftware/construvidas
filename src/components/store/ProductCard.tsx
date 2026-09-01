"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";

interface ProductCardProps {
  _id: string; // Changed id to _id to match mongoose model
  name: string;
  price: number;
  image?: string; // Expect a single optional image string
}

export default function ProductCard({ _id, name, price, image }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      productId: _id, // Use _id from props as productId
      name,
      price,
      image: image || "/placeholder-image.jpg", // Use single image with fallback
    });
  };

  return (
    <Link
      href={`/tienda/${_id}`}
      className="group bg-white border border-slate-200 rounded-[2rem] overflow-hidden hover:shadow-2xl hover:border-secondary-500/30 transition-all duration-500 block"
    >
      <div className="relative w-full h-64 overflow-hidden">
        <Image
          src={image || "/placeholder-image.jpg"}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl text-slate-900 font-gobold text-xs shadow-sm">
            ${price.toLocaleString()}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-gobold text-slate-900 uppercase tracking-tight mb-4 group-hover:text-secondary-600 transition-colors line-clamp-1">{name}</h3>
        
        <button
          onClick={handleAdd}
          className="w-full bg-slate-900 text-white font-gobold rounded-xl py-4 uppercase tracking-widest text-[10px] hover:bg-secondary-600 transition-all shadow-sm"
        >
          Agregar al carrito
        </button>
      </div>
    </Link>
  );
}