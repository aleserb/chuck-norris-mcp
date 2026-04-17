# Chuck Norris MCP

Vendor-neutral MCP (Model Context Protocol) server serving random Chuck Norris facts. Works with Claude Code, ChatGPT + Cline, GitHub Copilot, Gemini, and any MCP-compatible AI agent.

## Features

- 🥊 **82 developer-focused Chuck Norris facts** from the Jenkins chucknorris-plugin
- 📡 **Vendor-neutral MCP server** — works with Claude, Copilot, Gemini, ChatGPT, Cline, and more
- 🔌 **Claude Code bonus** — optional `/chuck [category]` slash command for seamless fact retrieval
- 📴 **Offline-first** — all dev facts cached locally, no internet required
- 🎯 **Extensible** — architecture supports adding more categories from api.chucknorris.io

## Prerequisites

- **Node.js** 18 or higher
- **npm** (comes with Node.js)
- Any MCP-compatible AI client (Claude Code, Cline, etc.)

## Installation

### Claude Code

**Local development:**
1. Clone/download this repository
2. In Claude Code: **Plugins** → **Install Plugin** → **From Local Directory**
3. Select the `chuck-norris-mcp` folder
4. Use `/chuck` command immediately

**Published (after `npm publish`):**
```bash
/plugin install chuck-norris-mcp
```

### ChatGPT + Cline / VS Code Claude Extension

Add to `cline_mcp_config.json`:
```json
{
  "mcpServers": {
    "chuck-norris": {
      "command": "npx",
      "args": ["-y", "chuck-norris-mcp"]
    }
  }
}
```

Then use tools in ChatGPT as usual.

### GitHub Copilot / Gemini / Other MCP Clients

Install the npm package:
```bash
npm install chuck-norris-mcp
```

Configure your client to use the stdio transport:
```json
{
  "chuck-norris": {
    "command": "npx",
    "args": ["-y", "chuck-norris-mcp"]
  }
}
```

### Direct Command Line

```bash
npx chuck-norris-mcp
```

Then pipe JSON-RPC commands via stdin, or use MCP Inspector (see Testing section).

## Usage

### In Claude Code (Bonus: Slash Command)

Use the friendly `/chuck` command:

```
/chuck                    # Random dev fact
/chuck dev               # Random dev fact (explicit)
/chuck science           # Random fact from science category (when available)
```

### In Other MCP Clients

Use the exposed tools directly (command syntax varies by client):

- **Tool 1: `get_chuck_fact`**
  - Parameters: `category` (optional), `source` (optional: auto/local/api)
  - Returns: Random Chuck Norris fact

- **Tool 2: `list_categories`**
  - Parameters: none
  - Returns: Comma-separated list of available categories

### Testing with MCP Inspector

```bash
npm run build
npx @modelcontextprotocol/inspector node dist/index.js
```

Browser UI opens where you can interactively call both tools and inspect JSON-RPC responses.

### Direct Command Line (for debugging)

```bash
npx chuck-norris-mcp
```

Then pipe JSON-RPC commands via stdin:

```bash
echo '{"jsonrpc":"2.0","id":1,"method":"tools/list","params":{}}' | npx chuck-norris-mcp
```

## Available Categories

**Local (Phase 1):**
- **dev** — 82 programmer/developer facts (always available offline)

**Via API (Phase 2+):**
- animal, career, celebrity, explicit, fashion, food, history, money, movie, music, political, religion, science, sport, travel

All 16 categories from api.chucknorris.io are supported. Categories other than `dev` will fetch from the API when available.

## Development

### Setup

```bash
npm install
```

### Build

```bash
npm run build
```

Produces `dist/index.js` — a bundled, self-contained executable with shebang.

### Development (watch mode)

```bash
npm run dev
```

TypeScript files are compiled on save.

### Testing

**MCP Inspector (interactive tool testing):**

```bash
npm run build
npx @modelcontextprotocol/inspector node dist/index.js
```

Use the browser UI to call both MCP tools and inspect responses.

**In Claude Code:**

1. Ensure the plugin is installed from the local directory
2. Run `/chuck` and verify you get a formatted blockquote
3. Test with category: `/chuck dev`
4. Test offline by disconnecting internet — dev facts should still work

## Project Structure

```
src/
  ├── index.ts       # CLI entry point (shebang + stdio transport)
  ├── server.ts      # McpServer definition and tool registration
  ├── facts.ts       # LOCAL_FACTS array and getRandomFact() function
  ├── categories.ts  # Category constants and type definitions
  └── api.ts         # External API wrapper (for future use)

.claude-plugin/
  └── plugin.json    # Plugin manifest

commands/
  └── chuck.md       # /chuck slash command definition

dist/               # (generated) bundled output
  └── index.js      # Executable entry point with shebang
```

## How It Works

### MCP Server (Vendor-Neutral Core)

The server exposes two standard MCP tools accessible from any compatible client:

**Tool 1: `list_categories`**
- Input: none
- Output: Comma-separated list of available categories
- Example response: `dev, science, sport, ...`

**Tool 2: `get_chuck_fact`**
- Input:
  - `category` (optional): Filter by category (e.g., "dev", "science")
  - `source` (optional): "auto", "local", or "api" (default: "auto")
- Output: Random Chuck Norris fact as text
- **Source modes:**
  - `auto`: Tries API for non-dev categories, falls back to local facts
  - `local`: Always uses LOCAL_FACTS (dev category in Phase 1)
  - `api`: Requires internet, throws error if unavailable

### Claude Code Plugin (Optional Convenience Layer)

Claude Code users get a bonus: the `/chuck` slash command.

1. Accepts optional category argument
2. Calls the MCP `get_chuck_fact` tool
3. Formats result as: `> **Chuck Norris fact:** <fact text>`

Other clients use the raw MCP tools with their native syntax.

## Facts Sources

### Phase 1 (Current)

**Dev Category**
- Source: [Jenkins chucknorris-plugin](https://github.com/jenkinsci/chucknorris-plugin/blob/master/src/main/resources/hudson/plugins/chucknorris/FactGenerator.properties)
- Count: 82 facts
- License: MIT
- Status: Hardcoded in `src/facts.ts`

### Phase 2 (Planned)

**Other Categories**
- Source: api.chucknorris.io and/or other collections
- To be added incrementally

## Vendor-Neutral Design

This project is built on the **Model Context Protocol (MCP)**, which is vendor-neutral and AI-platform agnostic. 

**Core benefits:**
- Same MCP server works with Claude, OpenAI, Google, Anthropic, and custom agents
- Claude Code users get a bonus: `/chuck` slash command (convenience layer)
- Other clients use standard MCP tool invocation
- No lock-in: the server is independent of any specific AI platform

**Why this approach:**
1. One implementation serves all AI platforms
2. Reduces maintenance: changes to MCP server automatically benefit all clients
3. Community-driven: MCP is an open standard, not vendor-specific

## Building for Publication

To publish to npm:

```bash
npm run build
npm publish --access public
```

Once published, all clients can install via:
```bash
# Claude Code
/plugin install chuck-norris-mcp

# Others
npm install chuck-norris-mcp
# Then configure in your client's MCP config
```

## License

MIT — See [LICENSE](LICENSE) file

## Contributing

Contributions welcome! To add facts:

1. Fork/clone the repo
2. Add facts to `src/facts.ts` with appropriate category
3. Run `npm run build` and test with MCP Inspector
4. Submit a pull request

## Author

Aleksandr Serbin (aserbin@microsoft.com)
