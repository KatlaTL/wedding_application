
type WrapperType = {
    className?: string;
}

/**
 * Wrapper component to ensure consistent style in the invitation form
 */
const Wrapper = ({ className = "", children }: React.PropsWithChildren<WrapperType>) => {
    return (
        <div className={`flex flex-col gap-1 w-full ${className}`}>
            {children}
        </div>
    )
}

export default Wrapper;