import { CheckIcon } from "lucide-react";
import { Checkbox, CheckboxIndicator } from "../../../../components/ui/CheckboxRadix";
import { useEffect, useState } from "react";
import type { CheckedState } from "@radix-ui/react-checkbox";
import useAdmin from "../../../../hooks/useAdmin";

type AttendingCheckboxType = {
    isChecked: boolean;
    guestCode: string;
}

const AttendingCheckbox = ({ isChecked, guestCode }: AttendingCheckboxType) => {
    const { updateGuestAttendanceMutation } = useAdmin();
    const [isAttending, setIsAttending] = useState<boolean>(!!isChecked);

    const handleCheckedChange = (checked: CheckedState) => setIsAttending(!!checked);

    useEffect(() => {
        setIsAttending(!!isChecked);
    }, [isChecked]);

    useEffect(() => {
        updateGuestAttendanceMutation.mutate({ isAttending, guestCode });
    }, [isAttending])

    return (
        <Checkbox
            className="flex size-3.5 items-center justify-center bg-background rounded border-primary outline-none"
            onCheckedChange={(checked) => handleCheckedChange(checked)}
            checked={isAttending}
            id={"isAttending"}
        >
            <CheckboxIndicator>
                <CheckIcon className="size-3.5 bg-primary text-background-muted rounded" />
            </CheckboxIndicator>
        </Checkbox>
    )
}

export default AttendingCheckbox;