import * as z from 'zod';

import { separatedDateSchema, separatedDateSchemaRefine } from '../medicalHistory/commonSchemas';

export const screeningExamSchema = separatedDateSchemaRefine(
  separatedDateSchema.extend({
    explanation: z.string().max(240, 'Field must not exceed 240 characters.').optional(),
    attachment: z.any().optional(),
  }),
);

export type ScreeningExamFormData = z.infer<typeof screeningExamSchema>;

export const screeningExamCardSchema = separatedDateSchemaRefine(
  separatedDateSchema.extend({
    title: z
      .string()
      .min(3, 'Field is required with minimum of 3 characters.')
      .max(40, 'Field should have maximum of 40 characters.'),
    explanation: z.string().optional(),
    attachment: z.array(
      z.object({
        uri: z.string(),
      }),
      { message: 'Field is required' },
    ),
  }),
);

export type ScreeningExamCardFormData = z.infer<typeof screeningExamCardSchema>;
