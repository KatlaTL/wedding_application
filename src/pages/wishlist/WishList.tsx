import { Gift } from "lucide-react";
import PageTransition from "../../components/PageTransition"
import Section from "../../components/Section";
import StaggeredContent from "../../components/StaggeredContent"
import CategorySection from "./_components/CategorySection";
import useWishList from "../../hooks/useWishList";
import StaggeredItem from "../../components/StaggeredItem";
import CategoryTile from "./_components/CategoryTile";
import CategoryInfo from "./_components/CategoryInfo";

/**
 * WishList page component
 */
const WishList = () => {
    const { wishListCategories } = useWishList();

    return (
        <PageTransition>
            <StaggeredContent>
                <StaggeredItem>
                    <div className="relative top-25">
                        <Gift className="h-12 w-12 mx-auto relative text-primary" />
                    </div>
                </StaggeredItem>
                <Section title="Ønskeliste" description="Din tilstedeværelse er den største gave. Men hvis du har lyst til at bidrage til vores nye liv sammen, har vi samlet lidt ønsker her.">
                    <StaggeredItem>
                        <div className="flex flex-col gap-8 mt-10">
                            {wishListCategories.map(({ icon, items, title, description, totalClaimed }, index) => (
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
                            ))}
                        </div>

                        <CategoryInfo />
                    </StaggeredItem>
                </Section>
            </StaggeredContent>
        </PageTransition>
    )
}

export default WishList;