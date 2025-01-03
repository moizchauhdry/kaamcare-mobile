import * as z from 'zod';

export const bloodPressureSchema = z
  .object({
    systolic: z
      .string()
      .min(1, 'Field is required')
      .max(5, 'Field must not exceed 5 characters.')
      .refine((arg) => parseFloat(arg) > 0, 'Value must be greater then 0'),
    diastolic: z
      .string()
      .min(1, 'Field is required')
      .max(5, 'Field must not exceed 5 characters.')
      .refine((arg) => parseFloat(arg) > 0, 'Value must be greater then 0'),
    date: z.coerce.date({
      errorMap: (issue, { defaultError }) => ({
        message: issue.code === 'invalid_date' ? 'Date is required' : defaultError,
      }),
    }),
    pulse: z.string().min(1, 'Field is required').max(3, 'Field must not exceed 3 characters.'),
    measurementSide: z.string().optional(),
    explanation: z.string().optional(),
    measurementPosition: z.string().optional(),
    unit: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.unit === 'mmHg') {
        if (data.systolic && parseInt(data.systolic, 10) < 10) {
          return false;
        }
      }

      return true;
    },
    {
      path: ['systolic'],
      message: 'Value must be greater than or equal to 10',
    },
  )
  .refine(
    (data) => {
      if (data.unit === 'mmHg') {
        if (data.diastolic && parseInt(data.diastolic, 10) < 10) {
          return false;
        }
      }

      return true;
    },
    {
      path: ['diastolic'],
      message: 'Value must be greater than or equal to 10',
    },
  )
  .refine(
    (data) => {
      if (data.unit === 'kPa') {
        if (data.systolic && parseFloat(data.systolic) < 1.4) {
          return false;
        }
      }

      return true;
    },
    {
      path: ['systolic'],
      message: 'Value must be greater than or equal to 1.4',
    },
  )
  .refine(
    (data) => {
      if (data.unit === 'kPa') {
        if (data.diastolic && parseFloat(data.diastolic) < 1.4) {
          return false;
        }
      }

      return true;
    },
    {
      path: ['diastolic'],
      message: 'Value must be greater than or equal to 1.4',
    },
  );

export type BloodPressureFormData = z.infer<typeof bloodPressureSchema>;
