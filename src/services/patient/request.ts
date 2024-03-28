import { serviceFetch } from '@utils/service';
import { getRoute } from '@utils/route';
import { PatientModel } from '@models/patient';

export type CreatePatientRequestBody = {
  patients: {
    mobile_number?: string;
    first_name?: string;
    middle_name?: string;
    last_name?: string;
    email?: string;
    last_consult_id?: number;
  };
};

export type CreatePatientResponseBody = {
  patient: PatientModel;
  error_object: any;
};

export const createPatientApi = async (
  body: CreatePatientRequestBody,
): Promise<CreatePatientResponseBody> => {
  return serviceFetch({
    url: getRoute('/api/patients', body),
    method: 'POST',
    data: body,
  });
};
