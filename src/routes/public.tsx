import { LoginPage } from "@/pages/LoginPage";
import { SignupPage } from "@/pages/SignupPage";
import { SetPasswordPage } from "@/pages/SetPasswordPage";
import { Setup2FAPage } from "@/pages/Setup2FAPage";
import { SignupSuccessPage } from "@/pages/SignupSuccessPage";
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
    element: <SignupPage />,
  },
  {
    path: "/auth/set-password",
    element: <SetPasswordPage />,
  },
  {
    path: "/auth/setup-2fa",
    element: <Setup2FAPage />,
  },
  {
    path: "/auth/signup-success",
    element: <SignupSuccessPage />,
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
