const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Root Route
app.get('/', (req, res) => {
  res.send('API is running. Try /api/feedback');
});

// Favicon
app.get('/favicon.ico', (req, res) => res.sendStatus(204));

// Mock data for GET
app.get('/api/feedback', (req, res) => {
  res.json([
    { name: 'Alice', message: 'Great app!' },
    { name: 'Bob', message: 'Loving the updates!' }
  ]);
});

// Mock saving new feedback
app.post('/api/feedback', (req, res) => {
  const { name, message } = req.body;

  if (!name || !message) {
    return res.status(400).json({ error: 'Both name and message are required.' });
  }

  // Just echo back for now
  res.status(201).json({ name, message });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});
