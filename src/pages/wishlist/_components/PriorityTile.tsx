import type { PriorityTileType, PriorityType } from "../../../types/wishListTypes";

/**
 * PriorityTile component used in WishList component
 */
const PriorityTile = ({ description, title, icon: Icon }: PriorityTileType) => {

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
        <div className="flex justify-center w-full rounded-lg border border-primary-30 bg-gradient-to-br from-primary/10 to-primary/5 p-5">
            <div className="flex flex-col justify-center items-center gap-2">
                <div className={`flex w-8 h-8 rounded-full justify-center items-center ${priorityStyle(title)}`}>
                    <Icon className="w-4.5 h-4.5 text-current" />
                </div>
                <h4 className="text-[10px] text-color-text">{title}</h4>
                <p className="text-[10px]">{description}</p>
            </div>
        </div>
    )
}

export default PriorityTile;