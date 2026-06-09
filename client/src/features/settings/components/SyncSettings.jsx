/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { RefreshCw, Clock, CheckCircle, Home } from "lucide-react";

import { toast } from "sonner";

import useSettingsStore from "../store/settingsStore";
import usePropertyStore from "../../properties/store/propertyStore";

import { syncAll } from "../../sync/services/syncApi";

export default function SyncSettings() {
  const settings = useSettingsStore((state) => state.settings);

  const saveSettings = useSettingsStore((state) => state.saveSettings);

  const properties = usePropertyStore((state) => state.properties);

  const fetchProperties = usePropertyStore((state) => state.fetchProperties);

  const [syncInterval, setSyncInterval] = useState(60);

  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    fetchProperties();
  }, []);

  useEffect(() => {
    if (settings) {
      setSyncInterval(settings.syncInterval);
    }
  }, [settings]);

  const handleSave = async () => {
    try {
      await saveSettings({
        ...settings,
        syncInterval: Number(syncInterval),
      });

      toast.success("Paramètres enregistrés");
    } catch (error) {
      console.error(error);

      toast.error("Erreur lors de la sauvegarde");
    }
  };

  const handleSync = async () => {
    try {
      setSyncing(true);

      const result = await syncAll();

      toast.success(`${result.imported || 0} réservation(s) synchronisée(s)`);
    } catch (error) {
      console.error(error);

      toast.error("Erreur de synchronisation");
    } finally {
      setSyncing(false);
    }
  };

  const activeProperties = properties.filter(
    (property) => property.isActive,
  ).length;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
          <RefreshCw className="text-green-600" />
        </div>

        <div>
          <h2 className="text-xl font-semibold">Synchronisation Airbnb</h2>

          <p className="text-sm text-gray-500">
            Gérez la synchronisation automatique des calendriers iCal.
          </p>
        </div>
      </div>

      {/* Cartes statistiques */}

      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <div className="rounded-xl border p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock size={18} />
            <span className="font-medium">Dernière synchronisation</span>
          </div>

          <p className="text-gray-500">
            {settings?.lastSyncAt
              ? new Date(settings.lastSyncAt).toLocaleString("fr-FR")
              : "Jamais"}
          </p>
        </div>

        <div className="rounded-xl border p-4">
          <div className="flex items-center gap-2 mb-2">
            <Home size={18} />
            <span className="font-medium">Logements actifs</span>
          </div>

          <p className="text-gray-500">{activeProperties} logement(s)</p>
        </div>

        <div className="rounded-xl border p-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle size={18} />
            <span className="font-medium">Statut</span>
          </div>

          <p className="font-medium text-green-600">Synchronisation active</p>
        </div>
      </div>

      {/* Paramètres */}

      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium mb-2">
            Fréquence de synchronisation
          </label>

          <select
            value={syncInterval}
            onChange={(e) => setSyncInterval(e.target.value)}
            className="w-full border rounded-lg p-3">
            <option value="15">Toutes les 15 minutes</option>

            <option value="30">Toutes les 30 minutes</option>

            <option value="60">Toutes les 1 heure</option>

            <option value="120">Toutes les 2 heures</option>

            <option value="360">Toutes les 6 heures</option>
          </select>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleSync}
            disabled={syncing}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl disabled:opacity-50">
            {syncing ? "Synchronisation..." : "Synchroniser maintenant"}
          </button>

          <button
            onClick={handleSave}
            className="border border-slate-200 hover:bg-slate-50 px-5 py-3 rounded-xl">
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
}
