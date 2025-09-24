import TopNav from "./components/TopNav";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./components/Footer";

const Layout = () => {
    const location = useLocation();

    return (
        <div className="bg-background w-full h-full">
            <TopNav />
            <main>
                <Outlet key={location.key} />
            </main>
            <Footer />
        </div>
    )
}

export default Layout;