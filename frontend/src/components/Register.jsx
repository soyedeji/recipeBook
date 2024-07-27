import React, { useState } from 'react';
import '../styles/Overlay.css';
import '../styles/Auth.css'; // Include the new styles

const Register = ({ closeOverlay }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [role, setRole] = useState('foodie'); // default role to foodie

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/register.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          firstname,
          lastname,
          role,
        }),
      });

      const data = await response.json();
      alert(data.message);
      if (data.status === 'success') {
        setUsername('');
        setPassword('');
        setFirstname('');
        setLastname('');
        setRole('foodie');
        closeOverlay();
      }
    } catch (error) {
      console.error('There was an error registering!', error);
    }
  };

  return (
    <div className="overlay">
      <div className="overlay-content">
        <button className="close-button" onClick={closeOverlay}>X</button>
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
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
