import React, { useState } from 'react';
import '../styles/Overlay.css';

const Login = ({ closeOverlay, onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Add state for error message

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      if (data.status === 'success') {
        onLogin(data.user);
        setUsername('');
        setPassword('');
        setErrorMessage(''); // Clear error message on successful login
        closeOverlay();
      } else {
        setErrorMessage(data.message); // Set error message on login failure
      }
    } catch (error) {
      console.error('There was an error logging in!', error);
      setErrorMessage('An unexpected error occurred. Please try again.'); // Set error message on network error
    }
  };

  return (
    <div className="overlay">
      <div className="overlay-content">
        <button className="close-button" onClick={closeOverlay}>X</button>
        <form onSubmit={handleSubmit} className="auth-form">
          <h2>Login</h2>
          {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message */}
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
