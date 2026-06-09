import { Home, CheckCircle2 } from "lucide-react";

export default function PropertySelector({ properties, value, onChange }) {
  return (
    <div>
      <h3 className="text-lg font-bold text-gray-900 mb-4">
        Choisir un logement
      </h3>

      <div className="grid gap-3 md:grid-cols-2">
        {properties.map((property) => {
          const selected = value === property.id;

          return (
            <button
              key={property.id}
              onClick={() => onChange(property.id)}
              className={`
                relative
                p-4
                rounded-2xl
                border
                text-left
                transition-all
                duration-200
                hover:shadow-lg
                ${
                  selected
                    ? "border-blue-500 bg-blue-50 shadow-md"
                    : "border-gray-200 bg-white"
                }
              `}>
              {selected && (
                <CheckCircle2
                  size={20}
                  className="absolute top-4 right-4 text-blue-600"
                />
              )}

              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-blue-100">
                  <Home size={20} className="text-blue-600" />
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900">
                    {property.name}
                  </h4>

                  <p className="text-sm text-gray-500">
                    Sélectionner ce logement
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
