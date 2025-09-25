import { Calendar, MapPin } from "lucide-react";
import InfoTiles from "./InfoTiles";
import Button from "../../../components/ui/Button";


const Hero = () => {

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">

            <div className="relative text-center max-w-4xl mx-auto">
                <h1>Asger &amp; Rikke</h1>
                <p className="!text-xl m-3">Vi skal giftes!</p>

                <div className="flex items-center justify-center gap-6 mb-8 mt-6">
                    <InfoTiles text="22 August, 2026" icon={Calendar}/>

                    <InfoTiles text="Køng kirke, Fyn" icon={MapPin}/>
                </div>
            </div>

            <div className="relative text-center max-w-4xl mx-auto">
                <div className="w-70 flex-col items-center justify-center">
                    <p className="!text-sm  mb-2">Vi glæder os til at se dig! <br/> Klik nedenfor for at bekræfte din deltagelse.</p>

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