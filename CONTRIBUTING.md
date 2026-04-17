# Contributing

Thanks for your interest! This document explains how to set up, build, and test the Chuck Norris MCP server locally.

## Development Setup

### Prerequisites

- **Node.js** 18 or higher
- **npm** (comes with Node.js)

### Install Dependencies

```bash
npm install
```

This installs:
- `@modelcontextprotocol/sdk` — MCP protocol implementation
- `zod` — Input validation
- `tsup` — Bundler
- `typescript` — TypeScript compiler
- `@types/node` — Node.js type definitions

## Building

### Build the Project

```bash
npm run build
```

Produces `dist/index.js` — a self-contained executable (~750 KB) bundling the MCP server and all dependencies.

### Watch Mode (for development)

```bash
npm run dev
```

TypeScript files recompile on save.

## Testing

### MCP Inspector (Interactive Tool Testing)

```bash
npm run build
npx @modelcontextprotocol/inspector node dist/index.js
```

Browser UI opens where you can:
- Call `list_categories` to see available categories (16 total)
- Call `get_chuck_fact` with optional category and source parameters
- Inspect JSON-RPC responses in real time

### In Claude Code (Plugin Testing)

1. In Claude Code: **Plugins** → **Install Plugin** → **From Local Directory**
2. Select the `chuck-norris-mcp` directory
3. Test the `/chuck` command:
   ```
   /chuck                    # Random fact from any category
   /chuck dev               # Dev-category fact
   /chuck science           # Science-category fact
   ```

### Direct Command Line (for debugging)

```bash
npx chuck-norris-mcp
```

Then pipe JSON-RPC commands via stdin:

```bash
echo '{"jsonrpc":"2.0","id":1,"method":"tools/list","params":{}}' | npx chuck-norris-mcp
```

## Code Structure

```
src/
  ├── index.ts         # CLI entry point (stdio transport)
  ├── server.ts        # MCP server + tool registration
  ├── facts.ts         # 300 Chuck Norris facts (82 dev + 218 other)
  ├── categories.ts    # 16 categories (constants & types)
  └── api.ts           # External API wrapper (chucknorris.io)
```

## Adding Facts

To add more facts to a category:

1. Open `src/facts.ts`
2. Add new `ChuckFact` objects to the `LOCAL_FACTS` array with:
   - `id`: unique identifier (e.g., `category-001`)
   - `value`: the fact text
   - `category`: one of the 16 categories

3. Build and test:
   ```bash
   npm run build
   npx @modelcontextprotocol/inspector node dist/index.js
   ```

## Extending Categories

To add a new category:

1. Update `src/categories.ts` — add to the `CATEGORIES` array
2. Update `src/facts.ts` — add facts with the new category
3. Update documentation (README.md, CLAUDE.md)
4. Build and test

## Git Workflow

```bash
# Make changes
git add src/facts.ts CONTRIBUTING.md    # stage files
git commit -m "Add new facts for category X"

# Before publishing to npm
npm run build
```

## Publishing to npm

```bash
npm run build
npm publish --access public
```

Then update `.mcp.json` in the plugin to use the published version:

```json
{
  "chuck-norris": {
    "command": "npx",
    "args": ["-y", "chuck-norris-mcp"]
  }
}
```

## Questions?

- Check existing issues and PRs
- Review the [MCP spec](https://modelcontextprotocol.io)
- See [CLAUDE.md](CLAUDE.md) for implementation details
