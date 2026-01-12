import type { CategoryTileType } from "../../../types/wishListTypes";
import { ExternalLink } from "lucide-react";

/**
 * Component used in CategoryTile
 */
const CategoryTile = ({ title, description, link }: CategoryTileType) => {

    return (
        <div className="flex flex-col px-5 rounded-lg py-3 bg-white/90 w-full h-20 justify-between text-left">
            <div className="flex relative">
                <h4 className="text-color-text text-xs">{title}</h4>


                <div className={`absolute right-0 rounded-lg py-1 px-2 text-[7px] text-current ${link ? "bg-primary text-white hover:bg-primary/90 " : "bg-muted/50 text-muted-foreground border border-muted-foreground/20"}`}>
                    {link ? (
                        <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer nofollow"
                            className="flex items-center gap-1.5"
                        >
                            Eksternt link
                            <ExternalLink className="h-3 w-3"/>
                        </a>
                    ) : (
                        <span>Valgfri gave</span>
                    )}
                </div>

            </div>
            <p className="text-[10px]">{description}</p>
        </div >
    )
}

export default CategoryTile;