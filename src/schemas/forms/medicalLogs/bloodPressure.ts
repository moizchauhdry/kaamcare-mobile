import * as z from 'zod';

export const bloodPressureSchema = z
  .object({
    systolic: z
      .string()
      .min(1, 'Field is required')
      .max(3, 'Field must not exceed 3 characters.')
      .refine((arg) => /^\d+(\.\d+)?$/.test(arg), 'Value must be a valid number') // Check if input is a number
      .refine((arg) => parseFloat(arg) > 0, 'Value must be greater than 30'), // Ensure it's positive
    diastolic: z
      .string()
      .min(1, 'Field is required')
      .max(3, 'Field must not exceed 3 characters.')
      .refine((arg) => /^\d+(\.\d+)?$/.test(arg), 'Value must be a valid number') // Check if input is a number
      .refine((arg) => parseFloat(arg) > 0, 'Value must be greater than 0'), // Ensure it's positive
    date: z.coerce.date({
      errorMap: (issue, { defaultError }) => ({
        message: issue.code === 'invalid_date' ? 'Date is required' : defaultError,
      }),
    }),
    pulse: z
      .string()
      .min(1, 'Field is required')
      .max(3, 'Field must not exceed 3 characters.')
      .refine((arg) => /^\d+$/.test(arg), 'Pulse must be a valid integer'), // Check if pulse is an integer
    measurementSide: z.string().optional(),
    explanation: z.string().optional(),
    measurementPosition: z.string().optional(),
    unit: z.string().optional(),
  })
  // Additional validation for systolic values based on the unit
  .refine(
    (data) => {
      if (data.unit === 'mmHg' && parseInt(data.systolic, 10) < 10) {
        return false;
      }
      return true;
    },
    {
      path: ['systolic'],
      message: 'Systolic must be greater than or equal to 10 for mmHg',
    },
  )
  .refine(
    (data) => {
      if (data.unit === 'mmHg' && parseInt(data.diastolic, 10) < 10) {
        return false;
      }
      return true;
    },
    {
      path: ['diastolic'],
      message: 'Diastolic must be greater than or equal to 10 for mmHg',
    },
  )
  // Additional validation for systolic and diastolic when the unit is kPa
  .refine(
    (data) => {
      if (data.unit === 'kPa' && parseFloat(data.systolic) < 1.4) {
        return false;
      }
      return true;
    },
    {
      path: ['systolic'],
      message: 'Systolic must be greater than or equal to 1.4 for kPa',
    },
  )
  .refine(
    (data) => {
      if (data.unit === 'kPa' && parseFloat(data.diastolic) < 1.4) {
        return false;
      }
      return true;
    },
    {
      path: ['diastolic'],
      message: 'Diastolic must be greater than or equal to 1.4 for kPa',
    },
  );

export type BloodPressureFormData = z.infer<typeof bloodPressureSchema>;
