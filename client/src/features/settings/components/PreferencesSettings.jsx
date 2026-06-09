/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { toast } from "sonner";

import useSettingsStore from "../store/settingsStore";

export default function PreferencesSettings() {
  const settings = useSettingsStore((state) => state.settings);

  const fetchSettings = useSettingsStore((state) => state.fetchSettings);

  const saveSettings = useSettingsStore((state) => state.saveSettings);

  const [formData, setFormData] = useState({
    language: "fr",
    timezone: "Africa/Abidjan",
    syncInterval: 60,
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  useEffect(() => {
    if (settings) {
      setFormData({
        language: settings.language || "fr",

        timezone: settings.timezone || "Africa/Abidjan",

        syncInterval: settings.syncInterval || 60,
      });
    }
  }, [settings]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,

      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await saveSettings({
        language: formData.language,

        timezone: formData.timezone,

        syncInterval: Number(formData.syncInterval),
      });

      toast.success("Préférences enregistrées");
    } catch (error) {
      console.error(error);

      toast.error("Erreur lors de la sauvegarde");
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <h2 className="text-xl font-semibold mb-2">Préférences</h2>

      <p className="text-gray-500 mb-6">
        Configurez l'affichage et le comportement de l'application.
      </p>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Langue</label>

          <select
            name="language"
            value={formData.language}
            onChange={handleChange}
            className="w-full border rounded-lg p-3">
            <option value="fr">Français</option>

            <option value="en">English</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Fuseau horaire
          </label>

          <select
            name="timezone"
            value={formData.timezone}
            onChange={handleChange}
            className="w-full border rounded-lg p-3">
            <option value="Africa/Abidjan">Africa/Abidjan</option>

            <option value="Europe/Paris">Europe/Paris</option>

            <option value="Europe/London">Europe/London</option>

            <option value="America/New_York">America/New_York</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Synchronisation Airbnb
          </label>

          <select
            name="syncInterval"
            value={formData.syncInterval}
            onChange={handleChange}
            className="w-full border rounded-lg p-3">
            <option value="30">Toutes les 30 min</option>

            <option value="60">Toutes les 1 heure</option>

            <option value="120">Toutes les 2 heures</option>

            <option value="360">Toutes les 6 heures</option>
          </select>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl">
          Enregistrer les préférences
        </button>
      </div>
    </div>
  );
}
