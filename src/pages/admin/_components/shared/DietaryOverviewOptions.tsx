import { DietaryLabels } from "../../../../constants/dietaryLabels";
import type { AdminDietaryAndAllergiesType } from "../../../../types/adminTypes";
import type { DietaryType } from "../../../../types/invitationTypes";

type DietaryOverviewOptionsType = {
    option: DietaryType;
    dietaryOverview: AdminDietaryAndAllergiesType;
}

export const DietaryOverviewOptions = ({ dietaryOverview, option }: DietaryOverviewOptionsType) => {
    return (
        <div className="flex flex-col text-center">
            <span className="text-3xl text-primary font-bold">{dietaryOverview[option]}</span>
            <h5 className="text-sm text-muted-foreground">{DietaryLabels[option]}</h5>
        </div>
    )
}

export default DietaryOverviewOptions;