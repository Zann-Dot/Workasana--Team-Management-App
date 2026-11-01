import { Navigate, Outlet } from "react-router";
import { CheckAuthToken } from "@/utilis/CheckAuthToken";

export default function GuestRoutes() {
    const isAuthenticated = CheckAuthToken();
    if (!isAuthenticated)
        return <Navigate to="/" replace />

    return <Outlet />
}
