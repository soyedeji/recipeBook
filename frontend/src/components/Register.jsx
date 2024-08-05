import React, { useState } from 'react';
import '../styles/Overlay.css';
import '../styles/Register.css'; 

const Register = ({ closeOverlay }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [role, setRole] = useState('foodie');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const response = await fetch('http://localhost:8000/register.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
          confirmPassword,
          firstname,
          lastname,
          role,
        }),
      });

      const data = await response.json();
      if (data.status === 'success') {
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setFirstname('');
        setLastname('');
        setRole('foodie');
        setError(null);
        closeOverlay();
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error('There was an error registering!', error);
      setError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="overlay">
      <div className="overlay-content">
        <button className="close-button" onClick={closeOverlay}>X</button>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit} className="auth-form">
          <h2>Register</h2>
          <div className="form-group">
            <label>Firstname</label>
            <input
              type="text"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Lastname</label>
            <input
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
            />
          </div>
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
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Role</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="foodie">Foodie</option>
              <option value="chef">Chef</option>
            </select>
          </div>
          <button type="submit" className="submit-button">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
