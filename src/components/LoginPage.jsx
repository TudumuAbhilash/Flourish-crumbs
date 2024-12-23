import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:1337/api/auth/local', {
        identifier: email,
        password,
      });

      // Check if the login was successful and store the token
      if (response.data.jwt) {
        localStorage.setItem('authToken', response.data.jwt); // Store token in localStorage
        navigate('/products'); // Navigate to a protected route
      }
    } catch (error) {
      console.error('Login failed:', error);
      setError('Invalid credentials');
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

      {/* Display error message */}
      {error && <p>{error}</p>}
    </div>
  );
}

export default LoginPage;
