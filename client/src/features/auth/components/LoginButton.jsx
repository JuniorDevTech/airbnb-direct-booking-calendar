export default function LoginButton({ loading }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="
        w-full
        h-14
        rounded-2xl
        bg-gradient-to-r
        from-blue-600
        to-indigo-600
        text-white
        font-semibold
        transition-all
        hover:scale-[1.02]
        active:scale-[0.98]
        disabled:opacity-50
      ">
      {loading ? "Connexion..." : "Se connecter"}
    </button>
  );
}
