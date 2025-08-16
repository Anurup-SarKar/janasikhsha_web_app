import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import pkg from './package.json' with { type: 'json' };

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const homepage = pkg?.homepage;
  const baseFromHomepage = (() => {
    try {
      if (!homepage) return '/';
      const url = new URL(homepage);
      return url.pathname.endsWith('/') ? url.pathname : `${url.pathname}/`;
    } catch {
      return '/';
    }
  })();

  return {
    base: mode === 'production' ? baseFromHomepage : '/',
    plugins: [react()],
  };
});
