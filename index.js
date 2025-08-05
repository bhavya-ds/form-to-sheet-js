// index.js

import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

// Allow all CORS origins (or restrict to Vercel domain if needed)
app.use(cors()); // OR: app.use(cors({ origin: 'https://form-to-sheet-afe2.vercel.app' }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Webhook server running');
});

app.post('/hook', (req, res) => {
  const data = req.body;
  console.log('Received webhook:', data);

  // Optional: Log field-by-field for debugging
  Object.entries(data).forEach(([key, value]) => {
    console.log(`${key}: ${value}`);
  });

  res.status(200).json({ status: 'ok', received: true });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});



