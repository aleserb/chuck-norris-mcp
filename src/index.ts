import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { createServer } from './server.js';

const server = createServer();
const transport = new StdioServerTransport();

server.connect(transport).catch((err) => {
  process.stderr.write(`Fatal: ${err}\n`);
  process.exit(1);
});
