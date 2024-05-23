import {z} from 'zod';

export interface IBloodSeeker {
  id: number;
  blood_group: string;
  hemoglobin_point?: number | null;
  amount_of_blood: number;
  patient_problem: string;
  district: string;
  hospital_name: string;
  mobile_number: string[];
  views_count: number;
  call_count: number;
  message_count: number;
  whatsapp_number?: string;
  facebook_account_url?: string;
  gender?: 'male' | 'female' | 'other';
  relationship?: string;
  delivery_time: Date;
  urgent: boolean;
  description?: string;
}

export const requestSchema = z
  .object({
    blood_group: z.string().min(1),
    hemoglobin_point: z.number().optional(),
    amount_of_blood: z.number().int().positive(),
    patient_problem: z.string().min(1),
    district: z.string().min(1),
    hospital_name: z.string().min(1),
    mobile_number: z.array(z.string()),
    whatsapp_number: z.string(),
    facebook_account_url: z.string().url().optional(),
    gender: z.enum(['male', 'female', 'other']).optional(),
    relationship: z.string().optional(),
    delivery_time: z.date(),
    urgent: z.boolean().default(true),
    description: z.string().optional(),
  })
  .required();
