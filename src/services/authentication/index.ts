import { useMutation, MutateOptions } from 'react-query';

import { logout, SuccessResponse, TokenResponse } from './requests';

export const useLogoutMutation = (
  options: MutateOptions<unknown, unknown, unknown, unknown> = {},
) => useMutation(logout, options);
