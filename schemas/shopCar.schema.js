import mongoose from 'mongoose';
import { z } from 'zod';

export const shopCar = z.object({
  name: z.string({
    required_error: 'Name error',
  }),
  price: z.number(),
  image: z.string(),
  quantity: z.number(),
  user: z.string(),
});
