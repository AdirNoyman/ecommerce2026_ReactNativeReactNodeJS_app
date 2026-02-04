import express from 'express';
import type { Request, Response } from 'express';
import path from 'path';
import { ENV } from './config/env.js';

const app = express();

// Get the absolute path to the current directory
const __dirname = path.resolve();
console.log("__dirname is 👉", __dirname)

// Check health of the server in the api endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'OK', message: 'Server is healthy! ✅' });
});

// Environment-based routing: different behavior for production vs development
if (ENV.NODE_ENV === 'production') {
  // PRODUCTION MODE: Serve the built React admin panel
  // Serve static assets (JS, CSS, images) from the admin build directory
  app.use(express.static(path.join(__dirname, '../admin/dist')));

  // Catch-all route handler for client-side routing
  // This ensures that any route (e.g., /products, /users) returns index.html
  // allowing React Router to handle navigation on the client side
  app.get("/{*any}", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../admin/dist', 'index.html'));
  });
} else {
  // DEVELOPMENT MODE: Simple status message
  // In dev, the React admin panel typically runs on its own dev server (e.g., Vite on port 5173)
  // so this backend just confirms it's running
  app.get('/', (req: Request, res: Response) => {
    res.send('Server is running in development mode! 🚀');
  });
}
app.listen(ENV.PORT, () => {
  console.log(`Server is running on port ${ENV.PORT} 🤓🤘`);
});