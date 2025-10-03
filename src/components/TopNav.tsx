import { useEffect, useRef, useState } from "react";
import { Link, NavLink, type NavLinkRenderProps } from "react-router-dom";
import { router } from "../router";
import Button from "./ui/Button";
import { Menu, X } from "lucide-react";
import { is } from "zod/locales";

/**
 * The top navigation component
 */
const TopNav = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [atTop, setAtTop] = useState<boolean>(false);
    const menuRef = useRef<HTMLDivElement | null>(null);
    const menuButtonRef = useRef<HTMLDivElement | null>(null);
    const routes = router.routes;

    useEffect(() => {
        const handleScroll = () => {
            setAtTop(window.scrollY <= 50)
        }

        window.addEventListener("scroll", handleScroll);

        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        /**
         * Check if the window screen width is the same as Tailwinds md: size
         */
        const checkWidth = () => {
            if (window.innerWidth >= 768) {
                setIsOpen(false);
            }
        }

        checkWidth();

        window.addEventListener("resize", checkWidth);

        return () => window.removeEventListener("resize", checkWidth);
    }, []);
    
    useEffect(() => {
        /**
         * Checks if the user clicks outside of the open menu or the menu button
         */
        const handleClickOutside = (e: MouseEvent) => {
            if ((menuRef.current && !menuRef.current.contains(e?.target as Node)) && (menuButtonRef.current && !menuButtonRef.current.contains(e?.target as Node))) {
                setIsOpen(false);
            }
        }

        window.addEventListener("mousedown", handleClickOutside);

        return () => window.removeEventListener("mousedown", handleClickOutside);

    }, []);

    const linkClassNames: ((props: NavLinkRenderProps) => string | undefined) | undefined = ({ isActive }) => {
        if (isActive) {
            return "text-primary";
        }
        return "hover:text-primary";
    }

    const navLinks = routes[0].children!
                            .filter(r => r.path)
                            .filter(r => r.handle?.label)
                            .map(({ path, handle }) => (
                                <NavLink className={linkClassNames} key={path} to={handle.navPath ?? path!}>{handle.label}</NavLink>
                            ));

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 text-xs bg-background pt-3 ${!atTop ? "backdrop-blur-sm shadow-sm" : ""} ${!isOpen && !atTop ? "pb-3" : ""}`}>
            <div className="w-full md:w-[65%] mx-auto px-4 transition-all duration-500">
                <div className="flex justify-between gap-5">
                    <div className="text-primary">
                        <Link to="/">A &amp; R</Link>
                    </div>

                    <div className="hidden md:flex gap-5 text-muted-foreground">
                        {navLinks}
                    </div>

                    <div className="md:hidden" ref={menuButtonRef}>
                        <Button variant="primary" size="small" className="border-none! w-6! h-6!" icon={isOpen ? X : Menu} onClick={() => setIsOpen(prev => !prev)} />
                    </div>
                </div>

            </div>
            {isOpen && (
                <div ref={menuRef} className={`md:hidden px-4 text-muted-foreground bg-background/80 mt-3 ${atTop ? "backdrop-blur-sm shadow-sm" : ""}`}>
                    <div className="border-t border-primary/30 flex flex-col gap-2 px-2 py-4">
                        {navLinks}
                    </div>
                </div>
            )}
        </nav>
    )
}

export default TopNav;