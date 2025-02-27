import * as z from 'zod';

export const medicationSchema = z.object({
  medicationName: z.string().optional(),
  strength: z.string().max(10, 'Field must not exceed 10 characters.').optional(),
  unit: z.string().max(10, 'Field must not exceed 10 characters.').optional(),
  form: z.string().max(50, 'Field must not exceed 50 characters.').optional(),
  color: z.string().max(50, 'Field must not exceed 50 characters.').optional(),
  shape: z.string().max(50, 'Field must not exceed 50 characters.').optional(),
  for: z.string().max(50, 'Field must not exceed 50 characters.').optional(),
  route: z.string().max(50, 'Field must not exceed 50 characters.').optional(),
  frequency: z.string().max(50, 'Field must not exceed 50 characters.').optional(),
  times: z.array(z.string()).optional(),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  explanation: z.string().max(240, 'Field must not exceed 240 characters.').optional(),
});

export type MedicationFormData = z.infer<typeof medicationSchema>;
