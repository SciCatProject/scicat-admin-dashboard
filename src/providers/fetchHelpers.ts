import { BaseKey } from '@refinedev/core';
import { getCookie } from '../utils/utils';
import { envConfig } from '../../configuration';

interface URLParamsOptions {
  resource: string;
  endpoint?: string;
  params: Record<string, string>;
}

interface URLIdOptions {
  resource: string;
  endpoint?: string;
  id: BaseKey;
}

export type HttpMethods = 'GET' | 'POST' | 'PUT' | 'DELETE';

export const buildUriWithParam = ({ resource, endpoint, params }: URLParamsOptions): string => {
  const query = new URLSearchParams(params).toString();
  const endpointPath = endpoint ? `/${endpoint}` : '';
  const apiUrl = envConfig.API_URL;
  return `${apiUrl}/${resource}${endpointPath}?${query}`;
};

export const buildUriWithId = ({ resource, endpoint, id }: URLIdOptions): string => {
  const encodedId = encodeURIComponent(id);
  const endpointPath = endpoint ? `/${endpoint}` : '';
  const apiUrl = envConfig.API_URL;
  return `${apiUrl}/${resource}${endpointPath}/${encodedId}`;
};

export const fetchResource = async (url: string, method: HttpMethods = 'GET') => {
  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookie(envConfig.TOKEN_KEY)}`,
    },
  });
  if (!response.ok) throw new Error(`Failed to fetch data: ${response.url}`);
  return response.json();
};
