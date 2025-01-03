import * as z from 'zod';

export const familyMemberSchema = z.object({
  relationshipKind: z.string().min(1, 'Field is required'),
  name: z.string().optional(),
});

export type FamilyMemberFormData = z.infer<typeof familyMemberSchema>;
