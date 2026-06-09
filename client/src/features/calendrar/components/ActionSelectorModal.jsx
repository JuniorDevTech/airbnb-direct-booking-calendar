import { CalendarPlus, Ban, X } from "lucide-react";

export default function ActionSelectorModal({
  open,
  onClose,
  onReservation,
  onBlock,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg overflow-hidden rounded-[32px] bg-white shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-start justify-between p-8 border-b border-slate-100">
          <div>
            <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 border border-blue-100">
              Gestion calendrier
            </span>

            <h2 className="mt-4 text-2xl font-bold text-slate-900">
              Nouvelle action
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Sélectionnez le type d’action à effectuer sur vos dates.
            </p>
          </div>

          <button
            onClick={onClose}
            className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-500 transition hover:bg-slate-200 hover:text-slate-700">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 space-y-4">
          <button
            onClick={onReservation}
            className="group relative flex w-full items-center gap-5 rounded-3xl border border-slate-200 bg-white p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:bg-blue-50/50 hover:shadow-xl">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 transition group-hover:scale-110">
              <CalendarPlus size={28} />
            </div>

            <div className="flex-1">
              <h3 className="text-lg font-semibold text-slate-900">
                Ajouter une réservation
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Créez une nouvelle réservation client avec dates, informations
                et disponibilité.
              </p>
            </div>
          </button>

          <button
            onClick={onBlock}
            className="group relative flex w-full items-center gap-5 rounded-3xl border border-slate-200 bg-white p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:bg-slate-50 hover:shadow-xl">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-200 text-slate-700 transition group-hover:scale-110">
              <Ban size={28} />
            </div>

            <div className="flex-1">
              <h3 className="text-lg font-semibold text-slate-900">
                Bloquer des dates
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Empêchez les réservations sur certaines périodes indisponibles.
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
