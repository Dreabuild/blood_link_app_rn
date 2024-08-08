import {z} from 'zod';

export const reviewSchema = z
  .object({
    name: z.string(),
    email: z.string(),
    mobile_number: z.string(),
    comments: z.string(),
  })
  .required();
