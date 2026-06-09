import {
  Settings,
  User,
  Shield,
  SlidersHorizontal,
  RefreshCw,
} from "lucide-react";

import ProfileSettings from "../components/ProfileSettings";
import SecuritySettings from "../components/SecuritySettings";
import PreferencesSettings from "../components/PreferencesSettings";
import SyncSettings from "../components/SyncSettings";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-slate-800 to-slate-900 p-8 text-white">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
              <Settings className="h-7 w-7" />
            </div>

            <h1 className="text-3xl font-bold">Paramètres</h1>

            <p className="mt-2 text-slate-300">
              Gérez votre compte, vos préférences et la synchronisation de vos
              calendriers.
            </p>
          </div>

          <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">
            <p className="text-sm text-slate-300">Centre de configuration</p>

            <p className="text-lg font-semibold">Airbnb Calendar Manager</p>
          </div>
        </div>
      </section>

      {/* Résumé */}
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm text-slate-500">Profil</h3>

            <User className="text-blue-500" />
          </div>

          <p className="mt-3 text-lg font-semibold text-slate-900">
            Informations personnelles
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Nom, adresse et informations de compte
          </p>
        </div>

        <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm text-slate-500">Sécurité</h3>

            <Shield className="text-red-500" />
          </div>

          <p className="mt-3 text-lg font-semibold text-slate-900">
            Protection du compte
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Gestion du mot de passe et accès
          </p>
        </div>

        <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm text-slate-500">Préférences</h3>

            <SlidersHorizontal className="text-amber-500" />
          </div>

          <p className="mt-3 text-lg font-semibold text-slate-900">
            Personnalisation
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Langue, dates et fuseau horaire
          </p>
        </div>

        <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm text-slate-500">Synchronisation</h3>

            <RefreshCw className="text-green-500" />
          </div>

          <p className="mt-3 text-lg font-semibold text-slate-900">
            Calendriers Airbnb
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Paramètres iCal et synchronisation
          </p>
        </div>
      </section>

      {/* Sections */}
      <div className="space-y-6">
        <ProfileSettings />

        <SecuritySettings />

        <PreferencesSettings />

        <SyncSettings />
      </div>
    </div>
  );
}
