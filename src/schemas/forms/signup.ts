import * as z from 'zod';

const signupSchema = {
  email: z.string().min(2, 'Please provide valid email address.'),
};

export const signupPostSchema = z.object(signupSchema);

export const loginPutSchema = z.object({
  ...signupSchema,
  email: signupSchema.email.nullable().optional().or(z.literal('')),
});

export type SignupFormData = z.infer<typeof signupPostSchema> | z.infer<typeof loginPutSchema>;
