import { useEffect, useState } from "react";
import { Link, NavLink, type NavLinkRenderProps } from "react-router-dom"

/**
 * The top navigation component
 */
const TopNav = () => {
    const [atTop, setAtTop] = useState<boolean>(false);

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
                        <NavLink className={linkClassNames} to="/">Home</NavLink>
                        <NavLink className={linkClassNames} to="/program">Program</NavLink>
                        <NavLink className={linkClassNames} to="/location">Lokation</NavLink>
                        <NavLink className={linkClassNames} to="/invitation">Invitation</NavLink>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default TopNav;