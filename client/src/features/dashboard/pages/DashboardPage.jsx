import { useEffect, useState } from "react";
import { LayoutDashboard } from "lucide-react";

import StatsGrid from "../components/StatsGrid";
import RecentReservations from "../components/RecentReservations";
import QuickActions from "../components/QuickActions";

import { getStats } from "../services/dashboardApi";

export default function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await getStats();
        setStats(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[500px] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

          <p className="font-medium text-slate-500">
            Chargement du dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* HERO */}
      <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">
              <LayoutDashboard className="h-7 w-7" />
            </div>

            <h1 className="text-3xl font-bold">Dashboard Immobilier</h1>

            <p className="mt-2 max-w-2xl text-blue-100">
              Gérez vos logements, réservations et disponibilités depuis une
              interface centralisée.
            </p>
          </div>

          <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-green-400" />

              <div>
                <p className="font-semibold">Synchronisation active</p>

                <p className="text-sm text-blue-100">
                  Toutes les réservations sont à jour
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section>
        <StatsGrid stats={stats} />
      </section>

      {/* CONTENT */}
      <section className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <RecentReservations />
        </div>

        <div>
          <QuickActions />
        </div>
      </section>
    </div>
  );
}
