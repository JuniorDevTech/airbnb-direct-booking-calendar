import { Link } from "react-router-dom";
import { Plus, CalendarDays, ArrowRight } from "lucide-react";

export default function QuickActions() {
  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-slate-900">Actions rapides</h3>

        <p className="mt-1 text-sm text-slate-500">
          Accédez rapidement aux fonctionnalités principales.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Link
          to="/properties"
          className="
            group
            rounded-2xl
            border
            border-blue-100
            bg-blue-50
            p-5
            transition-all
            hover:-translate-y-1
            hover:shadow-md
          ">
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600">
              <Plus className="h-6 w-6 text-white" />
            </div>

            <ArrowRight className="h-5 w-5 text-blue-400 transition-transform group-hover:translate-x-1" />
          </div>

          <h4 className="mt-4 font-semibold text-slate-900">
            Ajouter un logement
          </h4>

          <p className="mt-1 text-sm text-slate-500">
            Créez un nouveau bien immobilier.
          </p>
        </Link>

        <Link
          to="/calendar"
          className="
            group
            rounded-2xl
            border
            border-green-100
            bg-green-50
            p-5
            transition-all
            hover:-translate-y-1
            hover:shadow-md
          ">
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-600">
              <CalendarDays className="h-6 w-6 text-white" />
            </div>

            <ArrowRight className="h-5 w-5 text-green-400 transition-transform group-hover:translate-x-1" />
          </div>

          <h4 className="mt-4 font-semibold text-slate-900">
            Voir le calendrier
          </h4>

          <p className="mt-1 text-sm text-slate-500">
            Consultez les réservations et disponibilités.
          </p>
        </Link>
      </div>
    </div>
  );
}
