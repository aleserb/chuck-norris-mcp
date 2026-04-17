import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { CATEGORIES } from './categories.js';
import { getRandomFact } from './facts.js';
import { fetchFactFromApi } from './api.js';

export function createServer(): McpServer {
  const server = new McpServer(
    { name: 'chuck-norris', version: '1.0.0' },
    {
      instructions:
        'Use get_chuck_fact to retrieve a random Chuck Norris fact. Use list_categories to see available categories before filtering.',
    }
  );

  server.registerTool(
    'list_categories',
    {
      description: 'List all available Chuck Norris fact categories.',
      inputSchema: z.object({}),
      annotations: { readOnlyHint: true },
    },
    async () => ({
      content: [{ type: 'text', text: CATEGORIES.join(', ') }],
    })
  );

  server.registerTool(
    'get_chuck_fact',
    {
      description:
        'Get a random Chuck Norris fact. Optionally filter by category. Tries the chucknorris.io API first, falls back to local DB.',
      inputSchema: z.object({
        category: z
          .enum(CATEGORIES)
          .optional()
          .describe('Optional category filter. Call list_categories first to see options.'),
        source: z
          .enum(['auto', 'local', 'api'])
          .optional()
          .default('auto')
          .describe('"auto" tries API first, "local" uses local DB only, "api" requires API.'),
      }),
      annotations: { readOnlyHint: true },
    },
    async ({ category, source = 'auto' }) => {
      let fact: string | null = null;

      if (source === 'local') {
        fact = getRandomFact(category).value;
      } else if (source === 'api') {
        fact = await fetchFactFromApi(category);
        if (!fact) throw new Error('API unavailable');
      } else {
        const tryApi = category !== undefined || Math.random() < 0.7;
        if (tryApi) fact = await fetchFactFromApi(category);
        if (!fact) fact = getRandomFact(category).value;
      }

      return {
        content: [{ type: 'text', text: fact }],
      };
    }
  );

  return server;
}
