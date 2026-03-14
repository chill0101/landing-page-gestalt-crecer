import { defineConfig } from 'astro/config';
import solidJs from '@astrojs/solid-js';

// https://astro.build/config
export default defineConfig({
  site: 'https://crecerjugando.com',
  integrations: [solidJs()],
  server: {
    port: 4321,
    host: true
  },
  build: {
    assets: 'assets'
  },
  markdown: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
  vite: {
    server: {
      hmr: true
    }
  }
});