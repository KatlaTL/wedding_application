import * as CheckboxPrimitive from "@radix-ui/react-checkbox";

/**
 * Simplifies the use of radix-ui/react-checkbox \
 * Uses as \<Checkbox />
 */
const Checkbox = ({ ...props }: React.ComponentProps<typeof CheckboxPrimitive.Root>) => {
    return <CheckboxPrimitive.Root {...props} />
}

/**
 * Simplifies the use of radix-ui/react-checkbox \
 * Uses as \<CheckboxIndicator />
 */
const CheckboxIndicator = ({ ...props }: React.ComponentProps<typeof CheckboxPrimitive.Indicator>) => {
    return <CheckboxPrimitive.Indicator {...props} />
}

export {
    Checkbox,
    CheckboxIndicator
}