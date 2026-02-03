import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import storage from "@/utils/storage.util";

interface ProtectedRouteProps {
  children: ReactNode;
  roles?: string[];
}

export function ProtectedRoute({ children, roles }: ProtectedRouteProps) {
  const hasToken = storage.checkToken();
  const userType = storage.getUserType();

  if (!hasToken) {
    return <Navigate to="/" replace />;
  }

  if (roles && roles.length > 0 && userType && !roles.includes(userType)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
}
