import * as z from 'zod';

export const forgotSchema = z.object({
  email: z.string().email('Please provide a valid email address.'),
});

export type ForgotFormData = z.infer<typeof forgotSchema>;
