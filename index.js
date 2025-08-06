import express from 'express';
import bodyParser from 'body-parser';
import fetch from 'node-fetch'; // still needed
import cors from 'cors'; // ✅ ADD THIS

const app = express();
const PORT = process.env.PORT || 10000;

// ✅ CORS setup
app.use(cors({
  origin: 'https://your-vercel-site.vercel.app', // Replace this with your actual deployed domain
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));

app.use(bodyParser.json());

// ✅ Handle preflight
app.options('/hook', cors());

// Google Sheets Web App endpoint
const GOOGLE_SHEET_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbyDd5iost7yDur31BHZ2RoLnYzRg3xuZyZ2JHX9YwlB7fDsu8KfK3soVviPiHO-tue8qQ/exec';

// ✅ Webhook POST
app.post('/hook', async (req, res) => {
  const payload = req.body;
  console.log('Received webhook:', payload);

  try {
    const forwardRes = await fetch(GOOGLE_SHEET_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!forwardRes.ok) {
      throw new Error(`Google Sheets responded with ${forwardRes.status}`);
    }

    res.status(200).send('Forwarded to Google Sheets');
  } catch (error) {
    console.error('Error forwarding to Google Sheets:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Home route
app.get('/', (req, res) => {
  res.send('Webhook server is running.');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});




