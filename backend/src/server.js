import express from 'express';

const app = express();

// Check server is running
app.get('/', (req, res) => {
  res.send('Server is up and running! 🚀');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000 🤓🤘');
});
