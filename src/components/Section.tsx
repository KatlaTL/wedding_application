
type SectionType = React.PropsWithChildren<{
    title: string;
}>

const Section: React.FC<SectionType> = ({ title, children }) => {
    return (
        <section className="relative min-h-screen flex flex-col py-20 px-4 overflow-hidden">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-primary text-2xl font-serif tracking-wide">{title}</h2>

                {children}
            </div>
        </section>
    )
}

export default Section;