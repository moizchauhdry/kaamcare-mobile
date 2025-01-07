import * as z from 'zod';

const loginSchema = {
  email: z.string().min(2, 'Please provide valid email address.'),
  password: z.string().min(2, 'Please enter at least 2 characters.'),
};

export const loginPostSchema = z.object(loginSchema);

export const loginPutSchema = z.object({
  ...loginSchema,
  email: loginSchema.email.nullable().optional().or(z.literal('')),
  password: loginSchema.password.nullable().optional().or(z.literal('')),
});

export type LoginFormData = z.infer<typeof loginPostSchema> | z.infer<typeof loginPutSchema>;
