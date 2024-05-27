import {z} from 'zod';

export interface IBloodSeeker {
  id: number;
  blood_group: 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-';
  hemoglobin_point?: number;
  amount_of_blood: number;
  patient_problem: string;
  district: string;
  hospital_name: string;
  mobile_number: string[];
  whatsapp_number: string;
  facebook_account_url?: string;
  views_count?: number;
  call_count?: number;
  message_count?: number;
  gender?: 'male' | 'female' | 'other';
  relationship?: null | string;
  delivery_time: string;
  urgent: boolean;
  description?: string;
}

export const bloodSeekerSchema = z
  .object({
    blood_group: z.enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']),
    hemoglobin_point: z.number().optional(),
    amount_of_blood: z.number().int().positive(),
    patient_problem: z.string(),
    district: z.string().min(1),
    hospital_name: z.string().min(1),
    mobile_number: z.array(z.string()).min(1),
    whatsapp_number: z.string(),
    facebook_account_url: z.string().url().optional(),
    gender: z.enum(['male', 'female', 'other']).optional(),
    views_count: z.number().default(0),
    call_count: z.number().default(0),
    message_count: z.number().default(0),
    relationship: z.string().optional(),
    delivery_time: z.date(),
    urgent: z.boolean().default(false),
    description: z.string().optional(),
  })
  .required();
