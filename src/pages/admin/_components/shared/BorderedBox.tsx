import type { PropsWithChildren } from "react";

const BorderedBox = ({ children }: PropsWithChildren) => {
    return (
        <div className="bg-background-muted rounded-lg border-primary-30 border p-5 mb-5 xs:mx-auto mx-5 md:mx-0">
            {children}
        </div>
    )
}

export default BorderedBox;