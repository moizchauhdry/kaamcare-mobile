import * as z from 'zod';

export const socialHistoryOccupationSchema = z.object({
  type: z.string().min(2, 'Please enter at least 2 characters').max(60, 'Field must not exceed 60 characters.'),
  duration: z.string().optional(),
  status: z.string().optional(),
  explanation: z.string().max(240, 'Field must not exceed 240 characters.').optional(),
});

export type SocialHistoryOccupationFormData = z.infer<typeof socialHistoryOccupationSchema>;
