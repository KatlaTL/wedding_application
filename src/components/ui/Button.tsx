import { LoaderIcon, type LucideProps } from "lucide-react";
import type { ButtonHTMLAttributes } from "react";
import type { IconType } from "react-icons/lib";
import { twMerge } from "tailwind-merge";

export type ButtonVariant = "primary" | "secondary" | "secondary-no-hover" | "destructive" | "tertiary" | "plain" | "tab" | "ghost";
interface ButtoneProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: "small" | "medium" | "large";
    icon?: React.ForwardRefExoticComponent<Omit<LucideProps, "ref">> | IconType | null;
    iconStyle?: string;
    iconGap?: number;
    isLoading?: boolean;
    loadingText?: string;
}

/**
 * Button component to ensure consistent style
 * @param variant - Takes 4 different variants as plain text: "primary" | "secondary" | "secondary-no-hover" | "destructive" | "tertiary" | "plain" | "tab" | "ghost". Default variant is primary
 * @param size - Takes 3 different sizes as plain text: "small" | "medium" | "large". Default size is medium. If variant is ghost size will always be set to small
 * @param icon - Accepts only a lucide-react icon
 * @param iconStyle - Accepts Tailwindcss styling
 * @param iconGap - The distance between the icon and the tekst. Default is tailwind gap-3
 * @param isLoading - Displays a spinner in the button if true
 * @param loadingText - Displays a text in the button if isLoading is true
 */
const Button: React.FC<ButtoneProps> = ({
    children,
    variant = "primary",
    size = "medium",
    className = "",
    icon: Icon,
    iconStyle: iconStyleProp = "",
    iconGap = 3,
    isLoading = false,
    loadingText = "",
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
        case "plain":
            variantStyle = "text-gray-900 font-medium bg-white hover:bg-gray-50 active:bg-gray-100 !border-black/20";
            break;
        case "tab":
            variantStyle = "bg-transparent !border-none !rounded-full hover:bg-white my-1";
            break;
        case "ghost":
            variantStyle = "bg-transparent !border-none hover:bg-gray-300/80 rounded-lg active:bg-gray-400/80 !w-8 !h-8";
            break;
    }

    let sizeStyle = "";

    switch (size) {
        case "small":
            sizeStyle = "h-8 text-sm";
            break;
        case "medium":
            sizeStyle = "h-10 text-base";
            break;
        case "large":
            sizeStyle = "h-12 text-lg";
            break;
    }

    const buttonIconStyle = Icon ? `flex items-center justify-center gap-${iconGap}` : "";

    const iconStyle = variant === "plain" ? "h-[16px] w-[16px] mb-[0.5px]" : "h-[14px] w-[14px] mb-[0.5px]";

    return (
        <button
            className={twMerge(`${baseStyle} ${variantStyle} ${sizeStyle} ${buttonIconStyle}`, className)}
            {...props}
        >
            {Icon &&
                <span>
                    <Icon className={`${iconStyle} ${iconStyleProp}`} />
                </span>
            }

            {isLoading ? (
                <>
                    {loadingText}
                    <LoaderIcon className="animate-spin" style={{ animation: "spin 2.5s linear infinite" }} />
                </>
            ) :
                children
            }
        </button>
    )
}

export default Button;