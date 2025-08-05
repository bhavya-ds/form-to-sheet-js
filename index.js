import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON payloads
app.use(express.json());

// GET route for sanity check
app.get('/', (req, res) => {
  res.send('✅ Proxy server is live. Use POST /hook');
});

// POST webhook route to forward events to Apps Script
app.post('/hook', async (req, res) => {
  console.log("📦 Webhook received:", req.body);

  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbwxvKYUcQVKaMWPNIG6P6jJikyODLyoqaWRLS2SlZfJugF7c6FVew58QfwjTY6q6hSrRA/exec', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });

    const result = await response.text();
    res.status(200).json({ ok: true, result });
  } catch (err) {
    console.error("❌ Error forwarding to Apps Script:", err.message);
    res.status(500).json({ ok: false, error: err.message });
  }
});

app.listen(port, () => {
  console.log(`🚀 Proxy running on port ${port}`);
});


