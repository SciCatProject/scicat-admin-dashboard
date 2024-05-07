import type { AuthProvider } from '@refinedev/core';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { getCookie, removeCookie, setCookie } from '../../utils/utils';
import { envConfig } from '../../../configuration';

type jwtTokenWithUsername = JwtPayload & {
  username: string;
};

export const authProvider: AuthProvider = {
  login: async ({ username, email, password }) => {
    if ((username || email) && password) {
      const response = await fetch(`${envConfig.API_URL}/users/login`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username || email,
          password: password,
        }),
      });

      const { access_token } = await response.json();
      const decodedToken = jwtDecode(access_token);

      if (response.ok) {
        setCookie(envConfig.TOKEN_KEY, access_token, decodedToken);

        return {
          success: true,
          redirectTo: '/',
        };
      }
    }

    return {
      success: false,
      error: {
        name: 'LoginError',
        message: 'Invalid username or password',
      },
    };
  },
  logout: async () => {
    removeCookie(envConfig.TOKEN_KEY);
    return {
      success: true,
      redirectTo: '/login',
    };
  },
  check: async () => {
    const token = getCookie(envConfig.TOKEN_KEY);
    if (token) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      redirectTo: '/login',
    };
  },
  getPermissions: async () => null,
  getIdentity: async () => {
    const token = getCookie(envConfig.TOKEN_KEY);

    if (token) {
      const decodedToken = jwtDecode(token) as jwtTokenWithUsername;
      return {
        name: decodedToken.username,
        avatar: 'https://i.pravatar.cc/300',
      };
    }
    return null;
  },
  onError: async (error) => {
    console.error(error);
    return { error };
  },
};
