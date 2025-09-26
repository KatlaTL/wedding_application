import TopNav from "./components/TopNav";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./components/Footer";

/**
 * Layout component
 */
const Layout = () => {
    const location = useLocation();

    return (
        <div className="bg-background w-full h-full">
            <TopNav />
            <main>
                <Outlet key={location.pathname} />
            </main>
            <Footer />
        </div>
    )
}

export default Layout;