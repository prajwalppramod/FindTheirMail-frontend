// App.js

import React, { useState } from 'react';
import './App.css';

function App() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailIds, setEmailIds] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://findtheirmail-backend-production.up.railway.app', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          first_name: firstName,
          last_name: lastName,
        }),
      });
      const data = await response.json();
      setEmailIds(data.email_ids);
    } catch (error) {
      console.error('Error generating email IDs:', error);
      setEmailIds([]);
    }
  };

  return (
    <div className="App">
      <h1>Email ID Generator</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Company Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br/><br/>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        /><br/><br/>
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        /><br/><br/>
        <button type="submit">Generate Email IDs</button>
      </form>
      <div id="result">
        {emailIds.map((email, index) => (
          <p key={index}>{email}</p>
        ))}
      </div>
    </div>
  );
}

export default App;
