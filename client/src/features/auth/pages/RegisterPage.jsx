import LoginHero from "../components/LoginHero";
import RegisterCard from "../components/RegisterCard";

export default function RegisterPage() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <LoginHero />

      <div className="flex items-center justify-center bg-slate-50 p-6 lg:p-10">
        <RegisterCard />
      </div>
    </div>
  );
}
