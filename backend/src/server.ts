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

if (ENV.NODE_ENV === 'production') {
  // Serve our React application as static files
  app.use(express.static(path.join(__dirname, '../admin/dist')));

  app.get("/{*any}", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../admin/dist', 'index.html'));
  });
} else {
  app.get('/', (req: Request, res: Response) => {
    res.send('Server is running in development mode! 🚀');
  });
}
app.listen(ENV.PORT, () => {
  console.log(`Server is running on port ${ENV.PORT} 🤓🤘`);
});