import type { LucideProps } from "lucide-react";

type InfoTilesProps = {
    text: string;
    icon?: React.ForwardRefExoticComponent<Omit<LucideProps, "ref">>
}

/**
 * InfoTiles component
 */
const InfoTiles: React.FC<InfoTilesProps> = ({ text, icon: Icon }) => {
    return (
        <div className="flex items-center gap-3 bg-white/90 backdrop-blur-sm px-5 py-3 rounded-full shadow-sm w-42 md:w-50">
            {Icon && <Icon className="h-5 w-5 text-primary" />}
            <span className="md:text-base text-[12px] text-color-text">{text}</span>
        </div>
    )
}

export default InfoTiles;