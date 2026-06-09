import { createBrowserRouter, Navigate } from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";

import DashboardPage from "../features/dashboard/pages/DashboardPage";

import PropertiesPage from "../features/properties/pages/PropertiesPage";

import CalendarPage from "../features/calendrar/pages/CalendarPage";

import SettingsPage from "../features/settings/pages/SettingsPage";

import ProtectedRoute from "../routes/ProtectedRoute";

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
    ],
  },

  {
    path: "/",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),

    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },

      {
        path: "dashboard",
        element: <DashboardPage />,
      },

      {
        path: "properties",
        element: <PropertiesPage />,
      },

      {
        path: "calendar",
        element: <CalendarPage />,
      },

      {
        path: "settings",
        element: <SettingsPage />,
      },
    ],
  },
]);

export default router;
