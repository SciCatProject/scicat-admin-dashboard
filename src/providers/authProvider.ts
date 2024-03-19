import type { AuthBindings } from '@refinedev/core';
import { API_URL, TOKEN_KEY } from '../contexts/constant';

export const authProvider: AuthBindings = {
  login: async ({ username, email, password }) => {
    if ((username || email) && password) {
      const response = await fetch(`${API_URL}/users/login`, {
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

      if (response.ok) {
        localStorage.setItem(TOKEN_KEY, access_token);

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
    localStorage.removeItem(TOKEN_KEY);
    return {
      success: true,
      redirectTo: '/login',
    };
  },
  check: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
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
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      return {
        id: 1,
        name: 'John Doe',
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
