import * as z from 'zod';

export const adlSection = z
  .object({
    isActive: z.boolean(),
    value: z.string().optional(),
    explanation: z.string().max(240, 'Field must not exceed 240 characters.').optional(),
    multiselect: z.array(z.string()).optional(),
  })
  .refine(
    (data) => {
      if (data.isActive) {
        return Boolean(data.value);
      }

      return true;
    },
    {
      path: ['value'],
      message: 'Field is required if switch is On',
    },
  );

export const adlSchema = z.object({
  feeding: adlSection,
  bathing: adlSection,
  grooming: adlSection,
  dressing: adlSection,
  bowelControl: adlSection,
  bladderControl: adlSection,
  toiletUse: adlSection,
  transfers: adlSection,
  mobility: adlSection,
  stairs: adlSection,
});

export type ADLFormData = z.infer<typeof adlSchema>;
