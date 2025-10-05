import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Always use root path for VPS deployment (override with BASE_PATH env for GitHub Pages)
  base: process.env.BASE_PATH || '/',
  plugins: [react()],
  server: {
    proxy: {
      // Proxy API requests to bypass CORS in development
      '/api': {
        target: 'https://jpkindia.org',
        changeOrigin: true,
        secure: true,
        configure: (proxy, options) => {
          proxy.on('error', (err, req, res) => {
            console.log('Proxy error:', err);
          });
          proxy.on('proxyReq', (proxyReq, req, res) => {
            console.log('Proxying request to:', proxyReq.path);
          });
        }
      }
    }
  }
}));
