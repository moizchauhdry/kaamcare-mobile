import * as z from 'zod';

import { phoneNumberSchema } from 'schemas/common/phoneNumber';

export const healthcareProviderSchema = z.object({
  firstName: z
    .string()
    .min(2, 'Field is required. Minimum characters: 2')
    .max(60, 'First name can have only 60 characters.'),
  lastName: z
    .string()
    .min(2, 'Field is required. Minimum characters: 2')
    .max(60, 'Last name can have only 60 characters.'),
  specialization: z.string().nullable().optional(),
  title: z.string().nullable().optional(),
  phoneNumber: phoneNumberSchema,
  isPrimaryCareProvider: z.boolean().nullable().optional(),
});

export type HealthcareProviderFormData = z.infer<typeof healthcareProviderSchema>;
