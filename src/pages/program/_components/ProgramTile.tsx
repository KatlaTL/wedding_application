import { MapPin, Clock, type LucideProps } from "lucide-react";
import type React from "react";

type ProgramTileProps = {
    title: string;
    description: string;
    location: string;
    time: string;
    icon?: React.ForwardRefExoticComponent<Omit<LucideProps, "ref">>;
}

const ProgramTile: React.FC<ProgramTileProps> = ({
    title,
    description,
    location,
    time,
    icon: Icon
}) => {
    return (
        <div className="h-25 w-120 bg-background-muted rounded-lg border-primary/30 border-l-4 border-1">
            <div className="flex flex-row p-2 items-start h-full">
                <div className="flex rounded-full w-8 h-8 bg-muted justify-center items-center">
                    {Icon && <Icon color="#F28C6B" />}
                </div>

                <div className="flex flex-col items-start justify-between ml-5 text-muted-foreground flex-1 h-full">
                    <div className="text-left">
                        <h3 className="text-sm text-color-text">{title}</h3>
                        <p className="text-xs">{description}</p>
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
                        <Clock className="h-3.5 w-3.5 mt-1" />
                    </span>
                    <p>{time}</p>
                </div>
            </div>
        </div>
    )
}

export default ProgramTile;