import * as z from 'zod';

const loginSchema = {
  email: z
    .string({
      required_error: 'Please provide a valid email address.',
    })
    .email('Please provide a valid email address.'),
  password: z
    .string({
      required_error: 'Password cannot be empty.',
    })
    .min(8, 'Please enter a minimum of 8 characters.'),
};

export const loginPostSchema = z.object(loginSchema);

export type LoginFormData = z.infer<typeof loginPostSchema>;
