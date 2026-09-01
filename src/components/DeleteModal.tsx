"use client";

export default function DeleteModal({
  open,
  onClose,
  onConfirm,
  count,
  itemType = "elemento", // Default to "elemento"
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  count: number;
  itemType?: string; // Optional prop
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white border border-slate-100 rounded-[2rem] p-10 max-w-sm w-full shadow-2xl animate-in fade-in zoom-in duration-300">
        <h2 className="text-2xl font-gobold text-slate-900 uppercase tracking-tight mb-3">Confirmar eliminación</h2>
        <p className="text-slate-500 font-medium leading-relaxed mb-8">
          ¿Seguro que quieres eliminar{" "}
          <b className="text-slate-900">{count > 1 ? `${count} ${itemType}s` : `este ${itemType}`}</b>?
          Esta acción no se puede deshacer y se borrará permanentemente.
        </p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-4 rounded-xl bg-slate-50 text-slate-700 font-gobold text-[10px] uppercase tracking-widest hover:bg-slate-100 transition-all shadow-sm"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-6 py-4 rounded-xl bg-red-600 text-white font-gobold text-[10px] uppercase tracking-widest hover:bg-red-700 transition-all shadow-lg shadow-red-500/20"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}