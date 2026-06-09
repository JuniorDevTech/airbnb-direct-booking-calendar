import { LogOut, ChevronDown } from "lucide-react";

import useAuthStore from "../../features/auth/store/authStore";

export default function Header() {
  const logout = useAuthStore((state) => state.logout);

  const user = useAuthStore((state) => state.user);

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .substring(0, 2)
        .toUpperCase()
    : "US";

  return (
    <header className="sticky top-0 z-20 flex h-24 items-center justify-end border-b border-slate-200 bg-white px-8">
      <div className="flex items-center gap-4">
        {/* Utilisateur */}
        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 px-3 py-2">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
            {initials}
          </div>

          <div className="hidden text-left md:block">
            <p className="text-sm font-semibold text-slate-900">
              {user?.name || "Utilisateur"}
            </p>

            <p className="text-xs text-slate-500">{user?.email || ""}</p>
          </div>

          <ChevronDown size={16} className="text-slate-400" />
        </div>

        {/* Logout */}
        <button
          onClick={logout}
          className="flex items-center gap-2 rounded-2xl bg-rose-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-rose-600">
          <LogOut size={18} />
          Déconnexion
        </button>
      </div>
    </header>
  );
}
