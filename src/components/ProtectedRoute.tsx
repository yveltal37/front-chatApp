import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { LoggedInContext } from "../Hooks/IsLogin";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isLoggedIn, loading } = useContext(LoggedInContext)!;

  if (loading) return null;

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
