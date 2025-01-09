import * as z from 'zod';

export const resetSchema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters long.'),
});

export type ResetFormData = z.infer<typeof resetSchema>;
