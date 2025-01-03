import * as z from 'zod';

import { separatedDateSchema, separatedDateSchemaRefine } from './commonSchemas';

export const hearingHistorySchema = separatedDateSchemaRefine(
  separatedDateSchema.extend({
    location: z.string().optional(),
    explanation: z.string().max(240, 'Field must not exceed 240 characters.').optional(),
    attachment: z.any().optional(),
  }),
);

export type HearingHistoryFormData = z.infer<typeof hearingHistorySchema>;
