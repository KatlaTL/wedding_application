import { Calendar, MapPin } from "lucide-react";
import Button from "../components/button";

const Hero = () => {

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">

            <div className="relative text-center max-w-4xl mx-auto">
                <h1 className="text-primary text-4xl font-serif tracking-wide">Asger &amp; Rikke</h1>
                <p className="text-xl text-color-text opacity-70 m-3">Vi skal giftes!</p>

                <div className="flex items-center justify-center gap-6 mb-8 mt-6">
                    <div className="flex items-center gap-3 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-sm w-50">
                        <Calendar className="h-5 w-5 text-primary" />
                        <span className="text-base text-color-text">22 August, 2026</span>
                    </div>

                    <div className="flex items-center gap-3 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-sm w-50">
                        <MapPin className="h-5 w-5 text-primary" />
                        <span className="text-base text-color-text">Køng kirke, fyn</span>
                    </div>
                </div>
            </div>

            <div className="relative text-center max-w-4xl mx-auto">
                <div className="w-70 flex-col items-center justify-center">
                    <p className="text-sm text-color-text mb-2">Vi glæder os til at se dig! <br/> Klik nedenfor for at bekræfte din deltagelse.</p>

                    <Button
                        size="medium"
                        variant="secondary"
                    >
                        Bekræft deltagelse
                    </Button>
                </div>
            </div>


        </section>
    )
}

export default Hero;