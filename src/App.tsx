import { Route, Routes } from "react-router-dom"
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
          <Route path="/" Component={Home} />
          <Route path="/program" Component={Program} />
          <Route path="/location" Component={Location} />
          <Route path="/invitation" Component={Invitation} />
        </Routes>
      </main>
    </div>
  )
}

export default App
