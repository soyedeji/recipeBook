import React, { useState, useEffect } from 'react';
import RecipeList from './RecipeList';
import RecipeDetail from './RecipeDetail';
import RecipeForm from './RecipeForm';
import '../styles/Home.css';

const Home = ({ user, onLoginClick, onRegisterClick, onLogout }) => {
  const [showRecipeForm, setShowRecipeForm] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('http://localhost:8000/getRecipes.php', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        if (data.status === 'success') {
          setRecipes(data.recipes);
        } else {
          setError(data.message);
        }
      } catch (error) {
        console.error('There was an error fetching the recipes!', error);
        setError('An unexpected error occurred. Please try again.');
      }
    };

    fetchRecipes();
  }, []);

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
        setRecipes([...recipes, data.recipe]);
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

  const handleRecipeUpdate = (updatedRecipe) => {
    setRecipes(recipes.map(recipe => recipe.id === updatedRecipe.id ? updatedRecipe : recipe));
    setSelectedRecipe(null);
  };

  const handleRecipeSelect = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleRecipeDelete = (deletedRecipeId) => {
    setRecipes(recipes.filter(recipe => recipe.id !== deletedRecipeId));
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
        <RecipeDetail 
          recipe={selectedRecipe} 
          user={user} 
          onBack={() => setSelectedRecipe(null)} 
          onRecipeUpdate={handleRecipeUpdate}
          onRecipeDelete={handleRecipeDelete}
        />
      ) : (
        <RecipeList 
          recipes={recipes} 
          onRecipeSelect={handleRecipeSelect}
        />
      )}
    </div>
  );
};

export default Home;
