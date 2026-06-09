import { Home, Calendar, Trash2, ExternalLink, RefreshCw } from "lucide-react";

import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import usePropertyStore from "../store/propertyStore";

import { syncProperty } from "../../sync/services/syncApi";

export default function PropertyCard({ property }) {
  const navigate = useNavigate();

  const removeProperty = usePropertyStore((state) => state.removeProperty);

  const handleDelete = async () => {
    const confirmed = window.confirm(`Supprimer "${property.name}" ?`);

    if (!confirmed) return;

    try {
      await removeProperty(property.id);

      toast.success("Logement supprimé avec succès");
    } catch (error) {
      console.error(error);

      toast.error("Erreur lors de la suppression");
    }
  };

  const handleSync = async () => {
    try {
      const result = await syncProperty(property.id);

      console.log(result);

      toast.success(`${result?.imported ?? 0} réservation(s) importée(s)`);
    } catch (error) {
      console.error(error);

      toast.error("Erreur de synchronisation");
    }
  };

  const openCalendar = () => {
    navigate("/calendar");
  };

  return (
    <div className="group overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">
            <Home className="h-7 w-7 text-blue-600" />
          </div>

          <div>
            <h3 className="text-lg font-bold text-slate-900">
              {property.name}
            </h3>

            <p className="mt-1 text-sm text-slate-500">Bien immobilier</p>
          </div>
        </div>

        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
          Actif
        </span>
      </div>

      <div className="my-5 border-t border-slate-100" />

      <div className="flex items-start gap-3">
        <Calendar className="mt-1 h-5 w-5 text-slate-400" />

        <div className="flex-1">
          <p className="text-sm font-medium text-slate-700">
            Synchronisation iCal
          </p>

          <p className="mt-1 break-all text-sm text-slate-500">
            {property.icalUrl || "Aucune URL iCal configurée"}
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <button
          onClick={openCalendar}
          className="flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-blue-700">
          <Calendar size={16} />
          Calendrier
        </button>

        <button
          onClick={handleDelete}
          className="flex items-center justify-center gap-2 rounded-2xl bg-red-500 px-4 py-3 text-sm font-medium text-white transition hover:bg-red-600">
          <Trash2 size={16} />
          Supprimer
        </button>
      </div>

      {property.icalUrl && (
        <div className="mt-3 flex gap-3">
          <a
            href={property.icalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
            <ExternalLink size={16} />
            Ouvrir
          </a>

          <button
            onClick={handleSync}
            className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-emerald-700">
            <RefreshCw size={16} />
            Synchroniser
          </button>
        </div>
      )}
    </div>
  );
}
