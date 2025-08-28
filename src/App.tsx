import Details from "./pages/Details"
import Hero from "./pages/home/Hero"
import Location from "./pages/location/Location"
import Program from "./pages/program/Program"

const App = () => {

  return (
    <div className="bg-background w-full h-full">
      <main>
        <section id="hero">
          <Hero />
        </section>

        <section id="details">
          <Details />
        </section>

        <section id="program">
          <Program />
        </section>

        <section id="location">
          <Location />
        </section>
      </main>
    </div>
  )
}

export default App
