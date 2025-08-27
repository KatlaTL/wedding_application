import type { LucideProps } from "lucide-react";

type InfoTilesProps = {
    text: string;
    icon?: React.ForwardRefExoticComponent<Omit<LucideProps, "ref">>
}

const InfoTiles: React.FC<InfoTilesProps> = ({ text, icon: Icon }) => {

    return (
        <div className="flex items-center gap-3 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-sm w-50">
            {Icon && <Icon className="h-5 w-5 text-primary" />}
            <span className="text-base text-color-text">{text}</span>
        </div>
    )
}

export default InfoTiles;