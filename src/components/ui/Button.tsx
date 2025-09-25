import type { LucideProps } from "lucide-react";
import type { ButtonHTMLAttributes } from "react";

export type ButtonVariant = "primary" | "secondary" | "secondary-no-hover" | "destructive";
interface ButtoneProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: "small" | "medium" | "large";
    icon?: React.ForwardRefExoticComponent<Omit<LucideProps, "ref">>;
}

const Button: React.FC<ButtoneProps> = ({
    children,
    variant = "primary",
    size = "medium",
    className = "",
    icon: Icon,
    ...props
}) => {

    const baseStyle = "w-full rounded-lg bg-background border border-primary hover:cursor-pointer outline-none disabled:pointer-events-none disabled:opacity-50 ";

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
            variantStyle = "bg-destructive  text-white"
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

    const buttonIconStyle = Icon ? "flex items-center justify-center gap-3" : "";

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

            {children}
        </button>
    )
}

export default Button;