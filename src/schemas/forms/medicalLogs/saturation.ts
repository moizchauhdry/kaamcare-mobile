import * as z from 'zod';

export const saturationSchema = z.object({
  date: z.coerce.date({
    errorMap: (issue, { defaultError }) => ({
      message: issue.code === 'invalid_date' ? 'Date is required' : defaultError,
    }),
  }),
  spo2: z.string().min(1, 'Field is required').max(3, 'Field must not exceed 3 characters.'),
  explanation: z.string().optional(),
});

export type SaturationFormData = z.infer<typeof saturationSchema>;
