import RegisterForm from "./RegisterForm";

export default function RegisterCard() {
  return (
    <div className="w-full max-w-lg">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 lg:p-10 shadow-[0_20px_60px_rgba(15,23,42,0.12)]">
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-bold text-slate-900">Créer un compte</h2>

          <p className="mt-2 text-slate-500">Commencez en quelques secondes</p>
        </div>

        <RegisterForm />
      </div>
    </div>
  );
}
