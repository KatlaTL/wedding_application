import { createBrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom"
import Invitation from "./pages/Invitation/Invitation"
import Location from "./pages/location/Location"
import Program from "./pages/program/Program"
import Home from "./pages/home/Home"
import TopNav from "./components/TopNav"
import { invitationLoader } from "./loaders/invitationLoader"

export const router = createBrowserRouter([
    {
        element: (
            <div className="bg-background w-full h-full">
                <TopNav />
                <main>
                    <Outlet />
                </main>
            </div>
        ),
        children: [
            { path: "/", element: <Home /> },
            { path: "/program", element: <Program /> },
            { path: "/location", element: <Location /> },
            { path: "/invitation", element: <Invitation /> },
            { path: "/invitation/:code?", element: <Invitation /> , loader: invitationLoader},
            { path: "*", element: <Navigate to="/" replace /> },
        ]
    }
])