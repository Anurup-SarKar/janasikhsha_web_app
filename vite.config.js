import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Use '/' in dev so routes work locally, and GH Pages subpath in production
  base: mode === 'production' ? '/janasikhsha_web_app/' : '/',
  plugins: [react()],
}));
