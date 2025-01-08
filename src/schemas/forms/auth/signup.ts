import * as z from 'zod';

const signupSchema = {
  email: z.string().email('Please provide a valid email address.'),
};

export const signupPostSchema = z.object(signupSchema);

export type SignupFormData = z.infer<typeof signupPostSchema>;
