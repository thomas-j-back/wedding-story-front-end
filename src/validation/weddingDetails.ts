import { z } from 'zod';

export const WeddingDetailsSchema = z.object({
    requesterName: z.string().min(1, "You must enter your first name."),
    partnerName: z.string().min(1, "You must enter your partner's name"),
    style: z.enum(['colorful', 'minimal-color']),
    chapter1: z.string().min(1),
});

export type WeddingDetailsFormData = z.infer<typeof WeddingDetailsSchema>;

export const STEP_FIELDS = {
    basicDetails: ["requesterName","partnerName"] as const,
    style: ["style"] as const,
    chapter1: "chapter1" as const
}