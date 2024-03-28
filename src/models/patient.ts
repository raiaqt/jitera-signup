export type PatientModel = {
  id: number;
  created_at: Date;
  updated_at: Date;
  mobile_number: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  email: string;
  last_consult_id: number;
};
