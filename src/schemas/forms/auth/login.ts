import * as z from 'zod';

const loginSchema = {
  email: z.string().min(2, 'Please provide valid email address.'),
  password: z.string().min(2, 'Please enter at least 2 characters.'),
};

export const loginPostSchema = z.object(loginSchema);

export type LoginFormData = z.infer<typeof loginPostSchema>;
