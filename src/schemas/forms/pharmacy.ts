import * as z from 'zod';

import { phoneNumberSchema } from 'schemas/common/phoneNumber';

const commonPharmacySchema = {
  name: z.string().min(3, 'Please enter at least 3 characters.').max(80, 'Field must not exceed 80 characters.'),
  phoneNumber: phoneNumberSchema,
  address: z.string().max(140, 'Address field can have only 140 characters.').nullable().optional(),
};

export const pharmacyPostSchema = z.object(commonPharmacySchema);

export const pharmacyPutSchema = z.object({
  ...commonPharmacySchema,
  name: commonPharmacySchema.name.nullable().optional().or(z.literal('')),
});

export type PharmacyFormData = z.infer<typeof pharmacyPostSchema> | z.infer<typeof pharmacyPutSchema>;
