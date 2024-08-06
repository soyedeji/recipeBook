import React, { useEffect, useState } from 'react';
import '../styles/RandomRecipe.css';

const apiKey = 'cddc610434f844638c9fad64aa79f2de';
const url = 'https://api.spoonacular.com/recipes/random';

const RandomRecipe = () => {
  const [randomRecipe, setRandomRecipe] = useState(null);
  const [error, setError] = useState(null);

  const fetchRandomRecipe = async () => {
    try {
      const response = await fetch(`${url}?apiKey=${apiKey}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setRandomRecipe(data.recipes[0]);
      console.log(data.recipes[0].instructions)
    } catch (error) {
      console.error('There was an error fetching the random recipe!', error);
      setError('An unexpected error occurred. Please try again.');
    }
  };

  useEffect(() => {
    fetchRandomRecipe();
  }, []);

  return (
    <div className="random-recipe-container">
      {error && <p className="error">{error}</p>}
      {randomRecipe ? (
        <div className="recipe-card-random">
          <div className="recipe-left">
            <h2>Recipe of the Day</h2>
            <img src={randomRecipe.image} alt={randomRecipe.title} className="recipe-image" />
          </div>
          <div className="recipe-right">
            <h3>{randomRecipe.title}</h3>
            <div
              className="random-recipe-instructions"
              dangerouslySetInnerHTML={{ __html: randomRecipe.instructions }}
            />
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default RandomRecipe;
