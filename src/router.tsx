import { createBrowserRouter, Navigate } from "react-router-dom"
import Invitation from "./pages/Invitation/Invitation"
import Location from "./pages/location/Location"
import Program from "./pages/program/Program"
import Home from "./pages/home/Home"
import { invitationLoader } from "./loaders/invitationLoader"
import Layout from "./Layout"
import Wishlist from "./pages/wishlist/Wishlist"
import { wishlistLoader } from "./loaders/wishlistLoader"
import { programLoader } from "./loaders/programLoader"
import { locationLoader } from "./loaders/locationLoader"
import AdminGoogleSignIn from "./pages/admin/_components/AdminGoogleSignIn"
import AdminDashboard from "./pages/admin/_components/AdminDashboard"
import { adminLoader } from "./loaders/adminLoader"
import AdminLayout from "./pages/admin/AdminLayout"

export const router = createBrowserRouter([
    {
        element: <Layout />,
        HydrateFallback: () => <div>Loading…</div>, //TO-DO Make proper fallback component
        children: [
            { path: "/", element: <Home />, handle: { label: "Home" } },
            { path: "/program", element: <Program />, handle: { label: "Program" }, loader: programLoader },
            { path: "/location", element: <Location />, handle: { label: "Lokation" }, loader: locationLoader },
            { path: "/invitation/:guestCode?", element: <Invitation />, handle: { label: "Invitation", navPath: "/invitation" }, loader: invitationLoader },
            { path: "/wishlist", element: <Wishlist />, handle: { label: "Ønskeliste" }, loader: wishlistLoader },
            {
                path: "/admin", element: <AdminLayout />, handle: { label: "Admin Panel" }, loader: adminLoader, children: [
                    { index: true, element: <AdminDashboard /> }, //TO-DO remove label to exclude it from the main menu
                ]
            },
            { path: "/admin/login", element: <AdminGoogleSignIn /> },
            { path: "*", element: <Navigate to="/" replace /> },
        ]
    }
])