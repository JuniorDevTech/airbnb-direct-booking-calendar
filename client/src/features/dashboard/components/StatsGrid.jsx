import { Home, CalendarDays, Ban, BarChart3 } from "lucide-react";

import StatsCard from "./StatsCard";

export default function StatsGrid({ stats }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <StatsCard
        title="Logements"
        value={stats?.properties || 0}
        icon={Home}
        color="blue"
      />

      <StatsCard
        title="Réservations"
        value={stats?.reservations || 0}
        icon={CalendarDays}
        color="green"
      />

      <StatsCard
        title="Dates bloquées"
        value={stats?.blocked || 0}
        icon={Ban}
        color="amber"
      />

      <StatsCard
        title="Taux d'occupation"
        value={`${stats?.occupancyRate || 0}%`}
        icon={BarChart3}
        color="red"
      />
    </div>
  );
}
