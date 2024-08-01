import React, { useEffect, useState } from 'react';
import CommentForm from './CommentForm';
// import '../styles/RecipeDetail.css';

const RecipeDetail = ({ recipe, user, onBack }) => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`http://localhost:8000/getReviews.php?recipe_id=${recipe.id}`, {
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
          setReviews(data.reviews);
        } else {
          setError(data.message);
        }
      } catch (error) {
        console.error('There was an error fetching the reviews!', error);
        setError('An unexpected error occurred. Please try again.');
      }
    };

    fetchReviews();
  }, [recipe.id]);

  const handleAddReview = async (reviewData) => {
    try {
      const response = await fetch('http://localhost:8000/addReview.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      if (data.status === 'success') {
        setReviews([...reviews, data.review]);
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error('There was an error adding the review!', error);
      setError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="recipe-detail">
      <button onClick={onBack} className="back-button">Back to Recipes</button>
      {error && <p className="error">{error}</p>}
      <h2>{recipe.title}</h2>
      <img src={`http://localhost:8000/uploads/${recipe.image}`} alt={recipe.title} className="recipe-image" />
      <p>{recipe.description}</p>
      <h3>Ingredients</h3>
      <p>{recipe.ingredients}</p>
      <h3>Steps</h3>
      <p>{recipe.steps}</p>
      <h3>Reviews</h3>
      {reviews.map((review) => (
        <div key={review.reviewID} className="comment">
          <p><strong>{review.username}:</strong> {review.comment}</p>
          <p>Posted on: {new Date(review.createdAt).toLocaleString()}</p>
        </div>
      ))}
      {user && user.role === 'foodie' && (
        <CommentForm recipeId={recipe.id} onSubmit={handleAddReview} />
      )}
    </div>
  );
};

export default RecipeDetail;
