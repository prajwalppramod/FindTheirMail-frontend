// EmailForm.js

import React, { useState } from 'react';
import axios from 'axios';

function EmailForm() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailIds, setEmailIds] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/generate_emails', {
        email,
        first_name: firstName,
        last_name: lastName,
      });
      setEmailIds(response.data.email_ids);
      setShowResult(true); // Show the result after generating email IDs
    } catch (error) {
      console.error('Error generating email IDs:', error);
      setEmailIds([]);
      setShowResult(false);
    }
  };

  return (
    <div>
      <h2>Email ID Generator</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Company Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br/><br/>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        /><br/><br/>
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        /><br/><br/>
        <button type="submit">Generate Email IDs</button>
      </form>
      {showResult && (
        <div>
          <h3>Generated Email IDs:</h3>
          <ul>
            {emailIds.map((email, index) => (
              <li key={index}>{email}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default EmailForm;
