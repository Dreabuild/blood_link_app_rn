export interface IBloodSeeker {
  id: number;
  blood_group: string;
  hemoglobin_point: number;
  amount_of_blood: number;
  patient_problem: string;
  district: string;
  hospital_name: string;
  mobile_number: string;
  whatsapp_number: string;
  facebook_account_url: string;
  gender: 'male' | 'female';
  relationship: null | string;
  delivery_time: string;
  urgent: boolean;
  description: string;
  views_count: number;
}
