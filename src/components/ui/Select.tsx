import { CheckIcon } from "@radix-ui/react-icons";
import * as SelectPrimitive from "@radix-ui/react-select";
import React from "react";

type SelectItemProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>;

const Select = ({ ...props }: React.ComponentProps<typeof SelectPrimitive.Root>) => {
    return <SelectPrimitive.Root {...props} />
}

const SelectTriger = ({ ...props }: React.ComponentProps<typeof SelectPrimitive.Trigger>) => {
    return <SelectPrimitive.Trigger {...props} />
}

const SelectValue = ({ ...props }: React.ComponentProps<typeof SelectPrimitive.Value>) => {
    return <SelectPrimitive.Value {...props} />
}

const SelectIcon = ({ ...props }: React.ComponentProps<typeof SelectPrimitive.Icon>) => {
    return <SelectPrimitive.Icon {...props} />
}

const SelectPortal = ({ ...props }: React.ComponentProps<typeof SelectPrimitive.Portal>) => {
    return <SelectPrimitive.Portal {...props} />
}

const SelectContent = ({ ...props }: React.ComponentProps<typeof SelectPrimitive.Content>) => {
    return <SelectPrimitive.Content {...props} />
}

const SelectViewport = ({ ...props }: React.ComponentProps<typeof SelectPrimitive.Viewport>) => {
    return <SelectPrimitive.Viewport {...props} />
}

const SelectScrollUpButton = ({ ...props }: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) => {
    return <SelectPrimitive.ScrollUpButton {...props} />
}

const SelectScrollDownButton = ({ ...props }: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) => {
    return <SelectPrimitive.ScrollDownButton {...props} />
}


const SelectItem = React.forwardRef<
    React.ComponentRef<typeof SelectPrimitive.Item>,
    SelectItemProps
>(({ children, className, ...props }, forwardedRef) => {
    return (
        <SelectPrimitive.Item
            className={`flex justify-between p-2 outline-none hover:bg-tertiary cursor-pointer ${className}`}
            {...props}
            ref={forwardedRef}
        >
            <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>

            <SelectPrimitive.ItemIndicator className="SelectItemIndicator inline-flex w-[25px] items-center justify-center">
                <CheckIcon />
            </SelectPrimitive.ItemIndicator>

        </SelectPrimitive.Item>
    );
});

export {
    Select,
    SelectTriger,
    SelectIcon,
    SelectValue,
    SelectPortal,
    SelectContent,
    SelectViewport,
    SelectScrollUpButton,
    SelectScrollDownButton,
    SelectItem
}