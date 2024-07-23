import React, { useState } from 'react';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';


const App = () => {
  const [overlay, setOverlay] = useState(null);

  const handleOverlay = (type) => {
    setOverlay(type);
  };

  const closeOverlay = () => {
    setOverlay(null);
  };

  return (
    <div className="App">
      <Home onLoginClick={() => handleOverlay('login')} onRegisterClick={() => handleOverlay('register')} />
      {overlay === 'login' && <Login closeOverlay={closeOverlay} />}
      {overlay === 'register' && <Register closeOverlay={closeOverlay} />}
    </div>
  );
};

export default App;
