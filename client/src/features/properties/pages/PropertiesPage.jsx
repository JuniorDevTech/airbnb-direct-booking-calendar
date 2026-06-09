/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Building2, Plus, Home, Link2 } from "lucide-react";

import usePropertyStore from "../store/propertyStore";

import PropertyModal from "../components/PropertyModal";
import EmptyProperties from "../components/EmptyProperties";
import PropertyCard from "../components/PropertyCard";

export default function PropertiesPage() {
  const { properties, loading, fetchProperties } = usePropertyStore();

  const addProperty = usePropertyStore((state) => state.addProperty);

  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleCreate = async (data) => {
    try {
      await addProperty(data);

      setModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[500px] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

          <p className="font-medium text-slate-500">
            Chargement des logements...
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
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20">
              <Building2 className="h-7 w-7" />
            </div>

            <h1 className="text-3xl font-bold">Gestion des logements</h1>

            <p className="mt-2 text-blue-100">
              Gérez vos biens immobiliers et leur synchronisation iCal.
            </p>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="
              flex
              items-center
              gap-2
              rounded-2xl
              bg-white
              px-6
              py-3
              font-semibold
              text-blue-600
              transition
              hover:scale-105
            ">
            <Plus size={18} />
            Ajouter un logement
          </button>
        </div>
      </section>

      {/* STATS */}

      <section className="grid gap-6 md:grid-cols-3">
        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Logements</p>

            <Home className="text-blue-500" />
          </div>

          <h3 className="mt-3 text-4xl font-bold text-slate-900">
            {properties.length}
          </h3>
        </div>

        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Synchronisés</p>

            <Link2 className="text-green-500" />
          </div>

          <h3 className="mt-3 text-4xl font-bold text-slate-900">
            {properties.filter((p) => p.icalUrl).length}
          </h3>
        </div>

        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Sans iCal</p>

            <Building2 className="text-amber-500" />
          </div>

          <h3 className="mt-3 text-4xl font-bold text-slate-900">
            {properties.filter((p) => !p.icalUrl).length}
          </h3>
        </div>
      </section>

      {/* LISTE */}

      {properties.length === 0 ? (
        <EmptyProperties />
      ) : (
        <section>
          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-900">Mes logements</h2>

            <p className="mt-1 text-sm text-slate-500">
              Liste complète des biens enregistrés.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </section>
      )}

      {/* MODAL */}

      <PropertyModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleCreate}
      />
    </div>
  );
}
