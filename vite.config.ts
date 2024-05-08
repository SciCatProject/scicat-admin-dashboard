import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 5173,
    open: true,
  },
  plugins: [react()],
  define: {
    'import.meta.env.VITE_API_URL': JSON.stringify(process.env.VITE_API_URL),
    'import.meta.env.VITE_NODE_ENV': JSON.stringify(process.env.VITE_NODE_ENV),
    'import.meta.env.VITE_TOKEN_KEY': JSON.stringify(process.env.VITE_TOKEN_KEY),
  },
});
