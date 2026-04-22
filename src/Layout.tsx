import TopNav from "./components/TopNav";
import { Outlet, useLocation, useMatches } from "react-router-dom";
import Footer from "./components/Footer";
import type { RouteHandle } from "./types/routerType";

/**
 * Layout component
 */
const Layout = () => {
    const location = useLocation();
    const matches = useMatches();

    const requiresAuth = matches.some((match) => (match.handle as RouteHandle)?.requiresAuth)

    return (
        <div className="bg-background w-full h-full">
            {!requiresAuth && <TopNav />}

            <main>
                <Outlet key={location.pathname} />
            </main>
            <Footer />
        </div>
    )
}

export default Layout;