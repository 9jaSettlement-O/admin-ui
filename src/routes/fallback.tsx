import { Navigate } from "react-router-dom";
import type { RouteType } from "@/utils/interfaces.util";

export const fallbackRoutes: RouteType[] = [
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
];
