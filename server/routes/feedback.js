// routes/feedback.js
const express = require('express');
const router = express.Router();

// Mock data for feedbacks (for now)
let feedbacks = [
  { id: 1, text: 'Great app! Really helpful.' },
  { id: 2, text: 'Could use more features, but overall good.' },
];

// GET all feedbacks
router.get('/', (req, res) => {
  res.json(feedbacks);
});

// POST a new feedback
router.post('/', (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ message: 'Feedback text is required.' });
  }

  const newFeedback = {
    id: feedbacks.length + 1,
    text,
  };

  feedbacks.push(newFeedback);
  res.status(201).json(newFeedback);
});

module.exports = router;
