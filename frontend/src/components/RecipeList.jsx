import React, { useEffect, useState } from 'react';
import '../styles/RecipeList.css';

const RecipeList = () => {
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
          <div key={recipe.id} className="recipe-card">
            <img src={`uploads/${recipe.image}`} alt={recipe.title} className="recipe-image" />
            <div className="recipe-details">
              <p className="recipe-category">ORANGE DESSERT RECIPES</p> {/* You can update this with actual category data */}
              <h3 className="recipe-title">{recipe.title}</h3>
              <div className="recipe-rating">
                <span>★★★★☆</span> {/* Replace with actual rating data */}
                <span>22 Ratings</span> {/* Replace with actual rating count */}
              </div>
            </div>
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
