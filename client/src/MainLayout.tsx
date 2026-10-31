import { Outlet, useLocation } from "react-router";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Toaster } from "@/components/ui/toast"


export default function MainLayout() {
    const location = useLocation();

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
