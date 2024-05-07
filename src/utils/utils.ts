import { JwtPayload } from 'jwt-decode';

export const setCookie = (name: string, value: string, JwtPayload: JwtPayload) => {
  if (!JwtPayload.exp) {
    throw new Error('expirationTimestamp is required');
  }
  const expirationTime = JwtPayload.exp * 1000;
  const expires = new Date(expirationTime).toUTCString();
  document.cookie = `${name}=${value};Expires=${expires};path=/`;
};

export const getCookie = (name: string) => {
  const cookies = document.cookie.split(';');
  const cookie = cookies.find((cookie) => cookie.includes(name));
  const token = cookie?.split('=')[1];
  return token;
};

export const removeCookie = (name: string) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/`;
};
