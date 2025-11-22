import { z } from 'zod';


export const styledPhotoSchema = z.object({
    initPhotoKey: z.string().optional(),          // key in R2/S3
    initPhotoContentType: z.string().optional(),  // "image/jpeg", etc.
    generatedKey: z.string().optional(),       // key of generated image
    generatedUrl: z.string().url().optional(), // presigned GET URL if you store it
    jobId: z.string().optional(),              // optional, if you want to keep it
    numRestyles: z.number().int().nonnegative().default(0).optional(),
  });
  
export type StyledPhotoState = z.infer<typeof styledPhotoSchema>;

export const WeddingDetailsSchema = z.object({
    requesterName: z.string().min(1, "You must enter your first name."),
    partnerName: z.string().min(1, "You must enter your partner's name"),
    style: z.enum(['colorful', 'minimal-color']),
    requesterCharacterPhoto: styledPhotoSchema.optional(),
    partnerCharacterPhoto: styledPhotoSchema.optional(),
    chapter1: z.string().min(1),
});

export type WeddingDetailsFormData = z.infer<typeof WeddingDetailsSchema>;


export const STEP_FIELDS = {
    basicDetails: ["requesterName","partnerName"] as const,
    style: ["style"] as const,
    characterPhotos: ["requesterCharacterPhoto", "partnerCharacterPhoto"],
    chapter1: "chapter1" as const
}