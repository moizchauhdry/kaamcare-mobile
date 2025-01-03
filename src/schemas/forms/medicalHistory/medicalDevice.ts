import * as z from 'zod';

import { separatedDateSchema, separatedDateSchemaRefine } from './commonSchemas';

export const medicalDeviceSchema = separatedDateSchemaRefine(
  separatedDateSchema.extend({
    explanation: z.string().max(240, 'Field must not exceed 240 characters.').optional(),
    attachment: z.any().optional(),
  }),
);

export type MedicalDeviceFormData = z.infer<typeof medicalDeviceSchema>;
