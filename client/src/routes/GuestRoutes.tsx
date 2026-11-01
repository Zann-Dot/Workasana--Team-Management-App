import { Navigate, Outlet } from "react-router";
import { CheckAuthToken } from "@/utilis/CheckAuthToken";

export default function GuestRoutes() {
    const isAuthenticated = CheckAuthToken();
    console.log(isAuthenticated)
    if (!isAuthenticated)
        return <Outlet />

    return <Navigate to="/dashboard" replace />
}
