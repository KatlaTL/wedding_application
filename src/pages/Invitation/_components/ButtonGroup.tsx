type ButtonGroupType = {
    title: string;
    className?: string;
}

const ButtonGroup = ({ title, className = "", children }: React.PropsWithChildren<ButtonGroupType>) => {
    return (
        <div className={className}>
            <p className="!text-color-text pb-1">{title}</p>
            <div className="flex gap-2">
                {children}
            </div>
        </div>
    )
}

export default ButtonGroup;