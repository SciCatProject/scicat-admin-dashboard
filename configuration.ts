const useConfig = () => {
  const variables = {
    API_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v3',
    TOKEN_KEY: import.meta.env.VITE_TOKEN_KEY || 'refine-auth',
  };

  return { envConfig: variables };
};

export const { envConfig } = useConfig();
