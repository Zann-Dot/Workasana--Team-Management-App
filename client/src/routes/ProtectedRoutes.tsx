import { Navigate, Outlet } from "react-router";
import { CheckAuthToken } from "@/utilis/CheckAuthToken";

export default function ProtectedRoutes() {
    const isAuthenticated = CheckAuthToken();
    if (isAuthenticated)
        return <Navigate to="/dashboard" replace />

    return <Outlet />
}
