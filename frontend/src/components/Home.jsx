import React, { useState } from 'react';
import RecipeList from './RecipeList';
import RecipeForm from './RecipeForm';
import '../styles/Home.css';

const Home = ({ user, onLoginClick, onRegisterClick, onLogout }) => {
  const [showRecipeForm, setShowRecipeForm] = useState(false);
  const [error, setError] = useState(null);

  const handleAddRecipeClick = () => {
    setShowRecipeForm(true);
  };

  const handleRecipeSubmit = async (formData) => {
    try {
      const response = await fetch('http://localhost:8000/addRecipe.php', {
        method: 'POST',
        body: formData,
        credentials: 'include', // Ensure cookies are included in the request
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      if (data.status === 'success') {
        setShowRecipeForm(false);
        setError(null);
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error('There was an error adding the recipe!', error);
      setError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="home-container">
      <nav>
        <h1>RecipeBook</h1>
        <div className="buttons">
          {!user && (
            <>
              <button onClick={onLoginClick}>Login</button>
              <button onClick={onRegisterClick}>Register</button>
            </>
          )}
          {user && (
            <>
              <p>Logged in as {user.role === 'chef' ? 'Chef' : 'Foodie'}</p>
              {user.role === 'chef' && (
                <button onClick={handleAddRecipeClick}>Add Recipe</button>
              )}
              <button onClick={onLogout}>Logout</button>
            </>
          )}
        </div>
      </nav>
      {error && <p className="error">{error}</p>}
      {showRecipeForm && (
        <RecipeForm onSubmit={handleRecipeSubmit} closeOverlay={() => setShowRecipeForm(false)} />
      )}
      <RecipeList />
    </div>
  );
};

export default Home;
