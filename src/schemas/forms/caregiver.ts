import * as z from 'zod';

import { isStringLongEnough, isStringLongRequired } from 'utils/validator/string';
import { phoneNumberSchema } from 'schemas/common/phoneNumber';

export const caregiverSchema = z
  .object({
    isCaregiver: z.boolean().nullable().optional(),
    caregiverFirstName: z.string().max(60, 'Field must not exceed 60 characters.').nullable().optional(),
    caregiverLastName: z.string().nullable().optional(),
    caregiverPhoneNumber: phoneNumberSchema,

    isHomeTherapy: z.boolean().nullable().optional(),
    homeTherapyServiceName: z.string().max(80, 'Field must not exceed 80 characters.').nullable().optional(),
    homeTherapyPhoneNumber: phoneNumberSchema,

    isHomeNursing: z.boolean().nullable().optional(),
    homeNursingServiceName: z.string().max(80, 'Field must not exceed 80 characters.').nullable().optional(),
    homeNursingPhoneNumber: phoneNumberSchema,
  })
  .refine((data) => !(data.isCaregiver && !isStringLongEnough(data.caregiverFirstName, 2)), {
    path: ['caregiverFirstName'],
    message: 'Please enter at least 2 characters',
  })
  .refine((data) => !(data.isCaregiver && !isStringLongRequired(data.caregiverLastName)), {
    path: ['caregiverLastName'],
    message: 'Last name is required',
  })
  .refine((data) => !(data.isHomeTherapy && !isStringLongEnough(data.homeTherapyServiceName, 3)), {
    path: ['homeTherapyServiceName'],
    message: 'Please enter at least 3 characters',
  })
  .refine((data) => !(data.isHomeNursing && !isStringLongEnough(data.homeNursingServiceName, 3)), {
    path: ['homeNursingServiceName'],
    message: 'Please enter at least 3 characters',
  });

export type CaregiverFormData = z.infer<typeof caregiverSchema>;
