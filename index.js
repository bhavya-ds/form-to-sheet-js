const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Default route to handle GET /
app.get('/', (req, res) => {
  res.send('Webhook server is live. Use POST /hook');
});

// Webhook receiver route
app.post('/hook', (req, res) => {
  console.log("Webhook received:", req.body); // Logs the entire payload
  res.status(200).send("Webhook received");   // Respond to client
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


