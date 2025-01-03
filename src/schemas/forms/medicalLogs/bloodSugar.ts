import * as z from 'zod';

export const bloodSugarSchema = z.object({
  bloodSugar: z
    .string()
    .min(1, 'Field is required')
    .max(5, 'Field must not exceed 3 characters.')
    .refine((arg) => parseFloat(arg) <= 999, 'The maximum value for the field is 999'),
  carbs: z.string().max(4, 'Field must not exceed 3 characters.').optional(),
  date: z.coerce.date({
    errorMap: (issue, { defaultError }) => ({
      message: issue.code === 'invalid_date' ? 'Date is required' : defaultError,
    }),
  }),
  meal: z.string().optional(),
  explanation: z.string().optional(),
  when: z.string().optional(),
  insulin: z
    .array(
      z.object({
        type: z.string().min(1, 'Field is reqired'),
        dose: z.string().min(1, 'Field is required'),
      }),
    )
    .optional(),
});

export type BloodSugarFormData = z.infer<typeof bloodSugarSchema>;
