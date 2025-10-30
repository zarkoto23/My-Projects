import { Navigate, Outlet } from "react-router";
import useAuth from "../../hooks/useAuth";

export default function GuestGuard() {
  const { isAuth } = useAuth();
  if (isAuth) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
}
