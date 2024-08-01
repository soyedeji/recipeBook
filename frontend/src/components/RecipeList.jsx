import React, { useEffect, useState } from 'react';
import '../styles/RecipeList.css';

const truncateText = (text, wordLimit) => {
  const words = text.split(' ');
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(' ') + '...';
  }
  return text;
};

const RecipeList = ({ user, onRecipeSelect }) => {
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

  const handleEdit = (recipe) => {
    // Implement edit logic here
  };

  const handleDelete = async (recipeId) => {
    try {
      const response = await fetch(`http://localhost:8000/deleteRecipe.php?id=${recipeId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      if (data.status === 'success') {
        setRecipes(recipes.filter(recipe => recipe.id !== recipeId));
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error('There was an error deleting the recipe!', error);
      setError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="recipe-list">
      {error && <p className="error">{error}</p>}
      {recipes.length > 0 ? (
        recipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card" onClick={() => onRecipeSelect(recipe)}>
            <img src={`http://localhost:8000/uploads/${recipe.image}`} alt={recipe.title} className="recipe-image" />
            <div className="recipe-details">
              <h3 className="recipe-title">{recipe.title}</h3>
              <p className="recipe-description">{truncateText(recipe.description, 20)}</p>
            </div>
            {user && user.role === 'chef' && user.id === recipe.user_id && (
              <div className="recipe-actions">
                <button onClick={(e) => { e.stopPropagation(); handleEdit(recipe); }}>Edit</button>
                <button onClick={(e) => { e.stopPropagation(); handleDelete(recipe.id); }}>Delete</button>
              </div>
            )}
            <button className="favorite-button">❤️</button>
          </div>
        ))
      ) : (
        <p>No recipes available.</p>
      )}
    </div>
  );
};

export default RecipeList;
