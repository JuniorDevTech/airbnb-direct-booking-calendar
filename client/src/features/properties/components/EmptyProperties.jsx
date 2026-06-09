import { Building2 } from "lucide-react";

export default function EmptyProperties() {
  return (
    <div className="rounded-3xl bg-gradient-to-br from-slate-50 to-white p-16 text-center border border-slate-200">
      <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-blue-100">
        <Building2 className="h-12 w-12 text-blue-600" />
      </div>

      <h2 className="mt-6 text-2xl font-bold text-slate-900">
        Aucun logement enregistré
      </h2>

      <p className="mt-3 text-slate-500">
        Ajoutez votre premier logement pour commencer à gérer vos réservations
        et disponibilités.
      </p>

      <button className="mt-8 rounded-2xl bg-blue-600 px-6 py-3 text-white font-medium hover:bg-blue-700 transition">
        Créer un logement
      </button>
    </div>
  );
}
