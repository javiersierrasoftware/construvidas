"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth"; // Assuming you have an auth hook
import { useCartStore } from "@/store/cartStore";
import { COLOMBIA_DATA } from "@/data/colombia";

interface CheckoutFormProps {
  onClose: () => void;
  totalAmount: number;
}

export default function CheckoutForm({ onClose, totalAmount }: CheckoutFormProps) {
  const { items } = useCartStore(); // Get cart items
  const { user } = useAuth(); // Assuming useAuth provides user

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    cedula: "",
    address: "",
    phoneNumber: "",
  });

  const [shippingMethod, setShippingMethod] = useState<"pickup" | "shipping">("pickup");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [availableCities, setAvailableCities] = useState<string[]>([]);
  const [addressLine, setAddressLine] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Prefill cedula, address, phoneNumber if user is logged in and has profile data
  // This would require fetching user profile from DB or having it in the user object
  // For now, we'll assume it's not directly in 'user' from useAuth unless specified.
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || prev.name,
        email: user.email || prev.email,
        // Potentially fetch more user details here if needed and available from an API
      }));
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Department Change
  const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const deptName = e.target.value;
    setSelectedDepartment(deptName);

    // Find cities for selected department
    const deptData = COLOMBIA_DATA.find(d => d.departamento === deptName);
    setAvailableCities(deptData ? deptData.ciudades : []);

    // Reset city if department changes
    setSelectedCity("");
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(e.target.value);
  };

  const handleShippingMethodChange = (method: "pickup" | "shipping") => {
    setShippingMethod(method);
    // You might want to clear address fields or keep them depending on UX preference
    if (method === "pickup") {
      setAddressLine("");
      setSelectedDepartment("");
      setSelectedCity("");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Validate shipping info manually since we construct the final address
    if (shippingMethod === "shipping") {
      if (!selectedDepartment || !selectedCity || !addressLine) {
        setError("Por favor completa todos los campos de dirección de envío.");
        setIsLoading(false);
        return;
      }
    }

    // Construct final address string
    let finalAddress = "Acordar entrega por WhatsApp";
    if (shippingMethod === "shipping") {
      finalAddress = `${addressLine} - ${selectedCity}, ${selectedDepartment} (Valor de envío no incluido)`;
    }

    try {
      if (items.length === 0) {
        throw new Error("El carrito está vacío.");
      }

      const orderDetails = {
        ...formData,
        address: finalAddress, // Use our constructed address
        cartItems: items.map(item => ({
          productId: item.productId,
          name: item.name,
          price: item.price,
          qty: item.qty,
          image: item.image,
        })),
        totalAmount,
      };

      const res = await fetch("/api/store/checkout/create-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(orderDetails),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Error al procesar el pago.");
      }

      if (data.redirectUrl) {
        router.push(data.redirectUrl); // Redirect to Wompi checkout
      } else {
        throw new Error("No se recibió URL de redirección para el pago.");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white border border-slate-100 rounded-[2.5rem] p-10 max-w-lg w-full shadow-2xl animate-in fade-in zoom-in duration-300 max-h-[90vh] overflow-y-auto">
        <h2 className="text-3xl font-gobold text-slate-900 uppercase tracking-tight mb-8">Datos del Comprador</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
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
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 focus:border-secondary-500 focus:ring-4 focus:ring-secondary-500/10 transition-all outline-none font-medium"
                />
              </div>
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
                />
              </div>
          </div>

          {/* MÉTODO DE ENTREGA */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
              Método de Entrega
            </label>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => handleShippingMethodChange("pickup")}
                className={`flex-1 py-4 px-6 rounded-2xl border font-gobold text-[10px] uppercase tracking-widest transition-all ${shippingMethod === "pickup"
                  ? "bg-slate-900 border-slate-900 text-white shadow-lg"
                  : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
                  }`}
              >
                Acordar por WhatsApp
              </button>
              <button
                type="button"
                onClick={() => handleShippingMethodChange("shipping")}
                className={`flex-1 py-4 px-6 rounded-2xl border font-gobold text-[10px] uppercase tracking-widest transition-all ${shippingMethod === "shipping"
                  ? "bg-slate-900 border-slate-900 text-white shadow-lg"
                  : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
                  }`}
              >
                Envío a dirección
              </button>
            </div>
          </div>

          {/* CAMPOS DE DIRECCIÓN SI ES ENVÍO */}
          {shippingMethod === "shipping" && (
            <div className="space-y-6 pt-6 border-t border-slate-100 mt-6 animate-in slide-in-from-top-4 duration-300">
              <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="department" className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
                      Departamento
                    </label>
                    <select
                      id="department"
                      value={selectedDepartment}
                      onChange={handleDepartmentChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 focus:border-secondary-500 focus:ring-4 focus:ring-secondary-500/10 transition-all outline-none font-medium appearance-none"
                    >
                      <option value="">Selecciona</option>
                      {COLOMBIA_DATA.map((dept) => (
                        <option key={dept.departamento} value={dept.departamento}>
                          {dept.departamento}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="city" className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
                      Ciudad
                    </label>
                    <select
                      id="city"
                      value={selectedCity}
                      onChange={handleCityChange}
                      disabled={!selectedDepartment}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 focus:border-secondary-500 focus:ring-4 focus:ring-secondary-500/10 transition-all outline-none font-medium appearance-none disabled:opacity-50"
                    >
                      <option value="">Selecciona</option>
                      {availableCities.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="addressLine" className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
                  Dirección exacta
                </label>
                <input
                  type="text"
                  id="addressLine"
                  name="addressLine"
                  value={addressLine}
                  onChange={(e) => setAddressLine(e.target.value)}
                  placeholder="Ej: Carrera 12 # 34-56, Apt 201"
                  required={shippingMethod === "shipping"}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 focus:border-secondary-500 focus:ring-4 focus:ring-secondary-500/10 transition-all outline-none font-medium"
                />
              </div>
            </div>
          )}

          {shippingMethod === "pickup" && (
            <div className="bg-secondary-50 border border-secondary-100 p-4 rounded-2xl">
                 <p className="text-sm text-secondary-600 font-medium text-center italic">
                Coordinaremos la entrega contigo vía WhatsApp para que retires en nuestra sede.
                </p>
            </div>
          )}

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
            />
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-slate-100 gap-6">
            <div className="text-center md:text-left">
                <span className="text-slate-400 text-xs font-bold uppercase tracking-widest block mb-1">Total a pagar</span>
                <span className="text-3xl font-gobold text-slate-900">${totalAmount.toLocaleString()}</span>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-8 py-4 bg-slate-50 text-slate-700 font-gobold rounded-2xl hover:bg-slate-100 transition-all uppercase tracking-widest text-[10px] shadow-sm border border-slate-100"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-[2] px-8 py-4 bg-slate-900 text-white font-gobold rounded-2xl hover:bg-secondary-600 hover:shadow-xl transition-all uppercase tracking-widest text-[10px] shadow-lg"
              >
                {isLoading ? "Procesando..." : "Finalizar Compra"}
              </button>
            </div>
          </div>

          {error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-center text-sm font-medium border border-red-100 animate-pulse">
                {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
