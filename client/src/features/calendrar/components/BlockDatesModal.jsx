/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { Ban, CalendarDays, X } from "lucide-react";

export default function BlockDatesModal({
  open,
  onClose,
  onSubmit,
  startDate,
  endDate,
}) {
  const [reason, setReason] = useState("");

  useEffect(() => {
    if (open) {
      setReason("");
    }
  }, [open]);

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      reason,
      startDate,
      endDate,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl overflow-hidden rounded-[32px] bg-white shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 p-8">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-4 py-1.5 text-sm font-medium text-red-600">
              <Ban size={14} />
              Gestion disponibilité
            </span>

            <h2 className="mt-4 text-2xl font-bold text-slate-900">
              Bloquer des dates
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Rendez votre propriété indisponible pendant une période donnée.
            </p>
          </div>

          <button
            onClick={onClose}
            className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-500 transition hover:bg-slate-200 hover:text-slate-700">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="space-y-6 p-8">
          {/* Selected dates */}
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm text-slate-700">
                <CalendarDays size={22} />
              </div>

              <div>
                <p className="text-sm font-medium text-slate-500">
                  Période sélectionnée
                </p>

                <h4 className="font-semibold text-slate-900">
                  {startDate} → {endDate}
                </h4>
              </div>
            </div>
          </div>

          {/* Reason input */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Motif du blocage
            </label>

            <input
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Travaux, maintenance, vacances..."
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-slate-900 outline-none transition focus:border-red-400 focus:bg-white focus:ring-4 focus:ring-red-100"
            />
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-4 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-2xl border border-slate-200 bg-white px-5 py-4 font-medium text-slate-600 transition hover:bg-slate-50">
              Annuler
            </button>

            <button
              type="submit"
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-4 font-semibold text-white transition hover:scale-[1.02] hover:bg-slate-800 active:scale-[0.98]">
              <Ban size={18} />
              Bloquer les dates
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
