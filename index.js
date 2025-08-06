import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 10000;

// ✅ Setup CORS BEFORE all routes
app.use(cors({
  origin: 'https://form-to-sheet-afe2.vercel.app',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

app.use(bodyParser.json());

// ✅ Handle preflight explicitly
app.options('/hook', cors());

// ✅ Main route
app.post('/hook', async (req, res) => {
  const payload = req.body;
  console.log('Received webhook:', payload);

  try {
    const forwardRes = await fetch('https://script.google.com/macros/s/AKfycbyDd5iost7yDur31BHZ2RoLnYzRg3xuZyZ2JHX9YwlB7fDsu8KfK3soVviPiHO-tue8qQ/exec', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!forwardRes.ok) throw new Error(`Google Sheets responded with ${forwardRes.status}`);

    res.status(200).send('Forwarded to Google Sheets');
  } catch (err) {
    console.error('Forwarding error:', err);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/', (req, res) => {
  res.send('Webhook server is running.');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});




