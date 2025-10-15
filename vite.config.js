import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Use '/' in dev so routes work locally, and GH Pages subpath in production
  base: mode === 'production' ? '/janasikhsha_web_app/' : '/',
  plugins: [react()],
  assetsInclude: ['**/*.pdf', '**/*.jpg', '**/*.png', '**/*.jpeg', '**/*.gif'],
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
