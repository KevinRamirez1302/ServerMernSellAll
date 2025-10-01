import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string({
    required_error: 'Name error',
  }),
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email({
      required_error: 'Invalid Email',
    }),
  password: z.string({ required_error: 'Password is requires' }).min(6, {
    required_error: 'Password must be at least 6 characters',
  }),
});

export const loginSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email({
      required_error: 'Invalid Email',
    }),
  password: z.string({ required_error: 'Password is required' }).min(6, {
    required_error: 'Password must be at least 6 characters',
  }),
});
