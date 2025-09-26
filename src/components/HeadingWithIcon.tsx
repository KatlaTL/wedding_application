import type { LucideProps } from "lucide-react";

type HeadingWithIconType = {
    icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref">>;
    text: string;
    className?: string;
}

/**
 * Component to display a h3 title with an icon next to it
 * @param text - Title text
 * @param icon - Accepts only a lucide-react icon
 */
const HeadingWithIcon = ({ icon: Icon, text, className = "" }: HeadingWithIconType) => {
    return (
        <div className={`flex gap-1.5 ${className}`}>
            <Icon className="h-3.5 w-3.5 text-primary" />
            <h3>{text}</h3>
        </div>
    )
}

export default HeadingWithIcon;