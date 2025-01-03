import * as z from 'zod';

export const socialHistoryDrugUseSchema = z.object({
  type: z.string().min(2, 'Please enter at least 2 characters').max(60, 'Field must not exceed 60 characters.'),
  route: z.string().max(50, 'Field must not exceed 50 characters.').optional(),
  frequency: z.string().max(50, 'Field must not exceed 50 characters.').optional(),
  duration: z.string().optional(),
  status: z.string().optional(),
  explanation: z.string().max(240, 'Field must not exceed 240 characters.').optional(),
});

export type SocialHistoryDrugUseFormData = z.infer<typeof socialHistoryDrugUseSchema>;
