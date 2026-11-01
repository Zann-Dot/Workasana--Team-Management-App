import { Navigate, Outlet } from "react-router";
import { CheckAuthToken } from "@/utilis/CheckAuthToken";

export default function ProtectedRoutes() {
    const isAuthenticated = CheckAuthToken();
    if (isAuthenticated)
        return <Outlet />

    return <Navigate to="/" replace />
}
