import { Navigate, Outlet } from "react-router";
import useAuth from "../../hooks/useAuth";

export default function AuthGuard() {
  const { isAuth } = useAuth();
  if (!isAuth) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
}
