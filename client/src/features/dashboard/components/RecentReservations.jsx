import { useEffect, useState } from "react";
import { CalendarDays, Home, User, Clock3 } from "lucide-react";

import { getRecentReservations } from "../services/dashboardApi";

export default function RecentReservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReservations = async () => {
      try {
        const data = await getRecentReservations();
        setReservations(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadReservations();
  }, []);

  if (loading) {
    return (
      <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <Clock3 className="h-5 w-5 animate-pulse text-blue-500" />

          <span className="text-slate-600">Chargement des réservations...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900">
            Réservations récentes
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Dernières activités enregistrées
          </p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-100">
          <CalendarDays className="h-5 w-5 text-blue-600" />
        </div>
      </div>

      {reservations.length === 0 ? (
        <div className="py-8 text-center">
          <CalendarDays className="mx-auto h-10 w-10 text-slate-300" />

          <p className="mt-3 text-slate-500">Aucune réservation récente</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reservations.map((reservation) => (
            <div
              key={reservation.id}
              className="
                flex
                items-start
                justify-between
                rounded-2xl
                border
                border-slate-100
                p-4
                transition-all
                hover:border-blue-200
                hover:bg-slate-50
              ">
              <div className="flex gap-4">
                {/* Avatar */}
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100">
                  <User className="h-5 w-5 text-blue-600" />
                </div>

                {/* Infos */}
                <div>
                  <h4 className="font-semibold text-slate-900">
                    {reservation.title}
                  </h4>

                  <div className="mt-1 flex items-center gap-2 text-sm text-slate-500">
                    <CalendarDays size={14} />

                    <span>
                      {reservation.startDate} → {reservation.endDate}
                    </span>
                  </div>

                  <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                    <Home size={14} />

                    <span>
                      {reservation.property?.name || "Logement non défini"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Badge */}
              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                Confirmée
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
