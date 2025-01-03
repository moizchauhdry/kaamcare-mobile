import * as z from 'zod';

export const separatedDateSchema = z.object({
  day: z.string().optional(),
  month: z.string().optional(),
  year: z.string().optional(),
});

export const separatedDateSchemaRefine = <T extends z.infer<typeof separatedDateSchema>>(
  schema: z.ZodSchema<T>,
): z.ZodSchema<T> =>
  schema
    .refine((data) => !(data.day && data.month === ''), {
      path: ['month'],
      message: 'Field is required if DD is provided.',
    })
    .refine((data) => !((data.day && data.year === '') || (data.year === '' && data.month)), {
      path: ['year'],
      message: 'Field is required if DD or MM are provided.',
    })
    .refine((data) => !(data.year && data?.year?.length < 4), {
      path: ['year'],
      message: 'Year Field should be 4 characters long.',
    })
    .refine((data) => !(data.year && parseInt(data.year, 10) <= 1900), {
      path: ['year'],
      message: 'Year must be greater than 1900.',
    });
