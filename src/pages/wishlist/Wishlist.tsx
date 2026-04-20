import { Gift } from "lucide-react";
import PageTransition from "../../components/PageTransition"
import Section from "../../components/Section";
import StaggeredContent from "../../components/StaggeredContent"
import CategorySection from "./_components/CategorySection";
import StaggeredItem from "../../components/StaggeredItem";
import CategoryTile from "./_components/CategoryTile";
import CategoryInfo from "./_components/CategoryInfo";
import Loader from "../../components/ui/Loader";
import useWishlist from "../../hooks/useWishlist";

/**
 * WishList page component
 */
const WishList = () => {
    const { categories, isLoading } = useWishlist();

    return (
        <PageTransition>
            <StaggeredContent>
                <StaggeredItem>
                    <div className="relative top-25">
                        <div className="flex mx-auto rounded-full w-14 h-14 bg-primary/10 justify-center items-center">
                            <Gift className="h-8 w-8 mx-auto relative text-primary" />
                        </div>
                    </div>
                </StaggeredItem>
                <Section title="Ønskeliste" description="Din tilstedeværelse er den største gave. Men hvis du har lyst til at bidrage til vores nye liv sammen, har vi samlet lidt ønsker her.">
                    <StaggeredItem>
                        <div className="flex flex-col gap-8 mt-10">
                            {isLoading ? (
                                <Loader />
                            ) : (
                                categories.map(({ icon, items, title, description, totalClaimed }, index) => (
                                    <CategorySection
                                        icon={icon}
                                        title={title}
                                        description={description}
                                        totalClaimed={totalClaimed}
                                        key={title + index}
                                    >
                                        {items.map(({ title, description, link }, index) => (
                                            <CategoryTile title={title} description={description} link={link} key={title + index} />
                                        ))}
                                    </CategorySection>
                                ))
                            )}
                        </div>

                        <CategoryInfo />
                    </StaggeredItem>
                </Section>
            </StaggeredContent>
        </PageTransition>
    )
}

export default WishList;