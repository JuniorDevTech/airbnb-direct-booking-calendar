import { Home, CalendarCheck, Ban, CheckCircle } from "lucide-react";

export default function CalendarLegend() {
  const items = [
    {
      label: "Airbnb",
      description: "Réservation importée depuis Airbnb",
      icon: Home,
      color: "bg-red-500",
      light: "bg-red-50",
      text: "text-red-700",
      border: "border-red-100",
    },
    {
      label: "Réservation directe",
      description: "Créée manuellement dans l'application",
      icon: CalendarCheck,
      color: "bg-blue-500",
      light: "bg-blue-50",
      text: "text-blue-700",
      border: "border-blue-100",
    },
    {
      label: "Dates bloquées",
      description: "Logement indisponible",
      icon: Ban,
      color: "bg-slate-500",
      light: "bg-slate-50",
      text: "text-slate-700",
      border: "border-slate-200",
    },
    {
      label: "Disponible",
      description: "Aucune réservation sur la période",
      icon: CheckCircle,
      color: "bg-green-500",
      light: "bg-green-50",
      text: "text-green-700",
      border: "border-green-100",
    },
  ];

  return (
    <div className="mb-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            Légende du calendrier
          </h3>

          <p className="text-sm text-slate-500">
            Identifiez rapidement les différents types d'événements du
            calendrier.
          </p>
        </div>

        <div className="rounded-2xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600">
          Vue globale
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className={`group flex items-center gap-4 rounded-3xl border ${item.border} bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}>
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl ${item.light}`}>
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${item.color} text-white`}>
                  <Icon size={18} />
                </div>
              </div>

              <div>
                <h4 className={`font-semibold ${item.text}`}>{item.label}</h4>

                <p className="mt-1 text-xs text-slate-500">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
