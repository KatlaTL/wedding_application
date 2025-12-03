import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from 'framer-motion';
import { Link, NavLink, useLocation, type NavLinkRenderProps } from "react-router-dom";
import { router } from "../router";
import Button from "./ui/Button";
import { Menu, X } from "lucide-react";
import useIsAtTop from "../hooks/utils/useIsAtTop";
import useClickOutside from "../hooks/utils/useClickOutside";
import useTailwindMediaQuery from "../hooks/utils/useTailwindMediaQuery";

/**
 * The top navigation component
 */
const TopNav = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const isAtTop = useIsAtTop(50);
    const location = useLocation();

    const menuRef = useRef<HTMLDivElement | null>(null);
    const menuButtonRef = useRef<HTMLDivElement | null>(null);

    useClickOutside([menuRef, menuButtonRef], () => setIsOpen(false));

    useTailwindMediaQuery("md", () => setIsOpen(false));

    const routes = router.routes;

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
            <li key={path}><NavLink className={linkClassNames} key={path} to={handle.navPath ?? path!}>{handle.label}</NavLink></li>
        ));

    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 text-xs bg-background pt-3 ${!isAtTop ? "backdrop-blur-sm shadow-sm" : ""} ${!isOpen && !isAtTop ? "pb-3" : ""}`}>
            <div className="w-full md:w-[65%] mx-auto px-4 transition-all duration-500">
                <div className="flex justify-between gap-5">
                    <div className="text-primary">
                        <Link to="/">A &amp; R</Link>
                    </div>

                    <ul className="hidden md:flex gap-5 text-muted-foreground">
                        {navLinks}
                    </ul>

                    <div className="md:hidden" ref={menuButtonRef}>
                        <Button variant="primary" size="small" className="border-none! w-6! h-6!" icon={isOpen ? X : Menu} onClick={() => setIsOpen(prev => !prev)} />
                    </div>
                </div>

            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0.5 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0.5 }}
                        style={{ overflow: "hidden" }}
                        transition={{ duration: 0.2 }}
                        ref={menuRef}
                        className={`md:hidden px-4 text-muted-foreground bg-background/80 mt-3 ${isAtTop ? "backdrop-blur-sm shadow-sm" : ""}`}
                    >
                        <ul className="border-t border-primary/30 flex flex-col gap-2 px-2 py-4">
                            {navLinks}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}

export default TopNav;