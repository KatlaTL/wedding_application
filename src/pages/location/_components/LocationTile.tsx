import { Clock, MapPin } from "lucide-react"
import Button from "../../../components/ui/Button"
import type { LocationType } from "../../../types/locationTypes";
import GoogleMap from "../../../components/ui/GoogleMap";
import ClockText from "../../../components/ClockText";

/**
 * LocationTiles used in the Location component
 */
const LocationTile: React.FC<LocationType> = ({
    title,
    address,
    description,
    time,
    mapUrl,
    iframeUrl
}) => {
    const handleClick = () => window.open(mapUrl, "_blank", "noopener,noreferrer");

    return (
        <div className="bg-background-muted rounded-lg border-primary-30 border hover:shadow-lg h-fit">
            <div className="min-h-30 h-[45%] bg-gradient-to-br from-white/20 to-primary/20 flex justify-center items-center">
                {iframeUrl ? (
                    <GoogleMap src={iframeUrl} />
                ) : (
                    <MapPin className="text-primary/70 h-8 w-8" />
                )}
            </div>

            <div className="flex flex-col items-start text-left text-xs text-muted-foreground p-5">
                <div className="flex justify-between w-full">
                    <h3 className="text-primary pb-5">{title}</h3>

                    <ClockText time={time} />
                </div>

                <div className="min-h-25">
                    <p className="pb-3">{description}</p>
                </div>

                <div className="flex items-start gap-1.5">
                    <MapPin className="text-primary h-4 w-4 mt-0.5" />
                    <p className="pb-3">{address}</p>
                </div>

                {/* Add onclick */}
                <Button size="small" icon={MapPin} onClick={handleClick}>Se på kortet</Button>
            </div>
        </div>
    )
}

export default LocationTile;