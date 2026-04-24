import { CheckIcon } from "@radix-ui/react-icons";
import * as SelectPrimitive from "@radix-ui/react-select";
import React from "react";
import { twMerge } from "tailwind-merge";

type SelectItemProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>;

/**
 * Simplifies the use of radix-ui/react-select \
 */
const SelectRoot = ({ ...props }: React.ComponentProps<typeof SelectPrimitive.Root>) => {
    return <SelectPrimitive.Root {...props} />
}

/**
 * Simplifies the use of radix-ui/react-select \
 */
const SelectTrigger = ({ ...props }: React.ComponentProps<typeof SelectPrimitive.Trigger>) => {
    return <SelectPrimitive.Trigger {...props} />
}

/**
 * Simplifies the use of radix-ui/react-select \
 */
const SelectValue = ({ ...props }: React.ComponentProps<typeof SelectPrimitive.Value>) => {
    return <SelectPrimitive.Value {...props} />
}

/**
 * Simplifies the use of radix-ui/react-select \
 */
const SelectIcon = ({ ...props }: React.ComponentProps<typeof SelectPrimitive.Icon>) => {
    return <SelectPrimitive.Icon {...props} />
}

/**
 * Simplifies the use of radix-ui/react-select \
 */
const SelectPortal = ({ ...props }: React.ComponentProps<typeof SelectPrimitive.Portal>) => {
    return <SelectPrimitive.Portal {...props} />
}

/**
 * Simplifies the use of radix-ui/react-select \
 */
const SelectContent = ({ ...props }: React.ComponentProps<typeof SelectPrimitive.Content>) => {
    return <SelectPrimitive.Content {...props} />
}

/**
 * Simplifies the use of radix-ui/react-select \
 */
const SelectViewport = ({ ...props }: React.ComponentProps<typeof SelectPrimitive.Viewport>) => {
    return <SelectPrimitive.Viewport {...props} />
}

/**
 * Simplifies the use of radix-ui/react-select \
 */
const SelectScrollUpButton = ({ ...props }: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) => {
    return <SelectPrimitive.ScrollUpButton {...props} />
}

/**
 * Simplifies the use of radix-ui/react-select \
 */
const SelectScrollDownButton = ({ ...props }: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) => {
    return <SelectPrimitive.ScrollDownButton {...props} />
}

/**
 * Simplifies the use of radix-ui/react-select \
 */
const SelectItem = React.forwardRef<
    React.ComponentRef<typeof SelectPrimitive.Item>,
    SelectItemProps
>(({ children, className, ...props }, forwardedRef) => {
    return (
        <div className="p-2">
            <SelectPrimitive.Item
                className={twMerge("flex justify-between rounded-lg p-2 text-xs outline-none hover:bg-tertiary data-[state=checked]:bg-tertiary cursor-pointer", className)}
                {...props}
                ref={forwardedRef}
            >
                <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>

                <SelectPrimitive.ItemIndicator className="SelectItemIndicator inline-flex w-[25px] items-center justify-center">
                    <CheckIcon />
                </SelectPrimitive.ItemIndicator>

            </SelectPrimitive.Item>
        </div>
    );
});

export {
    SelectRoot,
    SelectTrigger,
    SelectIcon,
    SelectValue,
    SelectPortal,
    SelectContent,
    SelectViewport,
    SelectScrollUpButton,
    SelectScrollDownButton,
    SelectItem
}