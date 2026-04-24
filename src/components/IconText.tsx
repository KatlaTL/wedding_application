import { type LucideProps } from "lucide-react";
import { twMerge } from "tailwind-merge";


type IconTextType = {
    text: string;
    tailwindColor?: string;
    icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref">>;
    onClick?: () => void;
    className?: string;
}

/**
 * Shared component used to display an icon and the text next to it
 */
const IconText = ({ text, tailwindColor = "!text-primary", icon: Icon, onClick, className = "" }: IconTextType) => {

    return (
        <div className={twMerge(`flex items-start gap-1.5 ${tailwindColor} ${onClick ? "cursor-pointer" : ""}`, className)} onClick={onClick}>
            <span>
                <Icon className="h-3.5 w-3.5 mt-0.5" />
            </span>
            <p className={`text-base leading-none ${tailwindColor}`}>{text}</p>
        </div>
    )
}

export default IconText;