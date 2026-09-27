// Local test server: runs the files in /api on your own computer,
// the same way Vercel does, without a Vercel account.
//
// Start it with:  npm run local
// Then open:      http://localhost:3000          (the page)
//                 http://localhost:3000/api/customers  (raw JSON)
//
// Only for testing on your computer. Vercel doesn't use this file.

import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';

const PORT = 3000;

// Page files (HTML, CSS, JS) live in /public, just like on Vercel
const PUBLIC_DIR = join(import.meta.dirname, 'public');
const TYPES = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.png': 'image/png', '.svg': 'image/svg+xml' };

async function serveFile(path, res) {
  const file = normalize(join(PUBLIC_DIR, path === '/' ? 'index.html' : path));
  if (!file.startsWith(PUBLIC_DIR)) return false; // block "../" tricks
  try {
    const body = await readFile(file);
    res.setHeader('Content-Type', (TYPES[extname(file)] || 'application/octet-stream') + '; charset=utf-8');
    res.end(body);
    return true;
  } catch {
    return false;
  }
}

const server = http.createServer(async (req, res) => {
  // Vercel gives handlers res.status() and res.json(). Plain Node doesn't,
  // so add small versions of them here.
  res.status = (code) => { res.statusCode = code; return res; };
  res.json = (body) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(body, null, 2));
    return res;
  };

  // "/api/customers?x=1" → "customers"
  const path = new URL(req.url, `http://${req.headers.host}`).pathname;
  const match = path.match(/^\/api\/([a-z0-9-]+)\/?$/i);

  if (!match) {
    // Not an API call, so try to send a page file from /public
    if (await serveFile(path, res)) return;
    return res.status(404).json({
      success: false,
      error: 'Not found. Try /api/customers',
    });
  }

  try {
    // Load api/<name>.js and call its default export, like Vercel does
    const { default: handler } = await import(`./api/${match[1]}.js`);
    await handler(req, res);
  } catch (err) {
    if (err.code === 'ERR_MODULE_NOT_FOUND') {
      return res.status(404).json({ success: false, error: `No file api/${match[1]}.js` });
    }
    console.error(err);
    res.status(500).json({ success: false, error: 'Server crashed. See the terminal.' });
  }
});

server.listen(PORT, () => {
  console.log(`Page → http://localhost:${PORT}`);
  console.log(`API  → http://localhost:${PORT}/api/customers`);
  console.log('Press Ctrl + C to stop.');
});
