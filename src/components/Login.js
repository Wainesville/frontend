import React, { useState } from 'react';
import { loginUser } from '../api';

function Login({ handleLogin }) {
  const [email, setEmail] = useState(''); // State for email
  const [password, setPassword] = useState(''); // State for password
  const [error, setError] = useState(''); // State for error messages

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser({ email, password }); // Ensure you're sending email
      handleLogin(); // Call the handleLogin to update state
    } catch (err) {
      setError('Invalid credentials'); // Display invalid credentials error
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p>{error}</p>} {/* Display login error */}
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
