import type { CategoryTileType } from "../../../types/wishlistTypes";
import { ExternalLink } from "lucide-react";

/**
 * Component used in CategoryTile
 */
const CategoryTile = ({ title, description, link }: CategoryTileType) => {

    return (
        <div className="flex flex-col px-5 rounded-lg py-3 bg-white/90 w-full h-25 justify-between text-left">
            <div className="flex relative">
                <h4 className="text-color-text text-base">{title}</h4>


                <div className={`absolute right-0 rounded-lg py-1 px-2 text-[7px] text-current ${link ? "bg-primary/90 hover:bg-primary" : "bg-muted/50 text-muted-foreground border border-muted-foreground/20"}`}>
                    {link ? (
                        <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer nofollow"
                            className="flex items-center gap-1.5 text-background text-[10px]"
                        >
                            Eksternt link
                            <ExternalLink className="h-3.5 w-3.5"/>
                        </a>
                    ) : (
                        <span>Valgfri gave</span>
                    )}
                </div>

            </div>
            <p className="text-xs">{description}</p>
        </div >
    )
}

export default CategoryTile;