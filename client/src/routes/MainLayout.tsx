import { Outlet, useLocation } from "react-router";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Toaster } from "@/components/ui/toast"
import { useEffect } from "react";
import { useMain } from "@/context/mainContext";

export default function MainLayout() {
    const location = useLocation();
    const { resetAuthStates } = useMain();

    useEffect(() => {
        resetAuthStates()
    }, [location.pathname])
    return (
        <div className="min-h-screen bg-background text-foreground">
            <Toaster />
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}