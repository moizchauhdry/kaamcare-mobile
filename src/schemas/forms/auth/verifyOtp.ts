import * as z from 'zod';

const verifyOtpSchema = {
  otp: z
    .string({
      required_error: 'Otp cannot be empty.',
    })
    .min(6, 'Please enter a min of 6 characters.'),
};

export const verifyOtpPostSchema = z.object(verifyOtpSchema);

export type VerifyOtpFormData = z.infer<typeof verifyOtpPostSchema>;
