import * as z from 'zod';

export const heightSchema = z
  .object({
    heightFeet: z.string().max(4, 'Field can be 4 characters long.').optional(),
    heightInch: z.string().max(4, 'Field can be 4 characters long.').optional(),
    heightCm: z
      .string()
      .max(6, 'Field can be 6 characters long.')
      .refine(
        (value) => !value || /^\d+(\.\d{0,2})?$/.test(value),
        'Please enter a valid number with up to 2 decimal places',
      )
      .optional(),
    date: z.coerce.date({
      errorMap: (issue, { defaultError }) => ({
        message: issue.code === 'invalid_date' ? 'Date is required' : defaultError,
      }),
    }),
    explanation: z.string().optional(),
    unitType: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.unitType === 'FeetInch') {
        return Boolean(data.heightFeet);
      }

      return true;
    },
    {
      message: 'Field is required',
      path: ['heightFeet'],
    },
  )
  .refine(
    (data) => {
      if (data.unitType === 'FeetInch') {
        return Boolean(data.heightInch);
      }

      return true;
    },
    {
      message: 'Field is required',
      path: ['heightInch'],
    },
  )
  .refine(
    (data) => {
      if (data.unitType === 'Centimeter') {
        return Boolean(data.heightCm);
      }

      return true;
    },
    {
      message: 'Field is required',
      path: ['heightCm'],
    },
  );

export type HeightFormData = z.infer<typeof heightSchema>;
