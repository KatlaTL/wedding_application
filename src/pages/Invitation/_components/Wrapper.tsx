
type WrapperType = {
    className?: string;
}

const Wrapper = ({ className = "", children }: React.PropsWithChildren<WrapperType>) => {

    return (
        <div className={`flex flex-col gap-1 w-full ${className}`}>
            {children}
        </div>
    )
}

export default Wrapper;