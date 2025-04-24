import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/feedback')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setFeedbacks(data);
        } else {
          console.error('Expected an array but got:', data);
        }
      })
      .catch(err => console.error('Fetch error:', err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !message) return alert('Both fields are required!');

    try {
      const res = await fetch('http://localhost:5000/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, message })
      });

      const newFeedback = await res.json();

      if (res.ok) {
        setFeedbacks([newFeedback, ...feedbacks]);
        setName('');
        setMessage('');
      } else {
        alert(newFeedback.error || 'Something went wrong');
      }
    } catch (err) {
      console.error(err);
      alert('Server error');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>User Feedback</h1>

        <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={e => setName(e.target.value)}
            style={{ padding: '8px', marginRight: '10px' }}
          />
          <input
            type="text"
            placeholder="Your feedback"
            value={message}
            onChange={e => setMessage(e.target.value)}
            style={{ padding: '8px', marginRight: '10px' }}
          />
          <button type="submit" style={{ padding: '8px 16px' }}>Send</button>
        </form>

        {feedbacks.length === 0 ? (
          <p>No feedback yet.</p>
        ) : (
          feedbacks.map((fb, i) => (
            <div key={i} style={{ marginBottom: '1rem' }}>
              <strong>{fb.name}</strong>: {fb.message}
            </div>
          ))
        )}
      </header>
    </div>
  );
}

export default App;
