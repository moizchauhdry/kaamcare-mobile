import * as z from 'zod';

import { separatedDateSchema, separatedDateSchemaRefine } from '../medicalHistory/commonSchemas';

export const vaccineSchema = separatedDateSchemaRefine(
  separatedDateSchema.extend({
    facility: z.string().optional(),
    brand: z.string().max(40, 'Brand name can have only 40 characters').optional(),
    dose: z.string().max(2, 'Dose number can have only 2 characters').optional(),
    lot: z.string().max(15, 'Lot number can have only 15 characters').optional(),
    explanation: z.string().max(240, 'Field must not exceed 240 characters.').optional(),
    attachment: z.any().optional(),
  }),
);

export type VaccineFormData = z.infer<typeof vaccineSchema>;

export const vaccineCardSchema = z.object({
  title: z
    .string()
    .min(3, 'Field is required with minimum of 3 characters.')
    .max(40, 'Field should have maximum of 40 characters.'),
  explanation: z.string().optional(),
  attachment: z
    .array(
      z.object({
        id: z.string().optional(),
        fileName: z.string().optional(),
        uri: z.string().optional(),
        name: z.string().optional(),
        type: z.string().optional(),
        mimeType: z.string().optional(),
      }),
      { message: 'Field is required' },
    )
    .min(1, 'Field is required'),
});

export type VaccineCardFormData = z.infer<typeof vaccineCardSchema>;
