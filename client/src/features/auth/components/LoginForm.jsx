import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

import { login as loginRequest } from "../../auth/services/authApi";
import useAuthStore from "../store/authStore";

import LoginInput from "./LoginInput";
import LoginButton from "./LoginButton";

export default function LoginForm() {
  const navigate = useNavigate();

  const authLogin = useAuthStore((state) => state.login);

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loadingToast = toast.loading("Connexion en cours...");

    try {
      setLoading(true);

      const data = await loginRequest(formData);

      authLogin(data.user, data.token);

      toast.success("Connexion réussie 🎉", {
        id: loadingToast,
        style: {
          borderRadius: "18px",
          background: "#fff",
          color: "#0f172a",
          padding: "16px",
        },
      });

      setTimeout(() => {
        navigate("/dashboard");
      }, 800);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Email ou mot de passe incorrect",
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
        label="Adresse email"
        type="email"
        name="email"
        placeholder="exemple@email.com"
        value={formData.email}
        onChange={handleChange}
      />

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

      <LoginButton loading={loading} />

      <p className="text-center text-slate-500">
        Pas de compte ?{" "}
        <Link to="/register" className="font-semibold text-blue-600">
          Créer un compte
        </Link>
      </p>
    </form>
  );
}
