import { Navigate, Route, Routes } from "react-router-dom"
import Invitation from "./pages/Invitation/Invitation"
import Location from "./pages/location/Location"
import Program from "./pages/program/Program"
import Home from "./pages/home/Home"
import TopNav from "./components/TopNav"

const App = () => {

  return (
    <div className="bg-background w-full h-full">

      <TopNav />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/program" element={<Program />} />
          <Route path="/location" element={<Location />} />
          <Route path="/invitation" element={<Invitation />} />
          <Route path="/invitation/:code?" element={<Invitation />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
