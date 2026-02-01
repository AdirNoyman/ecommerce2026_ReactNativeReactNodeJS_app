import express from 'express';
import type { Request, Response } from 'express';

const app = express();

// Check server is running
app.get('/', (req: Request, res: Response) => {
  res.send('Server is up and running! 🚀');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000 🤓🤘');
});