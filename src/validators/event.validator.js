import { z } from "zod";

export const eventSchema = z.object({
    name: z.string().trim().min(1, "Name is required"),

    description: z.string().trim().min(1, "Description is required"),

    image: z.string().optional(),

    category: z.enum([
        "Technical",
        "Cultural",
        "Workshop",
        "Symposium",
        "Sports",
    ]),

    date: z.coerce.date(),

    time: z.string().trim().min(1, "Time is required"),

    location: z.string().trim().min(1, "Location is required"),
});