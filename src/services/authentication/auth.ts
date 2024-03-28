import axios, { AxiosResponse } from 'axios';
import { request } from '@utils/request';
import { getRoute } from '@utils/route';
import authenticationSession from '@utils/authenticationSession';
import { INVALID_RESPONSE_ERROR, REFRESH_TOKEN_REJECTED_ERROR } from '@constants/error';
import { STORAGE_KEYS } from '@constants/storage';

const AUTHENTICATION_METHODS = {
  REVOKE_TOKEN: {
    endpoint: '/oauth/revoke',
  },
};

export const handleRefreshToken = async (refreshToken: string, scope: string) => {
  try {
    const res: AxiosResponse = await request({
      url: AUTHENTICATION_METHODS.EMAIL.endpoint,
      method: 'POST',
      data: {
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: `${import.meta.env.APP_CLIENT_ID}`,
        client_secret: `${import.meta.env.APP_CLIENT_SECRET}`,
        scope: scope,
      },
    });
    if (res.data?.access_token) {
      const tokenInfo = res.data;
      return {
        id: tokenInfo.resource_id,
        accessToken: tokenInfo.access_token,
        refreshToken: tokenInfo.refresh_token,
        tokenType: tokenInfo.token_type,
        expiresIn: tokenInfo.expires_in,
        createdAt: tokenInfo.created_at,
        authenticatedOwner: tokenInfo.resource_owner,
        authenticatedId: tokenInfo.resource_id,
        scope: tokenInfo.scope,
      };
    }
    throw new Error(INVALID_RESPONSE_ERROR);
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      return {
        id: '',
        error: REFRESH_TOKEN_REJECTED_ERROR,
      };
    }
    return {
      id: '',
      error: (error as { message: string })?.message,
    };
  }
};

const prepareAuthenticationFormData = (table: string) => {
  const data = new URLSearchParams();
  data.append('grant_type', 'password');
  data.append('client_id', `${import.meta.env.APP_CLIENT_ID}`);
  data.append('client_secret', `${import.meta.env.APP_CLIENT_SECRET}`);
  data.append('scope', table);

  return data;
};

type AuthenticationResponse = {
  access_token: string;
  refresh_token?: string;
  resource_owner: string;
  resource_id: number | string;
  token_type: string;
  expires_in?: number;
  created_at: number;
  scope: string;
};
const parseAuthenticationInfo = (res: AuthenticationResponse) => {
  return {
    id: `${res.resource_id}`,
    accessToken: res.access_token,
    refreshToken: res.refresh_token,
    authenticatedOwner: res.resource_owner,
    authenticatedId: res.resource_id,
    tokenType: res.token_type,
    expiresIn: res.expires_in,
    scope: res.scope,
    createdAt: res.created_at,
  };
};

type RevokeTokenPayload = { token: string; token_type_hint?: string };
const revokeToken = async (credentials: RevokeTokenPayload) => {
  if (!credentials) {
    throw new Error('Missing params');
  }
  try {
    const data = new URLSearchParams();
    data.append('token', credentials.token);
    if (credentials.token_type_hint) {
      data.append('token_type_hint', credentials.token_type_hint);
    }

    await request({
      url: AUTHENTICATION_METHODS.REVOKE_TOKEN.endpoint,
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${import.meta.env.VITE_APP_CLIENT_ID}:${import.meta.env.VITE_APP_CLIENT_ID}`,
        ).toString('base64')}`,
      },
      data,
    });
  } finally {
    return {
      id: '',
      authenticatedOwner: '',
      authenticatedId: 1,
      accessToken: '',
    };
  }
};

export const signIn = async (key: string, credentials: RevokeTokenPayload) => {
  if (key === 'revokeToken') return await revokeToken(credentials as RevokeTokenPayload);
};
