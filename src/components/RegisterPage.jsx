import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize the navigate function

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:1337/api/auth/local/register', {
        username,
        email,
        password,
      });

      console.log('Registration successful', response.data);
      alert('Registration successful!');
      
      // Navigate to the login page after successful registration
      navigate('/login'); // Change '/login' to your actual login route if needed
    } catch (error) {
      console.error('Error during registration', error);
      alert('Error during registration: ' + error.response?.data?.error?.message);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
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
        <button type="submit">Register</button>
      </form>
       {/* Link to Login page if the user is already registered */}
       <p>Already have an account? <a href="/login">Login here</a></p>
    </div>
  );
}

export default RegisterPage;
