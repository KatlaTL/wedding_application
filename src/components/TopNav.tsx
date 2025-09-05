import { Link, NavLink, type NavLinkRenderProps } from "react-router-dom"

const TopNav = () => {

    const linkClassNames: ((props: NavLinkRenderProps) => string | undefined) | undefined = ({ isActive }) => {
        if (isActive) {
            return "text-primary";
        }
        return "hover:text-primary";
    }

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 text-xs bg-background backdrop-blur-sm shadow-sm py-3">
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