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
  delivery_time?: Date;
  urgent: boolean;
  description?: string;
}
