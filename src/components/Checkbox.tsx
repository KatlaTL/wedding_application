import * as CheckboxPrimitive from "@radix-ui/react-checkbox";

const Checkbox = ({ ...props }: React.ComponentProps<typeof CheckboxPrimitive.Root>) => {
    return <CheckboxPrimitive.Root {...props} />
}

const CheckboxIndicator = ({ ...props }: React.ComponentProps<typeof CheckboxPrimitive.Indicator>) => {
    return <CheckboxPrimitive.Indicator {...props} />
}

export {
    Checkbox,
    CheckboxIndicator
}