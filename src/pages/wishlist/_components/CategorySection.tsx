import type { CategorySectionType } from "../../../types/wishListTypes";
import { useEffect, useState, type PropsWithChildren } from "react";
import Button from "../../../components/ui/Button";
import { CircleCheckBig, ShoppingBag } from "lucide-react";
import useWishList from "../../../hooks/useWishList";

/**
 * CategorySection component used in the WishList component
 */
const CategorySection = ({ icon: Icon, title, description, totalClaimed, children }: PropsWithChildren<CategorySectionType>) => {
    const [claimed, setClaimed] = useState<boolean>(false);
    const { saveClaimedCategory, removeClaimedCategory, claimedCategories, actionDispatch } = useWishList();

    useEffect(() => {
        claimedCategories.forEach(categoryName => {
            if (categoryName === title) {
                setClaimed(true);
            }
        })
    }, [claimedCategories])

    const getClaimedStatus = (totalClaimed: number): { label: string, style: string } => {
        if (totalClaimed === 0) {
            return {
                label: "Tilgængelig",
                style: "bg-secondary text-color-text border-secondary/40"
            }
        }

        if (totalClaimed <= 3) {
            return {
                label: `Valgt af ${totalClaimed} gæster`,
                style: "bg-tertiary text-color-text border-tertiary/40"
            }
        }

        return {
            label: `Valgt af ${totalClaimed} gæster`,
            style: "bg-primary text-background border-primary/70"
        }
    }

    const handleClaimClick = (categoryName: string) => {
        if (!claimed) {
            saveClaimedCategory(categoryName);
            actionDispatch?.setClamiedCategory(categoryName);
        } else {
            removeClaimedCategory(categoryName);
            actionDispatch?.removeClamiedCategory(categoryName);
        }

        setClaimed(prev => !prev);
    }

    const claimedStatus = getClaimedStatus(totalClaimed);

    return (
        <div className="rounded-lg border border-primary-30 bg-gradient-to-br from-primary/10 to-primary/5 p-5 mx-5 md:mx-0">
            <div className="flex text-left gap-2 justify-between">
                <div className="flex gap-2">
                    <div className="flex bg-primary/15 w-10 h-10 rounded-lg justify-center items-center self-center">
                        <Icon className="w-6 h-6 text-primary" />
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col">
                            <h3 className="text-base">{title}</h3>

                            <p>{description}</p>
                        </div>

                        <span className={`inline-flex w-max h-5 rounded-lg border mt-0.5 px-1.5 items-center text-[9px] transition-colors ${claimedStatus.style}`}>{claimedStatus.label}</span>
                    </div>
                </div>

                <div>
                    <Button variant={`${claimed ? "secondary" : "tertiary"}`} size="small" className="transition-all duration-300 ease-in-out px-2" icon={claimed ? CircleCheckBig : ShoppingBag} iconGap={1.5} onClick={() => handleClaimClick(title)}>
                        {claimed ? "Valgt" : "Vælg kategori"}
                    </Button>

                </div>
            </div>

            <div className="grid md:grid-cols-3 xs:grid-cols-2 gap-3 mt-5">
                {children}
            </div>
        </div >
    )
}

export default CategorySection;