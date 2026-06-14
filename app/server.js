/**
 * nutrition-plan · local dev server
 * Zero npm dependencies — uses Node.js built-ins only.
 * Run: node server.js
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const ROOT = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.js':   'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
};

const server = http.createServer((req, res) => {
  // Strip query strings and resolve the requested path
  const urlPath = req.url.split('?')[0];
  const filePath = path.join(ROOT, urlPath === '/' ? 'index.html' : urlPath);

  // Security: block any path that escapes the project root
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'text/plain; charset=utf-8';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end(`404 — Not found: ${urlPath}`);
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 — Internal server error');
      }
      return;
    }

    res.writeHead(200, {
      'Content-Type': contentType,
      // Disable caching in dev so edits show up immediately on refresh
      'Cache-Control': 'no-store',
    });
    res.end(data);
  });
});

server.listen(PORT, '127.0.0.1', () => {
  console.log('');
  console.log('  ✓ Nutrition Plan running at:');
  console.log(`    http://localhost:${PORT}`);
  console.log('');
  console.log('  Ctrl+C to stop');
  console.log('');
});
