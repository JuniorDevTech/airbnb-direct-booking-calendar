import { useState } from "react";
import { Home, Calendar, Save } from "lucide-react";

export default function PropertyForm({ onSubmit, initialData }) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    icalUrl: initialData?.icalUrl || "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl bg-white p-6 shadow-sm border border-slate-100">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900">
          Informations du logement
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Configurez votre logement et la synchronisation iCal.
        </p>
      </div>

      <div className="space-y-5">
        {/* Nom du logement */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
            <Home size={16} />
            Nom du logement
          </label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Appartement Cocody Riviera"
            required
            className="
              w-full
              rounded-2xl
              border
              border-slate-200
              px-4
              py-3
              outline-none
              transition
              focus:border-blue-500
              focus:ring-4
              focus:ring-blue-100
            "
          />
        </div>

        {/* URL iCal */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
            <Calendar size={16} />
            URL iCal Airbnb
          </label>

          <input
            type="url"
            name="icalUrl"
            value={formData.icalUrl}
            onChange={handleChange}
            placeholder="https://www.airbnb.com/calendar/ical/..."
            className="
              w-full
              rounded-2xl
              border
              border-slate-200
              px-4
              py-3
              outline-none
              transition
              focus:border-blue-500
              focus:ring-4
              focus:ring-blue-100
            "
          />

          <p className="mt-2 text-xs text-slate-500">
            Permet de synchroniser automatiquement les réservations Airbnb.
          </p>
        </div>

        {/* Bouton */}
        <button
          type="submit"
          className="
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-2xl
            bg-blue-600
            px-4
            py-3
            font-medium
            text-white
            transition
            hover:bg-blue-700
          ">
          <Save size={18} />
          Enregistrer le logement
        </button>
      </div>
    </form>
  );
}
