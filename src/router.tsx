import { createBrowserRouter, Navigate } from "react-router-dom"
import Invitation from "./pages/Invitation/Invitation"
import Location from "./pages/location/Location"
import Program from "./pages/program/Program"
import Home from "./pages/home/Home"
import { invitationLoader } from "./loaders/invitationLoader"
import Layout from "./Layout"

export const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/program", element: <Program /> },
            { path: "/location", element: <Location /> },
            { path: "/invitation", element: <Invitation /> },
            { path: "/invitation/:code?", element: <Invitation />, loader: invitationLoader },
            { path: "*", element: <Navigate to="/" replace /> },
        ]
    }
])