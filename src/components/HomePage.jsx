import React, { useState } from 'react';
import axios from 'axios';

function HomePage({ setIsAuthenticated }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Send the credentials to the Strapi backend for authentication
      const response = await axios.post('http://localhost:1337/api/auth/local', 
      {
        identifier: email,
        password: password,
      });
      console.log('Login successful:', response.data);

      // If authentication is successful, set the authentication state to true
      const { jwt } = response.data;
      localStorage.setItem('jwt', jwt); // Store the token in localStorage
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Login failed:', error.response?.data?.message || error.message);
      // Handle invalid credentials or other errors
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default HomePage;

