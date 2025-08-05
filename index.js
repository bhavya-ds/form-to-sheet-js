import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
app.use(cors());
app.use(express.json());

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxxxxx/exec'; // Replace this

app.post('/hook', async (req, res) => {
  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });

    const result = await response.text();
    res.status(200).send({ ok: true, result });
  } catch (err) {
    res.status(500).send({ ok: false, error: err.message });
  }
});

app.listen(3000, () => {
  console.log('Proxy live on port 3000');
});
