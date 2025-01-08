import * as z from 'zod';

export const signupPasswordPostSchema = z
  .object({
    password: z.string().min(8, 'Password must be at least 8 characters long.'),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'Passwords must match.',
    path: ['password_confirmation'],
  });

export type SignupPasswordFormData = z.infer<typeof signupPasswordPostSchema>;
