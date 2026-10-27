import { Outlet, useLocation } from "react-router";
import Footer from "./components/Footer";
import Header from "./components/Header";


export default function MainLayout() {
    const location = useLocation();

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}
