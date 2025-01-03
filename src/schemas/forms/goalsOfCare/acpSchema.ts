import * as z from 'zod';

import { phoneNumberSchema } from '../../common/phoneNumber';

const baseSection = z.object({
  isActive: z.boolean(),
  value: z.string().optional(),
  explanation: z.string().max(240, 'Field must not exceed 240 characters.').optional(),
  attachments: z.any().optional(),
  name: z.string().optional(),
  phone: phoneNumberSchema,
});

const acpSection = baseSection.refine(
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

const religiousSection = baseSection.refine(
  (data) => {
    if (data.isActive) {
      return Boolean(data.explanation);
    }
    return true;
  },
  {
    path: ['explanation'],
    message: 'Explanation is required if switch is On',
  },
);

export const acpSchema = z.object({
  livingWill: acpSection,
  codeStatus: acpSection,
  medical: acpSection,
  religious: religiousSection,
  organ: acpSection,
});

export type ACPFormData = z.infer<typeof acpSchema>;
