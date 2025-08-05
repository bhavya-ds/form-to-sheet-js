import express from 'express';
import bodyParser from 'body-parser';
import fetch from 'node-fetch'; // make sure it's in your package.json

const app = express();
const PORT = process.env.PORT || 10000;

app.use(bodyParser.json());

// Replace with your actual deployed Google Apps Script Web App URL
const GOOGLE_SHEET_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbyDd5iost7yDur31BHZ2RoLnYzRg3xuZyZ2JHX9YwlB7fDsu8KfK3soVviPiHO-tue8qQ/exec';

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

app.get('/', (req, res) => {
  res.send('Webhook server is running.');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});





