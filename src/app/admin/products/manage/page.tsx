"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import DeleteModal from "@/components/DeleteModal";
import { Search, Package, PackageX, DollarSign, FileText, Loader2 } from "lucide-react";
import AdminAuthGuard from "@/components/auth/AdminAuthGuard";

type Product = {
  _id: string;
  name: string;
  price: number;
  stock: number;
  image?: string;
};

type StockStatus = "" | "IN_STOCK" | "OUT_OF_STOCK" | "LOW_STOCK";

function ManageProductsPageContent() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStock, setFilterStock] = useState<StockStatus>("");

  const router = useRouter();

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/admin/products", { credentials: "include" });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Error al cargar los productos.");
      }
      setProducts(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      let matchesStock = true;
      if (filterStock === "IN_STOCK") {
        matchesStock = product.stock > 0;
      } else if (filterStock === "OUT_OF_STOCK") {
        matchesStock = product.stock === 0;
      } else if (filterStock === "LOW_STOCK") {
        matchesStock = product.stock > 0 && product.stock <= 5;
      }

      return matchesSearch && matchesStock;
    });
  }, [products, searchTerm, filterStock]);

  const analytics = useMemo(() => {
    const totalProducts = products.length;
    const outOfStock = products.filter(p => p.stock === 0).length;
    const inventoryValue = products.reduce((acc, p) => acc + (p.price * p.stock), 0);
    return { totalProducts, outOfStock, inventoryValue };
  }, [products]);

  const handleDeleteClick = (product: Product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!productToDelete) return;
    try {
      const res = await fetch(`/api/admin/products/${productToDelete._id}`, {
        method: "DELETE",
        credentials: "include"
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Error al eliminar el producto.");
      }
      setProducts(products.filter((p) => p._id !== productToDelete._id));
      setShowDeleteModal(false);
      setProductToDelete(null);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleExportToExcel = () => {
    const headers = ["ID", "Nombre", "Precio", "Stock"];
    const csvRows = filteredProducts.map(p => 
      [`"${p._id}"`, `"${p.name}"`, p.price, p.stock].join(',')
    );
    const csvContent = [headers.join(","), ...csvRows].join("\n");
    const blob = new Blob([`\uFEFF${csvContent}`], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "productos.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return (
      <main className="flex flex-col items-center justify-center min-h-[70vh] p-8">
        <Loader2 className="h-16 w-16 text-secondary-500 animate-spin" />
        <p className="mt-4 text-xl text-slate-700">Cargando productos...</p>
      </main>
    );
  }

  if (error) {
    return <div className="max-w-6xl mx-auto px-4 py-8 text-red-500 text-center">{error}</div>;
  }

  return (
    <main className="max-w-7xl mx-auto px-6 py-12 pb-32">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
            <h2 className="text-secondary-600 text-[10px] font-gobold uppercase tracking-[0.4em]">Inventario</h2>
            <h1 className="text-4xl font-gobold text-slate-900 uppercase tracking-tight">Gestionar Productos</h1>
        </div>
        
        <Link 
            href="/admin/products/create" 
            className="bg-slate-900 text-white font-gobold px-8 py-4 rounded-2xl text-[10px] uppercase tracking-widest shadow-lg hover:bg-secondary-600 transition-all"
        >
          Crear Nuevo Producto
        </Link>
      </div>

      {/* ANALYTICS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl flex items-center gap-6 group hover:border-secondary-500/30 transition-all">
          <div className="p-4 bg-secondary-50 rounded-2xl group-hover:bg-secondary-100 transition-colors">
            <Package className="h-8 w-8 text-secondary-600" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Productos</p>
            <p className="text-3xl font-gobold text-slate-900">{analytics.totalProducts}</p>
          </div>
        </div>
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl flex items-center gap-6 group hover:border-secondary-500/30 transition-all">
          <div className="p-4 bg-red-50 rounded-2xl group-hover:bg-red-100 transition-colors">
            <PackageX className="h-8 w-8 text-red-500" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Agotados</p>
            <p className="text-3xl font-gobold text-slate-900">{analytics.outOfStock}</p>
          </div>
        </div>
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl flex items-center gap-6 group hover:border-secondary-500/30 transition-all">
          <div className="p-4 bg-green-50 rounded-2xl group-hover:bg-green-100 transition-colors">
            <DollarSign className="h-8 w-8 text-green-600" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Valor de Inventario</p>
            <p className="text-3xl font-gobold text-slate-900">${analytics.inventoryValue.toLocaleString('es-CO')}</p>
          </div>
        </div>
      </div>

      {/* FILTERS */}
      <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 mb-10 shadow-xl space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="relative flex-grow max-w-xl">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                    type="text" 
                    placeholder="Buscar producto por nombre..." 
                    value={searchTerm} 
                    onChange={e => setSearchTerm(e.target.value)} 
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl pl-12 pr-4 py-3 text-sm text-slate-900 focus:border-secondary-500 focus:ring-4 focus:ring-secondary-500/10 transition-all outline-none font-medium"
                />
            </div>
            <div className="flex gap-4">
                <select 
                    value={filterStock} 
                    onChange={e => setFilterStock(e.target.value as StockStatus)} 
                    className="bg-slate-50 border border-slate-100 text-slate-900 rounded-xl px-6 py-3 focus:border-secondary-500 transition-all outline-none text-[10px] font-bold uppercase tracking-widest appearance-none min-w-[180px]"
                >
                    <option value="">Todo el Stock</option>
                    <option value="IN_STOCK">En Stock</option>
                    <option value="LOW_STOCK">Bajo Stock (≤5)</option>
                    <option value="OUT_OF_STOCK">Agotado</option>
                </select>
                <button 
                    onClick={handleExportToExcel} 
                    className="flex items-center gap-3 bg-slate-100 text-slate-500 font-bold px-6 py-3 rounded-xl text-[10px] uppercase tracking-widest hover:bg-slate-200 transition-all border border-slate-200"
                >
                    <FileText size={16} /> Exportar CSV
                </button>
            </div>
        </div>
      </div>
      
      {filteredProducts.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-[2.5rem] p-20 text-center shadow-lg">
            <Package size={48} className="mx-auto text-slate-100 mb-6" />
            <p className="text-slate-400 font-medium italic">No se encontraron productos con estos criterios.</p>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-[2.5rem] shadow-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-100">
              <thead className="bg-slate-50/50">
                <tr>
                  <th className="px-8 py-5 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Producto</th>
                  <th className="px-8 py-5 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Precio</th>
                  <th className="px-8 py-5 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Stock</th>
                  <th className="px-8 py-5 text-right text-[10px] font-bold text-slate-400 uppercase tracking-widest">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredProducts.map((product) => (
                  <tr key={product._id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-8 py-6 whitespace-nowrap">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 relative flex-shrink-0 bg-slate-100 rounded-2xl overflow-hidden border border-slate-200">
                                {product.image ? (
                                    <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <Package size={20} className="text-slate-300" />
                                    </div>
                                )}
                            </div>
                            <span className="text-sm font-gobold text-slate-900 uppercase tracking-tight">{product.name}</span>
                        </div>
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap text-sm font-gobold text-slate-900">
                        ${product.price?.toLocaleString('es-CO')}
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap">
                        <span className={`px-4 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full ${
                            product.stock === 0 ? "bg-red-50 text-red-500 border border-red-100" :
                            product.stock <= 5 ? "bg-yellow-50 text-yellow-500 border border-yellow-100" :
                            "bg-green-50 text-green-500 border border-green-100"
                        }`}>
                            {product.stock} disponibles
                        </span>
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap text-right">
                        <div className="flex justify-end gap-3">
                            <Link 
                                href={`/admin/products/edit/${product._id}`} 
                                className="bg-slate-50 text-slate-600 font-bold px-4 py-2 rounded-xl text-[10px] uppercase tracking-widest hover:bg-secondary-600 hover:text-white transition-all shadow-sm border border-slate-100"
                            >
                                Editar
                            </Link>
                            <button 
                                onClick={() => handleDeleteClick(product)} 
                                className="bg-red-50 text-red-500 font-bold px-4 py-2 rounded-xl text-[10px] uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all shadow-sm border border-red-100"
                            >
                                Eliminar
                            </button>
                        </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showDeleteModal && productToDelete && (
        <DeleteModal 
            open={showDeleteModal} 
            onClose={() => setShowDeleteModal(false)} 
            onConfirm={handleDeleteConfirm} 
            count={1} 
            itemType="producto" 
        />
      )}
    </main>
  );
}

export default function ManageProductsPage() {
  return (
    <AdminAuthGuard>
      <ManageProductsPageContent />
    </AdminAuthGuard>
  )
}
