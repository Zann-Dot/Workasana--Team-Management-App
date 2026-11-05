import { Navigate, Outlet, useLocation } from "react-router";
import { CheckAuthToken } from "@/utilis/CheckAuthToken";

export default function GuestRoutes() {
    const location = useLocation();
    const isAuthenticated = CheckAuthToken();
    if (!isAuthenticated)
        return <Outlet key={location.pathname} />

    return <Navigate to="/dashboard" replace />
}
