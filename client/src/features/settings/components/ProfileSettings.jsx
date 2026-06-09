/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";

import { toast } from "sonner";

import useProfileStore from "../store/profileStore";

export default function ProfileSettings() {
  const { profile, fetchProfile, saveProfile } = useProfileStore();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    description: "",
    address: "",
    icalUrl: "",
  });

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!profile) return;

    setFormData(profile);
  }, [profile]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,

      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await saveProfile(formData);

      toast.success("Profil mis à jour");
    } catch (error) {
      console.error(error);

      toast.error("Erreur lors de la mise à jour");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow-sm">
      <h2 className="text-xl font-semibold mb-6">Profil</h2>

      <div className="grid md:grid-cols-2 gap-4">
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Nom"
          className="border rounded-lg p-3"
        />

        <input
          disabled
          value={formData.email}
          className="border rounded-lg p-3 bg-gray-100"
        />
      </div>

      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        className="mt-4 w-full border rounded-lg p-3"
      />

      <input
        name="address"
        value={formData.address}
        onChange={handleChange}
        placeholder="Adresse"
        className="mt-4 w-full border rounded-lg p-3"
      />

      <input
        name="icalUrl"
        value={formData.icalUrl}
        onChange={handleChange}
        placeholder="URL iCal par défaut"
        className="mt-4 w-full border rounded-lg p-3"
      />

      <button
        type="submit"
        className="mt-6 bg-blue-600 text-white px-5 py-3 rounded-xl">
        Enregistrer
      </button>
    </form>
  );
}
