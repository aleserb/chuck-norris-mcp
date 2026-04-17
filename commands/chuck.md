---
description: Get a random Chuck Norris fact (optional category filter)
argument-hint: "[category]"
allowed-tools:
  - "mcp__plugin_chuck_norris_chuck_norris__get_chuck_fact"
  - "mcp__plugin_chuck_norris_chuck_norris__list_categories"
---

Fetch a Chuck Norris fact using the chuck-norris MCP server.

If the user provided a category argument ($ARGUMENTS), pass it as the `category`
parameter to `mcp__plugin_chuck_norris_chuck_norris__get_chuck_fact`.

If no argument was given, call `mcp__plugin_chuck_norris_chuck_norris__get_chuck_fact`
without a category to get a random fact from any available category.

Always present the result like this:

> **Chuck Norris fact:** <fact text>

If the user asked "what categories are there?" or "list categories", call
`mcp__plugin_chuck_norris_chuck_norris__list_categories` instead and present
the list in a friendly way like:

> **Available categories:** <comma-separated list>
