import { ChevronDown } from "lucide-react";
import type { SelectItemType } from "../../types/utilsTypes";
import { SelectContent, SelectIcon, SelectItem, SelectRoot, SelectTrigger, SelectValue, SelectViewport } from "./SelectRadix"
import type { SelectHTMLAttributes } from "react";
import Icon from "./Icon";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    items: SelectItemType[];
    label: string;
    onValueChange: (value: string) => void;
}

const Select: React.FC<SelectProps> = ({ items, onValueChange, label, required }) => {
    const labelText = required ? `${label} *` : label;

    return (
        <div className="flex flex-col gap-1 mb-1">
            <p className="!text-color-text">{labelText}</p>

            <SelectRoot onValueChange={onValueChange} >
                <SelectTrigger className="flex items-center justify-between w-full rounded-md bg-white leading-none h-7 px-2 text-[13px] text-left text-color-text placeholder-muted-foreground border border-primary-30 focus:outline-primary">
                    <SelectValue placeholder="Select a fruit" />

                    <SelectIcon className="inline-flex">
                        <ChevronDown className="w-4 h-4 text-color-text" />
                    </SelectIcon>
                </SelectTrigger>

                <SelectContent className="bg-white rounded-md border border-primary-30 shadow-lg min-w-[var(--radix-select-trigger-width)]" position="popper">
                    <SelectViewport>
                        {items.map((item, index) => (
                            <SelectItem value={item.iconKey} key={item.iconKey + index}>
                                <div className="flex gap-2">
                                    <Icon name={item.iconKey} className="w-3.5 h-3.5 inline" />
                                    <span className="text-[13px] leading-none">{item.name}</span>
                                </div>
                            </SelectItem>
                        ))}
                    </SelectViewport>
                </SelectContent>
            </SelectRoot>
        </div>
    )
}

export default Select;