import PageTransition from "../../components/PageTransition";
import Details from "./_components/Details";
import Hero from "./_components/Hero";

const Home = () => {
    return (
        <PageTransition>
            <section id="hero">
                <Hero />
            </section>

            <section id="details">
                <Details />
            </section>
        </PageTransition>
    )
}

export default Home;