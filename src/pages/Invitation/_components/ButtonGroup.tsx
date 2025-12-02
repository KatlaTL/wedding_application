type ButtonGroupType = {
    title?: string;
    className?: string;
}

/**
 * ButtonGroup component to ensure consistent style in the invitation form
 */
const ButtonGroup = ({ title, className = "", children }: React.PropsWithChildren<ButtonGroupType>) => {
    return (
        <div className={className}>
            {title && <p className="!text-color-text pb-1">{title}</p>}
            <div className="flex flex-col xs:flex-row gap-2">
                {children}
            </div>
        </div>
    )
}

export default ButtonGroup;