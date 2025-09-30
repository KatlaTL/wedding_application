import { useEffect, useState } from "react";
import { Link, NavLink, type NavLinkRenderProps } from "react-router-dom";
import { router } from "../router";

/**
 * The top navigation component
 */
const TopNav = () => {
    const [atTop, setAtTop] = useState<boolean>(false);
    const routes = router.routes;

    useEffect(() => {
        const handleScroll = () => {
            setAtTop(window.scrollY <= 50)
        }

        window.addEventListener("scroll", handleScroll);

        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, [])

    const linkClassNames: ((props: NavLinkRenderProps) => string | undefined) | undefined = ({ isActive }) => {
        if (isActive) {
            return "text-primary";
        }
        return "hover:text-primary";
    }

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 text-xs bg-background py-3 ${!atTop ? "backdrop-blur-sm shadow-sm" : ""}`}>
            <div className="w-[65%] mx-auto px-4">
                <div className="flex justify-between gap-5">
                    <div className="text-primary">
                        <Link to="/">A &amp; R</Link>
                    </div>
                    <div className="flex gap-5 text-muted-foreground">
                        {routes[0].children!
                            .filter(r => r.path)
                            .filter(r => r.handle?.label)
                            .map(({ path, handle }) => (
                                <NavLink className={linkClassNames} key={path} to={handle.navPath ?? path!}>{handle.label}</NavLink>
                            ))}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default TopNav;