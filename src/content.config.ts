import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({
    base: './src/content/blog',
    pattern: '**/*.md',
    generateId: ({ entry }) => entry.replace(/\.md$/, '').replace(/(^|\/)\d{4}-\d{2}-\d{2}-/, '$1'),
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    author: z.string(),
    category: z.string(),
    tags: z.array(z.string()),
    image: z.string(),
    featured: z.boolean().default(false),
    locale: z.enum(['zh', 'en']),
    legacySlug: z.string(),
    sourceUrl: z.url(),
    sourceCommit: z.string(),
  }),
});

export const collections = { blog };
