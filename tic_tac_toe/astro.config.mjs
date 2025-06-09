// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  server: {
      host: '0.0.0.0',
      allowedHosts: ['*'],
      port: 3000,
      headers: {
          'Access-Control-Allow-Origin': '*'
      },
  },

  integrations: [react()]
})