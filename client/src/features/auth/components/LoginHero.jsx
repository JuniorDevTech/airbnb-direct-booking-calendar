import { ShieldCheck, TrendingUp, Building2, Users } from "lucide-react";

export default function LoginHero() {
  const stats = [
    {
      icon: Building2,
      title: "500+",
      subtitle: "Entreprises",
    },
    {
      icon: Users,
      title: "10k+",
      subtitle: "Utilisateurs",
    },
    {
      icon: TrendingUp,
      title: "99%",
      subtitle: "Performance",
    },
  ];

  return (
    <div className="relative hidden overflow-hidden bg-gradient-to-br from-blue-700 via-indigo-700 to-slate-950 lg:flex items-center">
      <div className="absolute inset-0 bg-black/10" />

      <div className="relative z-10 max-w-xl px-16 text-white">
        <div className="mb-10 flex items-center gap-4">
          <div className="rounded-2xl bg-white/20 p-3 backdrop-blur-xl">
            <ShieldCheck size={28} />
          </div>

          <h1 className="text-2xl font-bold">Property Dashboard</h1>
        </div>

        <h2 className="text-4xl xl:text-5xl font-bold leading-tight">
          Gérez votre activité plus rapidement.
        </h2>

        <p className="mt-6 text-base text-slate-200 lg:text-lg">
          Une plateforme moderne pour gérer vos biens, revenus, utilisateurs et
          statistiques.
        </p>

        <div className="mt-14 grid grid-cols-3 gap-5">
          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="rounded-3xl border border-white/20 bg-white/10 p-5 backdrop-blur-xl">
                <Icon className="mb-3" />

                <h3 className="text-2xl font-bold">{item.title}</h3>

                <p className="text-sm text-slate-300">{item.subtitle}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
