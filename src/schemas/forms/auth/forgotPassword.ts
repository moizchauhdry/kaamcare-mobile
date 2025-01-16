import * as z from 'zod';

export const forgotSchema = z.object({
  email: z
    .string({
      required_error: 'Please provide a valid email address.',
    })
    .email('Please provide a valid email address.'),
});

export type ForgotFormData = z.infer<typeof forgotSchema>;
