import { useMutation, MutateOptions, useQueryClient } from 'react-query';
import { CreatePatientRequestBody, CreatePatientResponseBody, createPatientApi } from './request';

export const useCreatePatientMutation = (
  options: MutateOptions<
    CreatePatientResponseBody,
    unknown,
    CreatePatientRequestBody,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();
  return useMutation(createPatientApi, {
    ...options,
    onSuccess: (data, variables, context) => {
      options.onSuccess && options.onSuccess(data, variables, context);
      queryClient.invalidateQueries('Patient');
    },
  });
};

export * from './request';
