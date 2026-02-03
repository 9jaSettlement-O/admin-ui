import { Navigate } from "react-router-dom";
import { LoginPage } from "@/pages/LoginPage";
import { AdminOnboardingFlow } from "@/pages/AdminOnboardingFlow";
import { ForgotPasswordPage } from "@/pages/ForgotPasswordPage";
import { ResetPasswordPage } from "@/pages/ResetPasswordPage";
import type { RouteType } from "@/utils/interfaces.util";

export const publicRoutes: RouteType[] = [
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/auth/signup",
    element: <AdminOnboardingFlow />,
  },
  {
    path: "/auth/set-password",
    element: <Navigate to="/auth/signup" replace />,
  },
  {
    path: "/auth/setup-2fa",
    element: <Navigate to="/auth/signup" replace />,
  },
  {
    path: "/auth/signup-success",
    element: <Navigate to="/auth/signup" replace />,
  },
  {
    path: "/auth/forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    path: "/auth/reset-password",
    element: <ResetPasswordPage />,
  },
];
