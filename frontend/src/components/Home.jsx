import React, { useState, useEffect } from 'react';
import RecipeList from './RecipeList';
import '../styles/Home.css';

const Home = ({ onLoginClick, onRegisterClick }) => {
  return (
    <div className="home-container">
      <nav>
        <h1>RecipeBook</h1>
        <div className="buttons">
          <button onClick={onLoginClick}>Login</button>
          <button onClick={onRegisterClick}>Register</button>
        </div>
      </nav>
      <RecipeList />
    </div>
  );
};

export default Home;
