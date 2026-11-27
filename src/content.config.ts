import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const imageKey = z.enum(['mopping', 'kitchen', 'office', 'scrubbing', 'bathroom', 'livingRoom']);

// The file name is the URL: src/content/services/deep-cleaning.md -> /deep-cleaning/
const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z.object({
    name: z.string(),
    nav: z.string(), // short label for the header nav
    order: z.number(),
    title: z.string().max(60),
    description: z.string().max(155),
    summary: z.string(),
    price: z.string().default('[price]'), // TODO: real "from" price, digits only
    facts: z.array(z.string()).default(['[Property sizes]', '[Typical duration]', '[Team size]']),
    checklist: z.array(z.string()), // TODO: draft, edit to match what you really do
    images: z.array(imageKey).min(1).max(3),
    faqs: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
  }),
});

export const collections = { services };
