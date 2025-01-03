import * as z from 'zod';

export const socialHistorySmokingSchema = z.object({
  type: z.string().min(1, 'Field is required'),
  frequency: z.string().max(50, 'Field must not exceed 50 characters.').optional(),
  duration: z.string().optional(),
  status: z.string().optional(),
  explanation: z.string().max(240, 'Field must not exceed 240 characters.').optional(),
});

export type SocialHistorySmokingFormData = z.infer<typeof socialHistorySmokingSchema>;
