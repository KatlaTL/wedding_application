/**
 * Footer component
 */
const Footer = () => {
    return (
        <footer className="py-8 px-4 bg-primary/10 border-t border-primary-30  ">
            <div className="flex flex-col mx-auto text-center gap-2">
                <h3 className="text-2xl">Vi glæder os til at dig!</h3>
                <p>Spørgsmål? Skriv til os på {" "}
                    <a href="mailto:sarah.alex.wedding@email.com" className="text-primary hover:underline">asger.rikke.bryllup@gmail.dk</a>
                </p>
            </div>
        </footer>
    )
}

export default Footer;