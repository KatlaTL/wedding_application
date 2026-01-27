import * as z from "zod";

export const DietarySchema = z.enum(["Vegan", "Vegetarian", "Omnivore"]);

export const GuestSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    isAttending: z.boolean().optional(),
    needLift: z.boolean().optional(),
    canOfferLift: z.boolean().optional(),
    dietary: DietarySchema.optional(),
    allergies: z.string().optional()
});

export const InvitationStateSchema = z.object({
    isSubmitted: z.boolean(),
    guestCode: z.string().nullable(),
    guest: GuestSchema.nullable(),
});