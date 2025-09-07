import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Use '/' in dev so routes work locally, and GH Pages subpath in production
  base: mode === 'production' ? '/janasikhsha_web_app/' : '/',
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://192.168.29.167:8082',
        changeOrigin: true,
        secure: false,
      },
    },
  },
}));
