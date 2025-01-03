import * as z from 'zod';

import { phoneNumberSchema } from 'schemas/common/phoneNumber';

const emergencyContactCommonSchema = {
  firstName: z
    .string()
    .min(2, 'Please enter at least 2 characters.')
    .max(60, 'First name field can have only 60 characters.'),
  lastName: z
    .string()
    .min(2, 'Please enter at least 2 characters.')
    .max(60, 'Last name field can have only 60 characters.'),
  relationshipKind: z.string().nullable().optional(),
  phoneNumber: phoneNumberSchema.refine((value) => value && value?.length > 0, {
    message: 'Phone number is required.',
  }),
  address: z.string().max(140, 'Address field can have only 140 characters.').nullable().optional(),
};

export const emergencyContactPostSchema = z.object(emergencyContactCommonSchema);

export const emergencyContactPutSchema = z.object({
  ...emergencyContactCommonSchema,
  firstName: emergencyContactCommonSchema.firstName.nullable().optional().or(z.literal('')),
  lastName: emergencyContactCommonSchema.lastName.nullable().optional().or(z.literal('')),
  phoneNumber: phoneNumberSchema,
});

export type EmergencyContactFormData =
  | z.infer<typeof emergencyContactPostSchema>
  | z.infer<typeof emergencyContactPutSchema>;
