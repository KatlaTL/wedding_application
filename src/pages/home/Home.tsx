import PageTransition from "../../components/PageTransition";
import StaggeredContent from "../../components/StaggeredContent";
import Details from "./_components/Details";
import Hero from "./_components/Hero";

const Home = () => {
    return (
        <PageTransition>
            <StaggeredContent>
                <section id="hero">
                    <Hero />
                </section>
                <section id="details">
                    <Details />
                </section>
            </StaggeredContent>
        </PageTransition>
    )
}

export default Home;