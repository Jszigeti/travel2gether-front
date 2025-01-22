// ROUTER
import { Outlet, Navigate } from "react-router-dom";

// CONTEXT
import useAuthContext from "../../hooks/context/useAuthContext";

// PROPS INTERFACE
interface ProtectedRouteProps {
  isLoggedIn?: boolean;
}

export default function ProtectRoute({
  isLoggedIn = false,
}: ProtectedRouteProps) {
  // RETRIEVE IS AUTHENTICATED STATE FROM CONTEXT
  const { isAuthenticated } = useAuthContext();

  if (isLoggedIn && isAuthenticated) {
    return <Navigate to="/" replace />;
  } else if (!isLoggedIn && !isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
}
