import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

import { register } from "../services/authApi";

import LoginInput from "./LoginInput";
import LoginButton from "./LoginButton";

export default function RegisterForm() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
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

    // Validation password
    if (formData.password !== formData.confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas", {
        style: {
          borderRadius: "18px",
          padding: "16px",
        },
      });

      return;
    }

    const loadingToast = toast.loading("Création du compte...");

    try {
      setLoading(true);

      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      toast.success("Compte créé avec succès 🎉", {
        id: loadingToast,
        style: {
          borderRadius: "18px",
          background: "#fff",
          color: "#0f172a",
          padding: "16px",
        },
      });

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.message || "Erreur lors de l'inscription",
        {
          id: loadingToast,
          style: {
            borderRadius: "18px",
            background: "#fff",
            color: "#ef4444",
            padding: "16px",
          },
        },
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <LoginInput
        label="Nom complet"
        type="text"
        name="name"
        placeholder="Thomas Andre"
        value={formData.name}
        onChange={handleChange}
      />

      <LoginInput
        label="Adresse email"
        type="email"
        name="email"
        placeholder="exemple@email.com"
        value={formData.email}
        onChange={handleChange}
      />

      {/* Password */}
      <div className="relative">
        <LoginInput
          label="Mot de passe"
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="********"
          value={formData.password}
          onChange={handleChange}
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-[46px] text-slate-500">
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      {/* Confirm Password */}
      <div className="relative">
        <LoginInput
          label="Confirmer le mot de passe"
          type={showConfirmPassword ? "text" : "password"}
          name="confirmPassword"
          placeholder="********"
          value={formData.confirmPassword}
          onChange={handleChange}
        />

        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-4 top-[46px] text-slate-500">
          {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      {/* Terms */}
      <label className="flex items-start gap-3 text-sm text-slate-600">
        <input type="checkbox" required className="mt-1" />

        <span>
          J'accepte les{" "}
          <button type="button" className="font-medium text-blue-600">
            conditions
          </button>{" "}
          et la politique de confidentialité.
        </span>
      </label>

      <LoginButton loading={loading} />

      <p className="text-center text-slate-500">
        Déjà un compte ?{" "}
        <Link to="/login" className="font-semibold text-blue-600">
          Se connecter
        </Link>
      </p>
    </form>
  );
}
