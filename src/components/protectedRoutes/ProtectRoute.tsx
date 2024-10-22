// ROUTER
import { Outlet, Navigate } from "react-router-dom";

// CONTEXT
import { useContext } from "react";
import UserContext from "../../hooks/context/user.context";

// PROPS INTERFACE
interface ProtectedRouteProps {
  isLoggedIn?: boolean;
}

export default function ProtectRoute({
  isLoggedIn = false,
}: ProtectedRouteProps) {
  // RETRIEVE USER ID
  const { userId } = useContext(UserContext) || {};

  if (isLoggedIn && userId) {
    return <Navigate to="/" replace />;
  } else if (!isLoggedIn && !userId) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
}
