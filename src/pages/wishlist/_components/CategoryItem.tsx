import type { CategoryItemType, PriorityType } from "../../../types/wishListTypes";

/**
 * Component used in CategoryTile
 */
const CategoryItem = ({ title, description, priority, showPriority }: CategoryItemType) => {

    const priorityStyle = (priority: PriorityType): string => {
        switch (priority) {
            case "Essential":
                return "bg-primary text-white";
            case "Nice to Have":
                return "bg-tertiary text-color-text";
            case "Dream Gift":
                return "bg-secondary text-color-text";
        }
    }

    return (
        <div className="flex flex-col px-5 rounded-lg py-3 bg-white/90 w-full h-20 justify-between text-left">
            <div className="flex relative">
                <h4 className="text-color-text text-xs">{title}</h4>

                {showPriority && (
                    <div className={`absolute right-0 rounded-lg py-1 px-2 ${priorityStyle(priority)}`}>
                        <p className="text-[7px] text-current">{priority}</p>
                    </div>
                )}

            </div>
            <p className="text-[10px]">{description}</p>
        </div>
    )
}

export default CategoryItem;