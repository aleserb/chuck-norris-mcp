# Chuck Norris MCP

Vendor-neutral MCP (Model Context Protocol) server serving random Chuck Norris facts. Works with Claude Code, ChatGPT + Cline, GitHub Copilot, Gemini, and any MCP-compatible AI agent.

## Features

- 🥊 **300 Chuck Norris facts** (82 dev-focused + 218 from other categories)
- 📡 **Vendor-neutral MCP server** — works with Claude, Copilot, Gemini, ChatGPT, Cline, and more
- 🔌 **Claude Code bonus** — `/chuck [category]` slash command for seamless fact retrieval
- 📴 **Offline-first** — facts cached locally, no internet required
- 🎯 **16 categories** — dev, science, sport, movie, animal, food, history, money, celebrity, career, explicit, fashion, music, political, religion, travel

## Quick Start

### Claude Code
```bash
/plugin install chuck-norris-mcp
/chuck                    # Random fact
/chuck dev               # Dev-focused fact
```

### Other Clients (Cline, Copilot, Gemini, etc.)

Add to your MCP config:
```json
{
  "chuck-norris": {
    "command": "npx",
    "args": ["-y", "chuck-norris-mcp"]
  }
}
```

Then use the `get_chuck_fact` tool (parameters: `category`, `source`).

## Available Categories

animal, career, celebrity, dev, explicit, fashion, food, history, money, movie, music, political, religion, science, sport, travel

## Requirements

- **Node.js** 18+
- **npm** (comes with Node.js)

## Building Locally

See [CONTRIBUTING.md](CONTRIBUTING.md) for development setup, building, and testing instructions.

## Vendor-Neutral Design

This project is built on the **Model Context Protocol (MCP)**, which is vendor-neutral and AI-platform agnostic. One implementation serves all AI platforms — no lock-in, no duplication.

## License

MIT

## Credits

- Facts source: [chucknorris-io](https://github.com/chucknorris-io/api) for the Chuck Norris API
- Dev facts: [Jenkins chucknorris-plugin](https://github.com/jenkinsci/chucknorris-plugin)
