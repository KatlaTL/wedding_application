import { MapPin, Clock } from "lucide-react";
import type React from "react";
import type { ProgramType } from "../../../types/programTypes";

/**
 * ProgramTiles used in the Program component
 */
const ProgramTile: React.FC<ProgramType> = ({
    title,
    description,
    location,
    time,
    icon: Icon
}) => {
    return (
        <div className="h-32 w-120 bg-background-muted rounded-lg border-primary-30 border-l-4 border-1">
            <div className="flex flex-row p-5 items-start h-full">
                <div className="flex rounded-full w-8 h-8 bg-muted justify-center items-center">
                    {Icon && <Icon color="#F28C6B" />}
                </div>

                <div className="flex flex-col items-start justify-between ml-5 text-muted-foreground flex-1 h-full">
                    <div className="text-left">
                        <h3 className="!text-sm pb-1">{title}</h3>
                        <p>{description}</p>
                    </div>


                    <div className="text-xs flex gap-1">
                        <span>
                            <MapPin className="h-4 w-4" />
                        </span>
                        <p>{location}</p>
                    </div>
                </div>

                <div className="flex items-start gap-1.5 text-sm text-primary ml-auto">
                    <span>
                        <Clock className="h-[11px] w-[11px] mt-[3px]" />
                    </span>
                    <p className="!text-primary">{time}</p>
                </div>
            </div>
        </div>
    )
}

export default ProgramTile;