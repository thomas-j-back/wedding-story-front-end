import { z } from 'zod';

export const RelationshipHistorySchema = z.object({
    relationshipHistory: z.string().min(1),
});

export type RelationshipHistoryFormData = z.infer<typeof RelationshipHistorySchema>;