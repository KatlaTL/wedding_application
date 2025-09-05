import Details from "./_components/Details";
import Hero from "./_components/Hero";

const Home = () => {
    return (
        <>
            <section id="hero">
                <Hero />
            </section>

            <section id="details">
                <Details />
            </section>
        </>
    )
}

export default Home;