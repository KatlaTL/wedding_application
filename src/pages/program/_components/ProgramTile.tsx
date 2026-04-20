import { MapPin, Clock } from "lucide-react";
import type React from "react";
import type { ProgramType } from "../../../types/programTypes";
import { useNavigate } from "react-router-dom";
import ClockText from "../../../components/ClockText";

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
    const navigate = useNavigate();

    const handleClick = () => navigate("/location");

    return (
        <div className="min-h-32 mx-5 md:mx-0 bg-background-muted rounded-lg border-primary-30 border-l-4 border-1">
            <div className="flex flex-row p-5 items-start h-full">
                <div className="flex rounded-full w-10 h-10 bg-muted justify-center items-center">
                    {Icon && <Icon color="#F28C6B" />}
                </div>

                <div className="flex flex-col items-start justify-between md:ml-5 ml-3 text-muted-foreground flex-1 h-full">
                    <div className="text-left">
                        <h3 className="pb-1">{title}</h3>
                        <p>{description}</p>
                    </div>


                    <div className="text-sm flex gap-1 mt-5 md:mt-0 cursor-pointer" onClick={handleClick}>
                        <span>
                            <MapPin className="h-4 w-4" />
                        </span>
                        <p>{location}</p>
                    </div>
                </div>

                <ClockText time={time} />
            </div>
        </div>
    )
}

export default ProgramTile;