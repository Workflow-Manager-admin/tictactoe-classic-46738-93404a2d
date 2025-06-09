import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [react()],
  vite: {
    server: {
      host: '0.0.0.0',
      allowedHosts: ['*'],
      port: 3000,
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    }
  }
});
