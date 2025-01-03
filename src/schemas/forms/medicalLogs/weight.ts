import * as z from 'zod';

export const weightSchema = z.object({
  weight: z
    .string()
    .min(1, 'Field is required')
    .max(6, 'Field can be 6 characters long.')
    .refine((arg) => parseFloat(arg) < 999, 'Value cannot be greater than 999'),
  date: z.coerce.date({
    errorMap: (issue, { defaultError }) => ({
      message: issue.code === 'invalid_date' ? 'Date is required' : defaultError,
    }),
  }),
  explanation: z.string().optional(),
});

export type WeightFormData = z.infer<typeof weightSchema>;
