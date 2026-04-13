"use client";

import { useState, useEffect, useMemo } from "react";
import { DollarSign, ShoppingCart, BarChart2, Package, Search, FileText, Loader2 } from 'lucide-react';
import Image from 'next/image';
import AdminAuthGuard from "@/components/auth/AdminAuthGuard";

type OrderItem = {
  productId: string;
  name: string;
  price: number;
  qty: number;
  image?: string;
};

type Order = {
  _id: string;
  guestInfo: {
    name: string;
    email: string;
    cedula: string;
    address: string;
    phoneNumber: string;
  };
  items: OrderItem[];
  totalAmount: number;
  status: "PENDING_PAYMENT" | "PAID" | "FAILED" | "COMPLETED";
  createdAt: string;
  wompiTransactionId?: string;
};

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 5 }, (_, i) => currentYear - i);
const months = [
  { value: 1, name: "Enero" }, { value: 2, name: "Febrero" },
  { value: 3, name: "Marzo" }, { value: 4, name: "Abril" },
  { value: 5, name: "Mayo" }, { value: 6, name: "Junio" },
  { value: 7, name: "Julio" }, { value: 8, name: "Agosto" },
  { value: 9, name: "Septiembre" }, { value: 10, name: "Octubre" },
  { value: 11, name: "Noviembre" }, { value: 12, name: "Diciembre" },
];

function SalesPageContent() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [processingId, setProcessingId] = useState<string | null>(null);

  const fetchOrders = async () => {
    // Setting isLoading is only needed on mount, not on re-fetch
    // setIsLoading(true); 
    setError(null);
    try {
      const url = new URL("/api/admin/orders", window.location.origin);
      url.searchParams.append("year", selectedYear.toString());
      url.searchParams.append("month", selectedMonth.toString());
      
      const res = await fetch(url.toString(), { credentials: "include" });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Error al cargar las ventas.");
      }
      setOrders(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchOrders();
  }, [selectedYear, selectedMonth]);

  const handleForceProcess = async (orderId: string) => {
    setProcessingId(orderId);
    setError(null);
    try {
      const res = await fetch(`/api/admin/orders/${orderId}/force-process`, {
        method: 'POST',
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Error al procesar la orden.');
      }
      await fetchOrders(); // Re-fetch orders to see the change
    } catch (err: any) {
      setError(err.message);
    } finally {
      setProcessingId(null);
    }
  };

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const guest = order.guestInfo;
      const searchLower = searchTerm.toLowerCase();

      const matchesSearch = searchTerm === "" ||
        guest.name.toLowerCase().includes(searchLower) ||
        guest.email.toLowerCase().includes(searchLower) ||
        guest.cedula.toLowerCase().includes(searchLower);

      const matchesStatus = filterStatus === "" || order.status === filterStatus;

      return matchesSearch && matchesStatus;
    });
  }, [orders, searchTerm, filterStatus]);

  const analytics = useMemo(() => {
    const relevantOrders = filteredOrders;
    const totalRevenue = relevantOrders.reduce((sum, order) => (order.status === 'PAID' || order.status === 'COMPLETED' ? sum + order.totalAmount : sum), 0);
    const totalOrders = relevantOrders.length;
    const paidOrders = relevantOrders.filter(order => order.status === 'PAID' || order.status === 'COMPLETED').length;

    return { totalRevenue, totalOrders, paidOrders };
  }, [filteredOrders]);

  const handleExportToExcel = () => {
    const headers = [
      "ID de Orden",
      "Fecha",
      "Cliente",
      "Email",
      "Cédula",
      "Teléfono",
      "Dirección",
      "Productos",
      "Total",
      "Estado del Pago",
      "ID de Transacción",
    ];

    const csvRows = filteredOrders.map((order) => {
      const { _id, createdAt, guestInfo, items, totalAmount, status, wompiTransactionId } = order;
      const date = new Date(createdAt).toLocaleDateString();
      const productList = items.map(item => `${item.name} (x${item.qty})`).join('; ');

      return [
        `"${_id}"`,
        `"${date}"`,
        `"${guestInfo.name}"`,
        `"${guestInfo.email}"`,
        `"${guestInfo.cedula}"`,
        `"${guestInfo.phoneNumber}"`,
        `"${guestInfo.address}"`,
        `"${productList}"`,
        totalAmount,
        `"${status}"`,
        `"${wompiTransactionId || 'N/A'}"`,
      ].join(",");
    });

    const csvContent = [headers.join(","), ...csvRows].join("\n");
    const blob = new Blob([`\uFEFF${csvContent}`], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `ventas-${selectedYear}-${selectedMonth}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <main className="flex flex-col items-center justify-center min-h-[70vh] p-8">
        <Loader2 className="h-16 w-16 text-secondary-500 animate-spin" />
        <p className="mt-4 text-xl text-slate-700">Cargando ventas...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex flex-col items-center justify-center min-h-[70vh] p-8">
        <p className="text-red-500 text-xl">{error}</p>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-6 py-12 pb-32">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
            <h2 className="text-secondary-600 text-[10px] font-gobold uppercase tracking-[0.4em]">Tienda Online</h2>
            <h1 className="text-4xl font-gobold text-slate-900 uppercase tracking-tight">Ventas Realizadas</h1>
        </div>
        
        <button
          onClick={handleExportToExcel}
          className="flex items-center gap-3 bg-slate-900 text-white font-gobold px-8 py-4 rounded-2xl text-[10px] uppercase tracking-widest shadow-lg hover:bg-secondary-600 transition-all"
        >
          <FileText size={18} /> Exportar Reporte
        </button>
      </div>

      {/* FILTERS */}
      <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 mb-10 shadow-xl space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Año</label>
                <select 
                    value={selectedYear} 
                    onChange={(e) => setSelectedYear(parseInt(e.target.value))} 
                    className="w-full bg-slate-50 border border-slate-100 text-slate-900 rounded-xl px-4 py-3 focus:border-secondary-500 transition-all outline-none text-sm font-medium appearance-none"
                >
                    {years.map(year => <option key={year} value={year}>{year}</option>)}
                </select>
            </div>
            <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Mes</label>
                <select 
                    value={selectedMonth} 
                    onChange={(e) => setSelectedMonth(parseInt(e.target.value))} 
                    className="w-full bg-slate-50 border border-slate-100 text-slate-900 rounded-xl px-4 py-3 focus:border-secondary-500 transition-all outline-none text-sm font-medium appearance-none"
                >
                    {months.map(month => <option key={month.value} value={month.value}>{month.name}</option>)}
                </select>
            </div>
            <div className="space-y-2 md:col-span-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Búsqueda rápida</label>
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Nombre, email o cédula..."
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl pl-12 pr-4 py-3 text-sm text-slate-900 focus:border-secondary-500 focus:ring-4 focus:ring-secondary-500/10 transition-all outline-none font-medium"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
        </div>

        <div className="flex border-t border-slate-50 pt-6">
            <div className="flex flex-wrap gap-2">
                {["", "PAID", "PENDING_PAYMENT", "FAILED"].map((status) => (
                    <button
                        key={status}
                        onClick={() => setFilterStatus(status)}
                        className={`px-6 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${
                            filterStatus === status 
                            ? "bg-secondary-600 text-white shadow-lg" 
                            : "bg-slate-50 text-slate-400 hover:bg-slate-100 border border-slate-100"
                        }`}
                    >
                        {status === "" ? "Todos" : status === "PAID" ? "Pagados" : status === "PENDING_PAYMENT" ? "Pendientes" : "Fallidos"}
                    </button>
                ))}
            </div>
        </div>
      </div>

      {/* ANALYTICS DASHBOARD */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl flex items-center gap-6 group hover:border-secondary-500/30 transition-all">
          <div className="p-4 bg-green-50 rounded-2xl group-hover:bg-green-100 transition-colors">
            <DollarSign className="h-8 w-8 text-green-600" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ingresos Pagados</p>
            <p className="text-3xl font-gobold text-slate-900">${analytics.totalRevenue.toLocaleString('es-CO')}</p>
          </div>
        </div>
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl flex items-center gap-6 group hover:border-secondary-500/30 transition-all">
          <div className="p-4 bg-secondary-50 rounded-2xl group-hover:bg-secondary-100 transition-colors">
            <ShoppingCart className="h-8 w-8 text-secondary-600" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Órdenes Totales</p>
            <p className="text-3xl font-gobold text-slate-900">{analytics.totalOrders}</p>
          </div>
        </div>
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl flex items-center gap-6 group hover:border-secondary-500/30 transition-all">
          <div className="p-4 bg-accent-50 rounded-2xl group-hover:bg-accent-100 transition-colors">
            <BarChart2 className="h-8 w-8 text-slate-400" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Éxito en Ventas</p>
            <p className="text-3xl font-gobold text-slate-900">{analytics.paidOrders}</p>
          </div>
        </div>
      </div>

      {/* ORDERS TABLE */}
      {filteredOrders.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-[2.5rem] p-20 text-center shadow-lg">
            <Package size={48} className="mx-auto text-slate-100 mb-6" />
            <p className="text-slate-400 font-medium italic">No se encontraron órdenes para este período.</p>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-[2.5rem] shadow-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-100">
              <thead className="bg-slate-50/50">
                <tr>
                  <th className="px-8 py-5 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Fecha</th>
                  <th className="px-8 py-5 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Cliente</th>
                  <th className="px-8 py-5 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Contacto</th>
                  <th className="px-8 py-5 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Productos</th>
                  <th className="px-8 py-5 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total</th>
                  <th className="px-8 py-5 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Estado</th>
                  <th className="px-8 py-5 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-8 py-6 whitespace-nowrap text-sm text-slate-600 font-medium">
                        {new Date(order.createdAt).toLocaleDateString('es-CO', { day: '2-digit', month: 'short' })}
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap">
                        <p className="text-sm font-gobold text-slate-900 uppercase tracking-tight">{order.guestInfo.name}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{order.guestInfo.cedula}</p>
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap">
                        <p className="text-sm text-slate-600 font-medium">{order.guestInfo.email}</p>
                        <p className="text-xs text-slate-400">{order.guestInfo.phoneNumber}</p>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex -space-x-2">
                        {order.items.map((item: OrderItem, idx) => (
                          <div key={idx} className="relative h-10 w-10 rounded-full border-2 border-white overflow-hidden shadow-sm bg-slate-100 group/img">
                            <Image 
                                src={item.image || "/placeholder-image.jpg"} 
                                alt={item.name} 
                                fill 
                                className="object-cover" 
                            />
                            <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center text-[10px] text-white font-bold">
                                x{item.qty}
                            </div>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap">
                        <p className="text-sm font-gobold text-slate-900">${order.totalAmount.toLocaleString('es-CO')}</p>
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap">
                        <span className={`px-4 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full ${ 
                            order.status === 'PAID' || order.status === 'COMPLETED' ? 'bg-green-50 text-green-600 border border-green-100' :
                            order.status === 'PENDING_PAYMENT' ? 'bg-yellow-50 text-yellow-600 border border-yellow-100' :
                            'bg-red-50 text-red-600 border border-red-100'
                        }`}> 
                            {order.status === "PAID" ? "Pagado" : order.status === "PENDING_PAYMENT" ? "Pendiente" : "Fallido"}
                        </span>
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap">
                        {order.status === 'PENDING_PAYMENT' && (
                            <button
                            onClick={() => handleForceProcess(order._id)}
                            disabled={processingId === order._id}
                            className="bg-secondary-600 text-white font-gobold px-4 py-2 rounded-xl text-[10px] uppercase tracking-widest hover:bg-slate-900 transition-all shadow-sm"
                            >
                            {processingId === order._id ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Aprobar Pago'}
                            </button>
                        )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </main>
  );
}

export default function SalesPage() {
  return (
    <AdminAuthGuard>
      <SalesPageContent />
    </AdminAuthGuard>
  )
}
