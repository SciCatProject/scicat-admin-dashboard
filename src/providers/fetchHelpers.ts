import { API_URL, TOKEN_KEY } from '../contexts/constant';

export type URLOptions = {
  resource: string;
  endpoint?: string;
  params: Record<string, string>;
};

export type HttpMethods = 'GET' | 'POST' | 'PUT' | 'DELETE';

export const buildURL = ({ resource, endpoint, params }: URLOptions) => {
  const query = new URLSearchParams(params).toString();
  const endpointPath = endpoint ? `/${endpoint}` : '';
  const url = `${API_URL}/${resource}${endpointPath}?${query}`;

  return url;
};

export const fetchResource = async (url: string, method: HttpMethods = 'GET') => {
  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
    },
  });
  if (!response.ok) throw new Error('Failed to fetch data');
  return response.json();
};
