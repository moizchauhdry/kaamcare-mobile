import * as z from 'zod';

export const socialHistoryAlcoholSchema = z.object({
  type: z.string().min(1, 'Field is required'),
  quantity: z.string().max(6, 'Field must not exceed 6 characters.').optional(),
  frequency: z.string().max(50, 'Field must not exceed 50 characters.').optional(),
  duration: z.string().optional(),
  status: z.string().optional(),
  explanation: z.string().max(240, 'Field must not exceed 240 characters.').optional(),
});

export type SocialHistoryAlcoholFormData = z.infer<typeof socialHistoryAlcoholSchema>;
