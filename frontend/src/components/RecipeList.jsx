import React from 'react';
import '../styles/RecipeList.css';

const truncateText = (text, wordLimit) => {
  const words = text.split(' ');
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(' ') + '...';
  }
  return text;
};

const RecipeList = ({ recipes, onRecipeSelect }) => {
  return (
    <div className="recipe-list">
      {recipes.length > 0 ? (
        recipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card" onClick={() => onRecipeSelect(recipe)}>
            <img src={`http://localhost:8000/uploads/${recipe.image}`} alt={recipe.title} className="recipe_image" />
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
