import { Clock, MapPin } from "lucide-react"
import IconText from "../../../../components/IconText"
import ActionButtons from "./ActionButtons";
import type { ProgramType } from "../../../../types/programTypes";

const AdminProgramTile: React.FC<ProgramType & { onEdit: () => void}> = ({
    title,
    description,
    location,
    time,
    icon: Icon,
    onEdit
}) => {

    return (
        <div className="min-h-32 mx-5 md:mx-0 bg-background-muted rounded-lg border-primary-30 border-1 my-3">
            <div className="flex flex-row justify-between">
                <div className="flex flex-row p-5 items-start h-full">
                    <div className="flex rounded-full w-10 h-10 bg-muted justify-center items-center">
                        {Icon && <Icon color="#F28C6B" />}
                    </div>

                    <div className="flex flex-col justify-between md:ml-5 ml-3 text-muted-foreground h-full">

                        <h3 className="pb-1 text-color-text">{title}</h3>

                        <div className="flex gap-4">
                            <IconText icon={MapPin} text={location} tailwindColor="text-text-color" />

                            <IconText icon={Clock} text={time} tailwindColor="text-text-color" />
                        </div>
                    </div>
                </div>

                <div className="p-5">
                    <ActionButtons
                        row={"row"}
                        onDelete={(row) => { }} //TO-DO add delete logic
                        onEdit={onEdit}
                    />
                </div>

            </div>
            <div className="text-left pl-5">
                <p>{description}</p>
            </div>
        </div>
    )
}

export default AdminProgramTile;