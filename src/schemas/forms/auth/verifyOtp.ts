import * as z from 'zod';

const verifyOtpSchema = {
  otp: z.string().min(2, 'Please provide valid otp.'),
};

export const verifyOtpPostSchema = z.object(verifyOtpSchema);

export type VerifyOtpFormData = z.infer<typeof verifyOtpPostSchema>;
