import z from "zod";

export const LocationSchema = z.object({
    iframeUrl: z.string().optional(),
    title: z.string(),
    time: z.string(),
    description: z.string(),
    address: z.string(),
    mapUrl: z.string()
});