import { createBrowserRouter, Navigate } from "react-router-dom"
import Invitation from "./pages/Invitation/Invitation"
import Location from "./pages/location/Location"
import Program from "./pages/program/Program"
import Home from "./pages/home/Home"
import { invitationLoader } from "./loaders/invitationLoader"
import Layout from "./Layout"
import Wishlist from "./pages/wishlist/Wishlist"

export const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            { path: "/", element: <Home />, handle: { label: "Home" } },
            { path: "/program", element: <Program />, handle: { label: "Program" } },
            { path: "/location", element: <Location />, handle: { label: "Lokation" } },
            { path: "/invitation/:code?", element: <Invitation />, handle: { label: "Invitation", navPath: "/invitation" }, loader: invitationLoader },
            { path: "/wishlist", element: <Wishlist />, handle: { label: "Ønskeliste" } },
            { path: "*", element: <Navigate to="/" replace /> },
        ]
    }
])