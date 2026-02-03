import { LoginPage } from "@/pages/LoginPage";
import { SignupPage } from "@/pages/SignupPage";
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
];
