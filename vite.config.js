import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// BASE_PATH can be overridden for GitHub Pages builds (e.g. BASE_PATH=/janasikhsha_web_app/)
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  base,
  plugins: [react()],
});
