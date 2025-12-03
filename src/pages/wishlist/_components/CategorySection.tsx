import type { CategorySectionType } from "../../../types/wishListTypes";
import { type PropsWithChildren } from "react";

/**
 * CategorySection component used in the WishList component
 */
const CategorySection = ({ icon: Icon, title, description, children }: PropsWithChildren<CategorySectionType>) => {
    return (
        <div className="w-full rounded-lg border border-primary-30 bg-gradient-to-br from-primary/10 to-primary/5 p-5">
            <div className="flex text-left gap-2">
                <div className="flex bg-primary/15 w-10 h-10 rounded-lg justify-center items-center">
                    <Icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex flex-col">
                    <h3 className="text-base">{title}</h3>
                    <p>{description}</p>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mt-5">
                {children}
            </div>
        </div>
    )
}

export default CategorySection;