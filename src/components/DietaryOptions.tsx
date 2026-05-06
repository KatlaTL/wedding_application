import type { CheckedState } from "@radix-ui/react-checkbox";
import type { DietaryType } from "../types/invitationTypes";
import FormWrapper from "./FormWrapper";
import { Checkbox, CheckboxIndicator } from "./ui/CheckboxRadix";
import { CheckIcon } from "lucide-react";
import { DietaryLabels } from "../constants/dietaryLabels";
import { twMerge } from "tailwind-merge";

type DietaryOptionsType = {
    dietary: DietaryType | undefined;
    setDietary: (value: DietaryType) => void;
    className?: string;
}

const DietaryOptions = ({dietary, setDietary, className = ""}: DietaryOptionsType) => {
    const dietaryOptions: DietaryType[] = ["Vegetarian", "Vegan", "Omnivore"];


    const handleCheckedChange = (checked: CheckedState, value: DietaryType) => {
        if (checked) {
            setDietary(value);
        }
    }

    return (
        <FormWrapper className={twMerge("bg-muted rounded-lg p-2 !flex-row text-xs text-color-text", className)}>
            <div className="flex gap-5">
                {dietaryOptions.map((value, index) =>
                    <div className="flex gap-1 text-sm" key={value + index}>
                        <Checkbox
                            className="flex size-5 items-center justify-center bg-background rounded border-primary outline-none"
                            onCheckedChange={(checked) => handleCheckedChange(checked, value)}
                            checked={dietary === value}
                            id={value}
                        >
                            <CheckboxIndicator>
                                <CheckIcon className="size-5 bg-primary text-background-muted rounded" />
                            </CheckboxIndicator>
                        </Checkbox>
                        <label htmlFor={value}>
                            {DietaryLabels[value]}
                        </label>
                    </div>
                )}
            </div>
        </FormWrapper>
    )
}

export default DietaryOptions;