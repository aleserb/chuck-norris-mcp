# Chuck Norris MCP

MCP (Model Context Protocol) server serving random Chuck Norris facts.

## Installation

### Claude Code

```bash
/plugin install chuck-norris-mcp
/chuck                    # Random fact
/chuck dev               # Dev-focused fact
```

### Gemini CLI

Add to `~/.gemini/settings.json`:

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

### ChatGPT (via Cline / MCP-compatible client)

Add to your client's MCP config:

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

Then use the `get_chuck_fact` tool (parameters: `category`, `source`).

## Available Categories

animal, career, celebrity, dev, explicit, fashion, food, history, money, movie, music, political, religion, science, sport, travel

## Requirements

- **Node.js** 18+
- **npm** (comes with Node.js)

## Building Locally

See [CONTRIBUTING.md](CONTRIBUTING.md) for development setup, building, and testing instructions.

## License

MIT

## Credits

- Facts source: [chucknorris-io](https://github.com/chucknorris-io/api) for the Chuck Norris API
- Dev facts: [Jenkins chucknorris-plugin](https://github.com/jenkinsci/chucknorris-plugin)
