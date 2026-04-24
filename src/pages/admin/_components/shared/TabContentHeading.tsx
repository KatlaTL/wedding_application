import { Plus } from "lucide-react";
import Button from "../../../../components/ui/Button"

type TabContentHeadingType = {
    title: string;
    description: string;
    onClick: () => void;
    ctaText: string;
}

const TabContentHeading = ({title, description, onClick, ctaText}: TabContentHeadingType) => {

    return (
        <div className="mt-10 mb-5 flex justify-between items-center">
            <div>
                <h3 className="text-color-text font-medium text-lg">{title}</h3>
                <p>{description}</p>
            </div>
            <div>
                <Button variant="secondary" size="small" className="p-2 font-semibold" icon={Plus} onClick={onClick}>{ctaText}</Button>
            </div>
        </div>
    )
}

export default TabContentHeading;