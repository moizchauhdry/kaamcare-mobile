import * as z from 'zod';

export const visionHistorySchema = z
  .object({
    day: z.string().optional(),
    month: z.string().optional(),
    year: z.string().optional(),
    location: z.string().optional(),
    explanation: z.string().max(240, 'Field must not exceed 240 characters.').optional(),
    attachment: z
      .array(
        z
          .object({
            uri: z.string(),
            name: z.string().nullable().optional(),
            size: z.number().optional(),
            type: z.enum(['file', 'image', 'api']).optional(),
            mimeType: z.string().optional(),
          })
          .or(
            z.object({
              id: z.string(),
              fileName: z.string(),
            }),
          ),
      )
      .nullable()
      .optional(),
    supportingToggle: z.boolean().optional(),
    toggle: z.boolean().optional(),
    area: z.array(z.string()).optional(),
    dueTo: z.array(z.string()).optional(),
  })
  .refine((data) => !(data.day && data.month === ''), {
    path: ['month'],
    message: 'Field is required if DD is provided.',
  })
  .refine((data) => !((data.day && data.year === '') || (data.year === '' && data.month)), {
    path: ['year'],
    message: 'Field is required if DD or MM are provided.',
  })
  .refine((data) => !(data.supportingToggle && (!data.area || data.area.length === 0)), {
    path: ['area'],
    message: 'Field is required if Area switch is On',
  });

export type VisionHistoryFormData = z.infer<typeof visionHistorySchema>;
