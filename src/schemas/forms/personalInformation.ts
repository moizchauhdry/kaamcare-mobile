import * as z from 'zod';

import { phoneNumberSchema } from 'schemas/common/phoneNumber';

export const personalInformationSchema = z.object({
  firstName: z.string().max(60, 'Field must not exceed 60 characters.').nullable().optional(),
  lastName: z.string().max(60, 'Field must not exceed 60 characters.').nullable().optional(),
  dateOfBirth: z.coerce
    .date({
      errorMap: (issue, { defaultError }) => ({
        message: issue.code === 'invalid_date' ? 'Date of birth is required' : defaultError,
      }),
    })
    .nullable()
    .optional(),
  phoneNumber: phoneNumberSchema,
  bloodType: z.string().nullable().optional(),
  gender: z.string().nullable().optional(),
  weight: z.string().nullable().optional(),
  height: z.string().nullable().optional(),
  labelWeight: z.string().nullable().optional(),
  labelHeight: z.string().nullable().optional(),
  email: z.string().email({ message: 'Field should be email address' }).min(1, 'Field is required'),
});

export type PersonalInformationFormData = z.infer<typeof personalInformationSchema>;
