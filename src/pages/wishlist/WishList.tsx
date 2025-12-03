import { Coffee, Gift, Heart, Tag } from "lucide-react";
import PageTransition from "../../components/PageTransition"
import Section from "../../components/Section";
import StaggeredContent from "../../components/StaggeredContent"
import CategorySection from "./_components/CategorySection";
import useWishList from "../../hooks/useWishList";
import PriorityTile from "./_components/PriorityTile";
import Button from "../../components/ui/Button";
import HidePriorityToggle from "./_components/HidePriorityToggle";
import StaggeredItem from "../../components/StaggeredItem";
import CategoryTile from "./_components/CategoryTile";

/**
 * WishList page component
 */
const WishList = () => {
    const categories = useWishList();

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
                        <HidePriorityToggle>
                            {(hide, toggle) => (
                                <>
                                    <div className="w-40 mx-auto mt-3">
                                        <Button variant="tertiary" size="small" icon={Tag} onClick={toggle}>Skjul prioritetstags</Button>
                                    </div>

                                    <div className="flex flex-col gap-8 mt-10">
                                        {categories.map(({ icon, items, title, description }) => (
                                            <CategorySection
                                                icon={icon}
                                                title={title}
                                                description={description}
                                            >
                                                {items.map(({ title, description, priority }) => (
                                                    <CategoryTile title={title} description={description} priority={priority} showPriority={hide} />
                                                ))}
                                            </CategorySection>

                                        ))}
                                    </div>

                                    {hide && (
                                        <div className="grid grid-cols-3 gap-3 mt-8">
                                            <PriorityTile icon={Gift} title="Essential" description="Ting vi virkelig har brug" />
                                            <PriorityTile icon={Heart} title="Nice to Have" description="Ville gøre vores hverdag mere behagelig" />
                                            <PriorityTile icon={Coffee} title="Dream Gift" description="Små forkælelser, vi ville elske" />
                                        </div>
                                    )}
                                </>
                            )}
                        </HidePriorityToggle>
                    </StaggeredItem>
                </Section>
            </StaggeredContent>
        </PageTransition>
    )
}

export default WishList;