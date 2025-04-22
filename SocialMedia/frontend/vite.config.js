import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      // Proxy all requests to the API endpoint
      '/evaluation-service': {
        target: 'http://20.244.56.144',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/evaluation-service/, ''),
      },
    },
  },
});
