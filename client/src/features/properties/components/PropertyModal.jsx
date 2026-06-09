import { Home, X } from "lucide-react";

import PropertyForm from "./PropertyForm";

export default function PropertyModal({
  open,
  onClose,
  onSubmit,
  initialData,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100">
              <Home className="h-6 w-6 text-blue-600" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900">
                {initialData ? "Modifier le logement" : "Ajouter un logement"}
              </h2>

              <p className="text-sm text-slate-500">
                Configurez les informations de votre bien immobilier
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="
              rounded-xl
              p-2
              text-slate-500
              transition
              hover:bg-slate-100
              hover:text-slate-700
            ">
            <X size={20} />
          </button>
        </div>

        {/* Contenu */}
        <div className="max-h-[80vh] overflow-y-auto p-6">
          <PropertyForm onSubmit={onSubmit} initialData={initialData} />
        </div>
      </div>
    </div>
  );
}
