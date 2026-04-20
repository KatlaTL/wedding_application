import { Clock } from "lucide-react";

/**
 * Shared component used to display a clock icon and the time next to it
 */
const ClockText = ({ time }: { time: string }) => {

    return (
        <div className="flex items-start gap-1.5 text-primary ml-auto">
            <span>
                <Clock className="h-[14px] w-[14px] mt-1" />
            </span>
            <p className="!text-primary text-base">{time}</p>
        </div>
    )
}

export default ClockText;