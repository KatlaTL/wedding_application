import type { PropsWithChildren } from "react";
import StaggeredItem from "./StaggeredItem";

type SectionType = {
    title?: string;
    description?: string;
}

/**
 * Section component to ensure consistent style
 * @param title - Page title
 * @param description - Page sub title
 */
const Section = ({ title, description, children }: PropsWithChildren<SectionType>) => {
    return (
        <section className="relative min-h-screen flex flex-col py-30 overflow-hidden">

            <div className="max-w-3xl mx-auto text-center">
                {/* Animate the title and description if the Section component is wrapped in a StaggeredContent component */}
                <StaggeredItem className="flex flex-col">
                    {title && <h2 className="mb-3">{title}</h2>}
                    {description && <p className="!text-sm mb-3 self-center max-w-130">{description}</p>}
                </StaggeredItem>

                {children}
            </div>
        </section>
    )
}

export default Section;