import { Navigate, Outlet } from "react-router";
import { CheckAuthToken } from "@/utilis/CheckAuthToken";
import AppSidebar from "@/components/AppSidebar";

export default function ProtectedRoutes() {
    const isAuthenticated = CheckAuthToken();
    if (isAuthenticated)
        return (
            <div className="flex min-h-[calc(100vh-4rem-81px)]">
                <AppSidebar />
                <div className="lg:ml-56 w-full min-w-0 transition-all">
                    <Outlet />
                </div>
            </div>
        )

    return <Navigate to="/" replace />
}
