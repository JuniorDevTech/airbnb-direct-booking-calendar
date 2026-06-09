import { useState } from "react";
import { toast } from "sonner";

import { Shield, Lock } from "lucide-react";

import useSecurityStore from "../store/securityStore";

export default function SecuritySettings() {
  const changePassword = useSecurityStore((state) => state.changePassword);

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,

      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas");

      return;
    }

    try {
      await changePassword({
        currentPassword: formData.currentPassword,

        newPassword: formData.newPassword,
      });

      toast.success("Mot de passe modifié");

      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message || "Erreur lors de la modification",
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow-sm">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100">
          <Shield className="text-red-600" />
        </div>

        <div>
          <h2 className="text-xl font-semibold">Sécurité</h2>

          <p className="text-sm text-gray-500">Modifier votre mot de passe.</p>
        </div>
      </div>

      <div className="space-y-4">
        <input
          type="password"
          name="currentPassword"
          value={formData.currentPassword}
          onChange={handleChange}
          placeholder="Ancien mot de passe"
          className="w-full border rounded-lg p-3"
        />

        <input
          type="password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          placeholder="Nouveau mot de passe"
          className="w-full border rounded-lg p-3"
        />

        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirmer le mot de passe"
          className="w-full border rounded-lg p-3"
        />
      </div>

      <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4">
        <div className="flex items-start gap-3">
          <Lock size={18} className="mt-0.5 text-amber-600" />

          <p className="text-sm text-amber-700">
            Utilisez au moins 8 caractères, majuscules, minuscules et chiffres.
          </p>
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 bg-blue-600 text-white px-5 py-3 rounded-xl">
        Modifier le mot de passe
      </button>
    </form>
  );
}
