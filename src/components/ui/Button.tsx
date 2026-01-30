import { LoaderIcon, type LucideProps } from "lucide-react";
import type { ButtonHTMLAttributes } from "react";

export type ButtonVariant = "primary" | "secondary" | "secondary-no-hover" | "destructive" | "tertiary";
interface ButtoneProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: "small" | "medium" | "large";
    icon?: React.ForwardRefExoticComponent<Omit<LucideProps, "ref">> | null;
    iconGap?: number;
    isLoading?: boolean;
}

/**
 * Button component to ensure consistent style
 * @param variant - Takes 4 different variants as plain text: "primary" | "secondary" | "secondary-no-hover" | "destructive" | "tertiary". Default variant is primary
 * @param size - Takes 3 different sizes as plain text: "small" | "medium" | "large". Default size is medium
 * @param icon - Accepts only a lucide-react icon
 * @param iconGap - The distance between the icon and the tekst. Default is tailwind gap-3
 */
const Button: React.FC<ButtoneProps> = ({
    children,
    variant = "primary",
    size = "medium",
    className = "",
    icon: Icon,
    iconGap = 3,
    isLoading = false,
    ...props
}) => {

    const baseStyle = "flex items-center justify-center mx-auto w-full rounded-lg bg-background border border-primary hover:cursor-pointer outline-none disabled:pointer-events-none disabled:opacity-50 transition-colors";

    let variantStyle = "";

    switch (variant) {
        case "primary":
            variantStyle = "text-color-text hover:bg-tertiary/90 hover:border-[var(--color-tertiary)]!";
            break;
        case "secondary":
            variantStyle = "bg-primary hover:text-primary/90 hover:bg-background text-background hover:shadow-lg active:shadow-none";
            break;
        case "secondary-no-hover":
            variantStyle = "bg-primary text-background";
            break;
        case "destructive":
            variantStyle = "bg-destructive text-white"
            break;
        case "tertiary":
            variantStyle = "text-primary bg-white hover:bg-primary hover:text-white !border-primary/50";
            break;
    }

    let sizeStyle = "";

    switch (size) {
        case "small":
            sizeStyle = "h-6 text-xs";
            break;
        case "medium":
            sizeStyle = "h-8 text-sm";
            break;
        case "large":
            sizeStyle = "h-10 text-lg";
            break;
    }

    const buttonIconStyle = Icon ? `flex items-center justify-center gap-${iconGap}` : "";

    const iconStyle = variant === "primary"
        ? "h-[11px] w-[11px] mb-[0.5px]"
        : "h-[11px] w-[11px] mb-[0.5px]";

    return (
        <button
            className={`${baseStyle} ${variantStyle} ${sizeStyle} ${buttonIconStyle} ${className}`}
            {...props}
        >
            {Icon &&
                <span>
                    <Icon className={iconStyle} />
                </span>
            }

            {isLoading ? <LoaderIcon className="animate-spin" style={{ animation: "spin 2.5s linear infinite" }} /> : children}
        </button>
    )
}

export default Button;