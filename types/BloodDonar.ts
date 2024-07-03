import {z} from 'zod';

export interface IBloodDonar {
  blood_group: string;
  district: string;
  phone_number: string;
  gender: 'male' | 'female';
  name: string;
  street_address: string;
  birth_year: string;
}

export const bloodDonarSchema = z
  .object({
    name: z.string(),
    street_address: z.string(),
    birth_year: z.string().min(4),
    blood_group: z.enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']),
    district: z.string().min(1),
    phone_number: z.string(),
    gender: z.enum(['male', 'female']),
  })
  .required();
