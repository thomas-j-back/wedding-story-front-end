import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/features/auth/useAuth";
import type React from "react";

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const auth = useAuth();
  const location = useLocation();

  if (!auth?.user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  return children;
}