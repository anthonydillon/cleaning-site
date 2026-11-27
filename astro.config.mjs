import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// PUBLIC_DEMO=1 builds the shareable prototype: forms don't send, CSS is inlined.
const demo = process.env.PUBLIC_DEMO === '1';

// TODO: replace with the real production domain before launch
export default defineConfig({
  site: 'https://www.example-cleaning.co.uk',
  trailingSlash: 'always',
  outDir: demo ? './dist-demo' : './dist',
  build: { inlineStylesheets: 'always', assets: demo ? 'assets' : '_astro' },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/thank-you/'),
    }),
  ],
});
