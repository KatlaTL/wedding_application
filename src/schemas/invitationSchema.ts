import * as z from "zod";

export const DietarySchema = z.enum(["Vegan", "Vegetarian", "Omnivore"]);

export const GuestSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.email().nullable(),
    isAttending: z.boolean().optional().nullable(),
    needLift: z.boolean().optional().nullable(),
    canOfferLift: z.boolean().optional().nullable(),
    dietary: DietarySchema.optional().nullable(),
    allergies: z.string().optional().nullable()
});

export const InvitationStateSchema = z.object({
    isSubmitted: z.boolean(),
    guestCode: z.string().nullable(),
    guest: GuestSchema.nullable(),
});