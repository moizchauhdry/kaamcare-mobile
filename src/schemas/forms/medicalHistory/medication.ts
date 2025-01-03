import * as z from 'zod';

export const medicationSchema = z.object({
  form: z.string().max(50, 'Field must not exceed 50 characters.').optional(),
  dose: z.string().max(9, 'Field must not exceed 9 characters.').optional(),
  units: z.string().max(10, 'Field must not exceed 10 characters.').optional(),
  route: z.string().max(50, 'Field must not exceed 50 characters.').optional(),
  frequency: z.string().max(50, 'Field must not exceed 50 characters.').optional(),
  explanation: z.string().max(240, 'Field must not exceed 240 characters.').optional(),
});

export type MedicationFormData = z.infer<typeof medicationSchema>;
