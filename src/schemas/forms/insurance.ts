import * as z from 'zod';

export const insuranceSchema = z.object({
  explanation: z.string().max(240, 'Field must not exceed 240 characters.').optional(),
  front: z.array(z.any()).min(1, 'Field is required').max(1, 'Field can have only 1 attachment.'),
  back: z.array(z.any()).min(1, 'Field is required').max(1, 'Field can have only 1 attachment.'),
  common: z.string().optional(),
});

export type InsuranceFormData = z.infer<typeof insuranceSchema>;
