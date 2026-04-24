import { iconMap, type IconKey } from "../../lib/icons/iconMap";

const Icon = ({
    name,
    className,
}: {
    name: IconKey;
    className?: string;
}) => {
    const Component = iconMap[name];

    if (!Component) return null;

    return <Component className={className} />;
}

export default Icon;