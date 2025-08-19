import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/janasikhsha_web_app/', // Set base for GitHub Pages
  plugins: [react()],
});
