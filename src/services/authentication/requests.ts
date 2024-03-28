import { serviceFetch, objectToFormData } from '@utils/service';
import pluralize from 'pluralize';
import { getRoute } from '@utils/route';
import authenticationSession from '@utils/authenticationSession';
import { STORAGE_KEYS } from '@constants/storage';
import { signIn } from './auth';

export type SuccessResponse = { success: true };

export type TokenResponse = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
  resource_owner: string;
  resource_id: number;
  created_at: Date;
  refresh_token_expires_in: number;
};

export const logout = async () => {
  authenticationSession.clearAuthentication();
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEYS.AUTHENTICATION);
    localStorage.removeItem(STORAGE_KEYS.TOKEN_CREATED_TIME);
  }
};
