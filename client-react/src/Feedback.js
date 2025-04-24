// src/Feedback.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [newFeedback, setNewFeedback] = useState('');

  // Fetch feedbacks from the backend
  useEffect(() => {
    axios.get('http://localhost:5000/api/feedback')
      .then((res) => setFeedbacks(res.data))
      .catch((err) => console.error('Error fetching feedback:', err));
  }, []);

  // Submit new feedback
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newFeedback.trim()) return;

    axios.post('http://localhost:5000/api/feedback', { text: newFeedback })
      .then((res) => {
        setFeedbacks([...feedbacks, res.data]);
        setNewFeedback('');
      })
      .catch((err) => console.error('Error sending feedback:', err));
  };

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', textAlign: 'center' }}>
      <h2>Feedback</h2>
      <ul>
        {feedbacks.map((f, index) => (
          <li key={index}>{f.text || f.message}</li>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <input
          value={newFeedback}
          onChange={(e) => setNewFeedback(e.target.value)}
          placeholder="Enter your feedback"
          style={{ padding: '8px', width: '70%' }}
        />
        <button type="submit" style={{ padding: '8px 12px', marginLeft: '8px' }}>Send</button>
      </form>
    </div>
  );
};

export default Feedback;
