import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  outDir: 'dist',
  target: 'node18',
  bundle: true,
  noExternal: ['@modelcontextprotocol/sdk', 'zod'],
  clean: true,
  splitting: false,
  sourcemap: false,
  esbuildOptions(options) {
    options.banner = {
      js: '#!/usr/bin/env node',
    };
  },
});
