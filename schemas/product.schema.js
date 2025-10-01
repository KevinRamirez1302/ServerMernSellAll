import { z } from 'zod';

export const productsChema = z.object({
  name: z.string({ required_error: 'Name errors' }),
  description: z
    .string()
    .min(10, { required_error: 'Description must be more than 10 ' }),
  price: z.number({ required_error: 'Price must be a number' }),
  image: z.string().url({ required_error: 'Url must be a url type' }),
  quantity: z.number({ required_error: 'Quantity must be a number' }),
});
