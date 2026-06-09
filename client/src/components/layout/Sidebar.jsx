import {
  LayoutDashboard,
  Building2,
  CalendarDays,
  Settings,
  ChevronRight,
  Home,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const links = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Properties",
    path: "/properties",
    icon: Building2,
  },
  {
    name: "Calendar",
    path: "/calendar",
    icon: CalendarDays,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 flex h-screen w-72 flex-col border-r border-slate-200 bg-white">
      {/* Logo */}
      <div className="border-b border-slate-200 px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-500 text-white shadow-lg">
            <Home size={22} />
          </div>

          <div>
            <h1 className="text-lg font-bold text-slate-900">
              Airbnb Calendar
            </h1>

            <p className="text-sm text-slate-500">Reservation Manager</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 py-5">
        <div className="space-y-2">
          {links.map((link) => {
            const Icon = link.icon;

            return (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `group flex items-center justify-between rounded-2xl px-4 py-3 transition-all duration-300 ${
                    isActive ? "bg-rose-50" : "hover:bg-slate-100"
                  }`
                }>
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-3">
                      <Icon
                        size={20}
                        className={
                          isActive
                            ? "text-rose-500"
                            : "text-slate-500 transition group-hover:text-slate-700"
                        }
                      />

                      <span
                        className={`font-medium ${
                          isActive ? "text-rose-600" : "text-slate-700"
                        }`}>
                        {link.name}
                      </span>
                    </div>

                    {isActive && (
                      <ChevronRight size={18} className="text-rose-500" />
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="border-t border-slate-200 p-4">
        <div className="flex items-center gap-3 rounded-2xl bg-slate-100 p-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-rose-500 text-sm font-semibold text-white">
            AM
          </div>

          <div className="flex-1">
            <p className="text-sm font-semibold text-slate-900">
              Admin Workspace
            </p>

            <p className="text-xs text-slate-500">Airbnb Calendar</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
