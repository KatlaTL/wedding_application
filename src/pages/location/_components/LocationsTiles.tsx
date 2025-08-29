import { Clock, MapPin } from "lucide-react"
import Button from "../../../components/Button"


const LocationTiles = () => {
    return (
        <div className="bg-background-muted rounded-lg border-primary/30 border hover:shadow-lg h-fit">
            <div className="min-h-20 h-[40%] bg-gradient-to-br from-white/20 to-primary/20 flex justify-center items-center">
                {/* Placeholder for image */}
                <MapPin className="text-primary/70 h-8 w-8" />
            </div>

            <div className="flex flex-col items-start text-left text-xs text-muted-foreground p-5">
                <div className="flex justify-between w-full">
                    <h3 className="text-primary pb-5">Køng Kirke</h3>

                    <div className="flex items-start gap-1.5 text-primary">
                        <span>
                            <Clock className="h-[11px] w-[11px] mt-[3px]" />
                        </span>
                        <p className="!text-primary">Kl. 12:30</p>
                    </div>
                </div>
                <p className="pb-3">Køng kirke er der hvor Rikke er konfirmeret og ligger ved siden af Rikkes barndomshjem</p>

                <p className="pb-3">Bodebjergvej 2, 5620 Glamsbjerg</p>

                <Button size="small" className="flex justify-center items-center gap-2">
                    <span>
                        <MapPin className="text-color-text h-[11px] w-[11px] mt-[1px]" />
                    </span>
                    Se på kortet
                </Button>
            </div>

        </div>
    )
}

export default LocationTiles;