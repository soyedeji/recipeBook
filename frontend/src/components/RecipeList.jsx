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

  return (
    <div className="recipe-list">
      {error && <p className="error">{error}</p>}
      {recipes.length > 0 ? (
        recipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card" onClick={() => onRecipeSelect(recipe)}>
            <img src={`http://localhost:8000/uploads/${recipe.image}`} alt={recipe.title} className="recipe-image" />
            <div className="recipe-details">
              <h3 className="recipe-title">{recipe.title}</h3>
              <p className="recipe-description">{truncateText(recipe.description, 12)}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No recipes available.</p>
      )}
    </div>
  );
};

export default RecipeList;
