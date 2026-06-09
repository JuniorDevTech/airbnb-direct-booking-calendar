import { CalendarDays, Pencil, Trash2, X, User, Home } from "lucide-react";

export default function ReservationDetailsModal({
  event,
  onClose,
  onEdit,
  onDelete,
}) {
  if (!event) return null;

  const typeColors = {
    reservation: "bg-red-100 text-red-700",
    blocked: "bg-amber-100 text-amber-700",
    checkin: "bg-blue-100 text-blue-700",
    checkout: "bg-violet-100 text-violet-700",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-xl rounded-3xl bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100">
              <CalendarDays className="h-6 w-6 text-blue-600" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Détails de la réservation
              </h2>

              <p className="text-sm text-slate-500">Informations complètes</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 hover:bg-slate-100 transition">
            <X size={20} />
          </button>
        </div>

        {/* Contenu */}
        <div className="p-6 space-y-5">
          <div className="rounded-2xl bg-slate-50 p-4">
            <h3 className="text-lg font-semibold text-slate-900">
              {event.title}
            </h3>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-100 p-4">
              <div className="flex items-center gap-2 mb-2">
                <CalendarDays size={18} className="text-blue-600" />
                <span className="font-medium">Date d'arrivée</span>
              </div>

              <p className="text-slate-600">{event.start}</p>
            </div>

            <div className="rounded-2xl border border-slate-100 p-4">
              <div className="flex items-center gap-2 mb-2">
                <CalendarDays size={18} className="text-green-600" />
                <span className="font-medium">Date de départ</span>
              </div>

              <p className="text-slate-600">{event.end}</p>
            </div>
          </div>

          {event.client && (
            <div className="rounded-2xl border border-slate-100 p-4">
              <div className="flex items-center gap-2 mb-2">
                <User size={18} className="text-slate-600" />
                <span className="font-medium">Client</span>
              </div>

              <p className="text-slate-600">{event.client}</p>
            </div>
          )}

          {event.property && (
            <div className="rounded-2xl border border-slate-100 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Home size={18} className="text-slate-600" />
                <span className="font-medium">Logement</span>
              </div>

              <p className="text-slate-600">{event.property}</p>
            </div>
          )}

          <div>
            <span
              className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${
                typeColors[event.type] || "bg-slate-100 text-slate-700"
              }`}>
              {event.type}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-slate-100 p-6">
          <button
            onClick={() => onEdit?.(event)}
            className="flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-3 text-white font-medium hover:bg-amber-600 transition">
            <Pencil size={18} />
            Modifier
          </button>

          <button
            onClick={() => onDelete?.(event)}
            className="flex items-center gap-2 rounded-xl bg-red-500 px-5 py-3 text-white font-medium hover:bg-red-600 transition">
            <Trash2 size={18} />
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}
