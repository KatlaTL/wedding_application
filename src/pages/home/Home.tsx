import PageTransition from "../../components/PageTransition";
import StaggeredContent from "../../components/StaggeredContent";
import Hero from "./_components/Hero";

/**
 * Home page component
 */
const Home = () => {
    return (
        <PageTransition>
            <StaggeredContent>
                <section id="hero">
                    <Hero />
                </section>
            </StaggeredContent>
        </PageTransition>
    )
}

export default Home;