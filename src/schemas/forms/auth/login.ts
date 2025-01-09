import * as z from 'zod';

const loginSchema = {
  email: z.string().email('Please provide a valid email address.'),
  password: z.string().min(8, 'Please enter minimum of 8 characters.'),
};

export const loginPostSchema = z.object(loginSchema);

export type LoginFormData = z.infer<typeof loginPostSchema>;
