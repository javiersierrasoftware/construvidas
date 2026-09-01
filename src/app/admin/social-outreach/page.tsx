"use client";

import { useEffect, useState } from "react";
import { 
  Users, 
  Plus, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight, 
  Calendar,
  Wallet,
  HandCoins,
  ReceiptText,
  UserPlus
} from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import AdminAuthGuard from "@/components/auth/AdminAuthGuard";

function SocialOutreachPageContent() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);
  const [donors, setDonors] = useState<any[]>([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Form states
  const [showPersonForm, setShowPersonForm] = useState(false);
  const [showDonationForm, setShowDonationForm] = useState(false);
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  
  const [newPerson, setNewPerson] = useState({ name: "", phone: "" });
  const [newDonation, setNewDonation] = useState({ donorId: "", amount: "", type: "Transferencia", date: format(new Date(), 'yyyy-MM-dd') });
  const [newExpense, setNewExpense] = useState({ description: "", amount: "", date: format(new Date(), 'yyyy-MM-dd') });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [statsRes, donorsRes] = await Promise.all([
        fetch(`/api/admin/social-outreach/stats?month=${selectedMonth}&year=${selectedYear}`),
        fetch('/api/admin/social-outreach/donors')
      ]);
      
      if (statsRes.ok) setStats(await statsRes.json());
      if (donorsRes.ok) setDonors(await donorsRes.json());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedMonth, selectedYear]);

  const handleCreatePerson = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/admin/social-outreach/donors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPerson)
    });
    if (res.ok) {
      const created = await res.json();
      setDonors([...donors, created]);
      setNewPerson({ name: "", phone: "" });
      setShowPersonForm(false);
      alert("Persona registrada correctamente");
    }
  };

  const handleCreateDonation = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/admin/social-outreach/donations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newDonation)
    });
    if (res.ok) {
      fetchData();
      setShowDonationForm(false);
      setNewDonation({ donorId: "", amount: "", type: "Transferencia", date: format(new Date(), 'yyyy-MM-dd') });
    }
  };

  const handleCreateExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/admin/social-outreach/expenses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newExpense)
    });
    if (res.ok) {
      fetchData();
      setShowExpenseForm(false);
      setNewExpense({ description: "", amount: "", date: format(new Date(), 'yyyy-MM-dd') });
    }
  };

  const getTrend = () => {
    if (!stats || stats.prevTotalDonations === 0) return null;
    const diff = ((stats.totalDonations - stats.prevTotalDonations) / stats.prevTotalDonations) * 100;
    return diff;
  };

  const trend = getTrend();

  return (
    <main className="min-h-screen pt-24 pb-20 px-6 max-w-7xl mx-auto">
      {/* HEADER & FILTERS */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-gobold text-slate-900 uppercase tracking-tight">Proyección Social</h1>
          <p className="text-slate-500">Gestión de donaciones y egresos comunitarios</p>
        </div>

        <div className="flex flex-wrap gap-3 items-center">
            <div className="flex bg-white border border-slate-200 rounded-2xl p-1 shadow-sm">
                <select 
                    value={selectedMonth} 
                    onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                    className="bg-transparent px-4 py-2 text-xs font-bold uppercase outline-none cursor-pointer"
                >
                    {Array.from({ length: 12 }).map((_, i) => (
                        <option key={i+1} value={i+1}>{format(new Date(2024, i, 1), 'MMMM', { locale: es })}</option>
                    ))}
                </select>
                <select 
                    value={selectedYear} 
                    onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                    className="bg-transparent px-4 py-2 text-xs font-bold uppercase outline-none border-l border-slate-100 cursor-pointer"
                >
                    <option value={2026}>2026</option>
                    <option value={2025}>2025</option>
                    <option value={2024}>2024</option>
                </select>
            </div>

            <button 
                onClick={() => setShowPersonForm(true)}
                className="flex items-center gap-2 bg-slate-900 text-white px-5 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-slate-800 transition shadow-lg"
            >
                <UserPlus size={16} /> Persona
            </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary-600"></div>
        </div>
      ) : (
        <div className="space-y-8">
          {/* DASHBOARD CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                    <HandCoins size={80} className="text-secondary-600" />
                </div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">Ingresos (Donaciones)</p>
                <div className="flex items-center gap-3">
                    <h2 className="text-3xl font-gobold text-slate-900">${stats.totalDonations.toLocaleString()}</h2>
                    {trend !== null && (
                        <span className={`flex items-center text-[10px] font-bold px-2 py-1 rounded-lg ${trend >= 0 ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}`}>
                            {trend >= 0 ? <TrendingUp size={12} className="mr-1" /> : <TrendingDown size={12} className="mr-1" />}
                            {Math.abs(trend).toFixed(1)}%
                        </span>
                    )}
                </div>
                <button 
                    onClick={() => setShowDonationForm(true)}
                    className="mt-6 flex items-center gap-2 text-secondary-600 font-bold text-xs uppercase hover:underline"
                >
                    <Plus size={14} /> Registrar Donativo
                </button>
            </div>

            <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform text-red-600">
                    <ReceiptText size={80} />
                </div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">Egresos (Gastos)</p>
                <h2 className="text-3xl font-gobold text-slate-900">${stats.totalExpenses.toLocaleString()}</h2>
                <button 
                    onClick={() => setShowExpenseForm(true)}
                    className="mt-6 flex items-center gap-2 text-red-500 font-bold text-xs uppercase hover:underline"
                >
                    <Plus size={14} /> Registrar Egreso
                </button>
            </div>

            <div className="bg-slate-900 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:scale-110 transition-transform text-secondary-400">
                    <Wallet size={80} />
                </div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2 font-bold">Saldo Total en Caja</p>
                <h2 className="text-3xl font-gobold text-white">${stats.balance.toLocaleString()}</h2>
                <div className="mt-6 flex items-center gap-2 text-slate-400 text-[10px] uppercase font-bold tracking-widest">
                    <Wallet size={14} /> Dinero Actual Disponible
                </div>
            </div>
          </div>

          {/* TABLES / LISTS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* DONATIONS LIST */}
            <div className="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-sm">
                <div className="p-8 border-b border-slate-50 flex justify-between items-center">
                    <h3 className="text-lg font-gobold text-slate-900 uppercase tracking-tight">Detalle de Ingresos</h3>
                    <HandCoins size={20} className="text-secondary-500" />
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 text-[10px] uppercase font-bold text-slate-400 tracking-widest">
                            <tr>
                                <th className="px-8 py-4">Donante</th>
                                <th className="px-8 py-4">Tipo</th>
                                <th className="px-8 py-4 text-right">Valor</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {stats.donations.map((don: any) => (
                                <tr key={don._id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-8 py-5">
                                        <p className="text-sm font-bold text-slate-800">{don.donorId?.name || 'Desconocido'}</p>
                                        <p className="text-[10px] text-slate-400">{format(new Date(don.date), 'dd/MM/yyyy')}</p>
                                    </td>
                                    <td className="px-8 py-5">
                                        <span className="text-[10px] px-2 py-1 bg-slate-100 rounded-md font-bold text-slate-500 uppercase">{don.type}</span>
                                    </td>
                                    <td className="px-8 py-5 text-right font-gobold text-green-600 text-lg">
                                        ${don.amount.toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                            {stats.donations.length === 0 && (
                                <tr>
                                    <td colSpan={3} className="px-8 py-10 text-center text-slate-400 italic text-sm">No hay donaciones registradas este mes</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* EXPENSES LIST */}
            <div className="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-sm">
                <div className="p-8 border-b border-slate-50 flex justify-between items-center">
                    <h3 className="text-lg font-gobold text-slate-900 uppercase tracking-tight">Detalle de Egresos</h3>
                    <ReceiptText size={20} className="text-red-500" />
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 text-[10px] uppercase font-bold text-slate-400 tracking-widest">
                            <tr>
                                <th className="px-8 py-4">Descripción</th>
                                <th className="px-8 py-4 text-right">Valor</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {stats.expenses.map((exp: any) => (
                                <tr key={exp._id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-8 py-5">
                                        <p className="text-sm font-bold text-slate-800">{exp.description}</p>
                                        <p className="text-[10px] text-slate-400">{format(new Date(exp.date), 'dd/MM/yyyy')}</p>
                                    </td>
                                    <td className="px-8 py-5 text-right font-gobold text-red-500 text-lg">
                                        ${exp.amount.toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                             {stats.expenses.length === 0 && (
                                <tr>
                                    <td colSpan={2} className="px-8 py-10 text-center text-slate-400 italic text-sm">No hay egresos registrados este mes</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
          </div>
        </div>
      )}

      {/* MODALS / FORMS */}
      {showPersonForm && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] flex items-center justify-center p-6 bg-animate-overlay">
            <div className="bg-white rounded-[2.5rem] p-10 max-w-md w-full shadow-2xl animate-in zoom-in duration-300">
                <h2 className="text-2xl font-gobold text-slate-900 mb-6 uppercase">Registrar Nueva Persona</h2>
                <form onSubmit={handleCreatePerson} className="space-y-4">
                    <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Nombre Completo</label>
                        <input 
                            type="text" 
                            required
                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 outline-none focus:border-secondary-500 transition-all font-medium"
                            value={newPerson.name}
                            onChange={(e) => setNewPerson({...newPerson, name: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Teléfono</label>
                        <input 
                            type="text" 
                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 outline-none focus:border-secondary-500 transition-all font-medium"
                            value={newPerson.phone}
                            onChange={(e) => setNewPerson({...newPerson, phone: e.target.value})}
                        />
                    </div>
                    <div className="flex gap-3 pt-4">
                        <button type="button" onClick={() => setShowPersonForm(false)} className="flex-1 py-4 font-bold text-slate-400 hover:text-slate-600 uppercase text-xs">Cancelar</button>
                        <button type="submit" className="flex-1 bg-slate-900 text-white py-4 rounded-2xl font-gobold uppercase tracking-widest text-xs hover:bg-secondary-600 shadow-xl transition-all">Guardar</button>
                    </div>
                </form>
            </div>
        </div>
      )}

      {showDonationForm && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] flex items-center justify-center p-6 bg-animate-overlay">
            <div className="bg-white rounded-[2.5rem] p-10 max-w-md w-full shadow-2xl animate-in zoom-in duration-300">
                <h2 className="text-2xl font-gobold text-slate-900 mb-6 uppercase">Registrar Donativo</h2>
                <form onSubmit={handleCreateDonation} className="space-y-4">
                    <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Seleccionar Persona</label>
                        <select 
                            required
                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 outline-none focus:border-secondary-500 font-medium cursor-pointer"
                            value={newDonation.donorId}
                            onChange={(e) => setNewDonation({...newDonation, donorId: e.target.value})}
                        >
                            <option value="">-- Elige un donante --</option>
                            {donors.map(d => <option key={d._id} value={d._id}>{d.name}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Valor de Donación</label>
                        <input 
                            type="number" 
                            required
                            placeholder="$ 0.00"
                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 outline-none focus:border-secondary-500 transition-all font-gobold text-xl"
                            value={newDonation.amount}
                            onChange={(e) => setNewDonation({...newDonation, amount: e.target.value})}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Tipo</label>
                            <select 
                                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-xs font-bold font-medium"
                                value={newDonation.type}
                                onChange={(e) => setNewDonation({...newDonation, type: e.target.value})}
                            >
                                <option value="Transferencia">Transferencia</option>
                                <option value="Efectivo">Efectivo</option>
                                <option value="Otro">Otro</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Fecha</label>
                            <input 
                                type="date" 
                                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-xs font-bold"
                                value={newDonation.date}
                                onChange={(e) => setNewDonation({...newDonation, date: e.target.value})}
                            />
                        </div>
                    </div>
                    <div className="flex gap-3 pt-4">
                        <button type="button" onClick={() => setShowDonationForm(false)} className="flex-1 py-4 font-bold text-slate-400 hover:text-slate-600 uppercase text-xs">Cancelar</button>
                        <button type="submit" className="flex-1 bg-secondary-600 text-black py-4 rounded-2xl font-gobold uppercase tracking-widest text-xs hover:shadow-xl transition-all">Registrar</button>
                    </div>
                </form>
            </div>
        </div>
      )}

      {showExpenseForm && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] flex items-center justify-center p-6 bg-animate-overlay">
            <div className="bg-white rounded-[2.5rem] p-10 max-w-md w-full shadow-2xl animate-in zoom-in duration-300">
                <h2 className="text-2xl font-gobold text-slate-900 mb-6 uppercase">Nuevo Egreso</h2>
                <form onSubmit={handleCreateExpense} className="space-y-4">
                    <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Nombre / Concepto</label>
                        <input 
                            type="text" 
                            required
                            placeholder="Ej: Pago de servicios..."
                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 outline-none focus:border-red-400 transition-all font-medium"
                            value={newExpense.description}
                            onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Valor</label>
                        <input 
                            type="number" 
                            required
                            placeholder="$ 0.00"
                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 outline-none focus:border-red-400 transition-all font-gobold text-xl text-red-500"
                            value={newExpense.amount}
                            onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Fecha del Gasto</label>
                        <input 
                            type="date" 
                            className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-xs font-bold"
                            value={newExpense.date}
                            onChange={(e) => setNewExpense({...newExpense, date: e.target.value})}
                        />
                    </div>
                    <div className="flex gap-3 pt-4">
                        <button type="button" onClick={() => setShowExpenseForm(false)} className="flex-1 py-4 font-bold text-slate-400 hover:text-slate-600 uppercase text-xs">Cancelar</button>
                        <button type="submit" className="flex-1 bg-red-500 text-white py-4 rounded-2xl font-gobold uppercase tracking-widest text-xs hover:bg-red-600 shadow-xl transition-all">Registrar Egreso</button>
                    </div>
                </form>
            </div>
        </div>
      )}

      <style jsx>{`
        .bg-animate-overlay {
            animation: fadeInOverlay 0.4s ease-out;
        }
        @keyframes fadeInOverlay {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
            background: #f8fafc;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #e2e8f0;
            border-radius: 10px;
        }
      `}</style>
    </main>
  );
}

export default function SocialOutreachPage() {
  return (
    <AdminAuthGuard>
      <SocialOutreachPageContent />
    </AdminAuthGuard>
  );
}
