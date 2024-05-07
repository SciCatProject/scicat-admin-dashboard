import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 8888,
    open: true,
  },
  plugins: [react()],
});
