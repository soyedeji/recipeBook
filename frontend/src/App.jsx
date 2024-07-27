import React, { useState, useEffect } from 'react';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
// import './styles/App.css';

const App = () => {
  const [overlay, setOverlay] = useState(null); // 'login' or 'register'
  const [user, setUser] = useState(null); // To store the logged-in user's info

  useEffect(() => {
    // Check if the user is already logged in (using session)
    const checkSession = async () => {
      try {
        const response = await fetch('http://localhost:8000/checkSession.php');
        const data = await response.json();
        if (data.status === 'success') {
          setUser(data.user);
        }
      } catch (error) {
        console.error('Error checking session:', error);
      }
    };

    checkSession();
  }, []);

  const handleOverlay = (type) => {
    setOverlay(type);
  };

  const closeOverlay = () => {
    setOverlay(null);
  };

  const handleLogin = (userData) => {
    setUser(userData);
    closeOverlay();
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:8000/logout.php', {
        method: 'POST',
      });
      const data = await response.json();
      if (data.status === 'success') {
        setUser(null);
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="App">
      <Home
        user={user}
        onLoginClick={() => handleOverlay('login')}
        onRegisterClick={() => handleOverlay('register')}
        onLogout={handleLogout}
      />
      {overlay === 'login' && <Login closeOverlay={closeOverlay} onLogin={handleLogin} />}
      {overlay === 'register' && <Register closeOverlay={closeOverlay} />}
    </div>
  );
};

export default App;
