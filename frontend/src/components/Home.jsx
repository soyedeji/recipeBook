import React, { useState } from 'react';
import RecipeList from './RecipeList';
import RecipeDetail from './RecipeDetail';
import RecipeForm from './RecipeForm';
import '../styles/Home.css';

const Home = ({ user, onLoginClick, onRegisterClick, onLogout }) => {
  const [showRecipeForm, setShowRecipeForm] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [error, setError] = useState(null);

  const handleAddRecipeClick = () => {
    setShowRecipeForm(true);
  };

  const handleRecipeSubmit = async (formData) => {
    try {
      const response = await fetch('http://localhost:8000/addRecipe.php', {
        method: 'POST',
        body: formData,
        credentials: 'include',
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

  const handleRecipeSelect = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleBackToList = () => {
    setSelectedRecipe(null);
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
      {selectedRecipe ? (
        <RecipeDetail recipe={selectedRecipe} user={user} onBack={handleBackToList} />
      ) : (
        <RecipeList user={user} onRecipeSelect={handleRecipeSelect} />
      )}
    </div>
  );
};

export default Home;
