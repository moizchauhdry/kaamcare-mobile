import * as z from 'zod';

export const signupPasswordPostSchema = z
  .object({
    password: z
      .string({
        required_error: 'Password cannot be empty.',
      })
      .min(8, 'Password must be at least 8 characters long.'),
    password_confirmation: z.string({
      required_error: 'Confirm Password cannot be empty.',
    }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'Passwords must match.',
    path: ['password_confirmation'],
  });

export type SignupPasswordFormData = z.infer<typeof signupPasswordPostSchema>;
