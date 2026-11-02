import { Navigate, Outlet } from "react-router";
import { CheckAuthToken } from "@/utilis/CheckAuthToken";

export default function GuestRoutes() {
    const isAuthenticated = CheckAuthToken();
    if (!isAuthenticated)
        return <Outlet />

    return <Navigate to="/dashboard" replace />
}
