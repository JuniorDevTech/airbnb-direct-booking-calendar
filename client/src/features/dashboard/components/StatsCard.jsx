import { ArrowUpRight } from "lucide-react";

export default function StatsCard({
  title,
  value,
  icon: Icon,
  color = "blue",
}) {
  const colors = {
    blue: {
      bg: "bg-blue-100",
      text: "text-blue-600",
    },
    green: {
      bg: "bg-green-100",
      text: "text-green-600",
    },
    amber: {
      bg: "bg-amber-100",
      text: "text-amber-600",
    },
    red: {
      bg: "bg-red-100",
      text: "text-red-600",
    },
  };

  return (
    <div
      className="
        group
        rounded-3xl
        border
        border-slate-100
        bg-white
        p-6
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-lg
      ">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>

          <h3 className="mt-3 text-4xl font-bold text-slate-900">{value}</h3>
        </div>

        {Icon && (
          <div
            className={`
              flex h-14 w-14 items-center justify-center
              rounded-2xl
              ${colors[color].bg}
            `}>
            <Icon className={`h-7 w-7 ${colors[color].text}`} />
          </div>
        )}
      </div>

      <div className="mt-5 flex items-center gap-2 text-sm">
        <ArrowUpRight className="h-4 w-4 text-green-500" />

        <span className="font-medium text-green-600">+12%</span>

        <span className="text-slate-500">par rapport au mois dernier</span>
      </div>
    </div>
  );
}
