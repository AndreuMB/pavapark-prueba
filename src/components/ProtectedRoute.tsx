import { Navigate } from "react-router";
import { useAuth } from "./AuthProvider";
import { type ReactNode } from "react";

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) return;

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
}
