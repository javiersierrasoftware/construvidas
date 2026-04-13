"use client";

import { useCartStore } from "@/store/cartStore";
import { X } from "lucide-react";
import Image from "next/image";
import { useState } from "react"; // Added useState
import CheckoutForm from "@/components/store/CheckoutForm"; // Added CheckoutForm

export default function CartSidebar() {
  const { isOpen, items, toggleCart, removeItem } = useCartStore();
  const [showCheckoutForm, setShowCheckoutForm] = useState(false); // Added state

  const total = items.reduce((acc, p) => acc + p.price * p.qty, 0);

  if (showCheckoutForm) {
    return <CheckoutForm onClose={() => setShowCheckoutForm(false)} totalAmount={total} />;
  }

  return (
    <div
      className={`fixed top-0 right-0 h-full w-[24rem] bg-white border-l border-slate-100 p-8 shadow-2xl transition-transform duration-500 z-50 overflow-y-auto ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <div>
            <h2 className="text-secondary-600 text-[10px] font-gobold uppercase tracking-[0.4em]">Mi Pedido</h2>
            <h3 className="text-2xl font-gobold text-slate-900 uppercase tracking-tight">Tu Carrito</h3>
        </div>
        <button onClick={toggleCart} className="p-2 hover:bg-slate-50 rounded-full transition-colors">
          <X size={24} className="text-slate-400" />
        </button>
      </div>

      {/* ITEMS */}
      <div className="space-y-6 pb-40">
        {items.length === 0 && (
          <div className="text-center py-20 space-y-4">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto">
                <X size={32} className="text-slate-200" />
            </div>
            <p className="text-slate-400 font-medium italic">Tu carrito está vacío.</p>
          </div>
        )}

        {items.map((item) => (
          <div
            key={item.productId}
            className="flex items-center gap-4 bg-slate-50 border border-slate-100 p-4 rounded-2xl group transition-all"
          >
            <div className="relative h-20 w-20 rounded-xl overflow-hidden shadow-sm border border-slate-200 bg-white">
              <Image src={item.image || "/placeholder-image.jpg"} alt={item.name} fill className="object-cover" />
            </div>

            <div className="flex-1 min-w-0">
              <p className="font-gobold text-slate-900 uppercase tracking-wide text-sm truncate">{item.name}</p>
              <p className="text-xs font-bold text-secondary-600 mt-1">
                {item.qty} × ${item.price.toLocaleString()}
              </p>
            </div>

            <button onClick={() => removeItem(item.productId)} className="p-2 opacity-0 group-hover:opacity-100 hover:bg-red-50 rounded-lg transition-all">
              <X size={18} className="text-red-400" />
            </button>
          </div>
        ))}
      </div>

      {/* TOTAL */}
      <div className="absolute bottom-0 left-0 w-full px-8 py-8 bg-white border-t border-slate-100 shadow-[0_-10px_40px_rgba(0,0,0,0.02)]">
        <div className="flex justify-between items-end mb-6">
            <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] block">Total</span>
                <span className="text-3xl font-gobold text-slate-900">${total.toLocaleString()}</span>
            </div>
        </div>

        <button 
          onClick={() => setShowCheckoutForm(true)}
          className="w-full bg-slate-900 text-white font-gobold py-5 rounded-2xl hover:bg-secondary-600 hover:shadow-xl transition-all uppercase tracking-widest text-xs"
        >
          Finalizar Pedido
        </button>
      </div>
    </div>
  );
}