import React, { useState } from 'react';
import '../styles/RecipeForm.css';

const RecipeForm = ({ onSubmit, initialData = {}, closeOverlay }) => {
  const [title, setTitle] = useState(initialData.title || '');
  const [description, setDescription] = useState(initialData.description || '');
  const [ingredients, setIngredients] = useState(initialData.ingredients || '');
  const [steps, setSteps] = useState(initialData.steps || '');
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('ingredients', ingredients);
    formData.append('steps', steps);
    if (image) {
      formData.append('image', image);
    }
    onSubmit(formData);
  };

  return (
    <div className="overlay">
      <div className="overlay-content">
        <button className="close-button" onClick={closeOverlay}>X</button>
        <form onSubmit={handleSubmit} className="recipe-form">
          <h2>{initialData.id ? 'Edit Recipe' : 'Add Recipe'}</h2>
          <div className="form-group">
            <label>Recipe Name</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Ingredients</label>
            <textarea value={ingredients} onChange={(e) => setIngredients(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Steps</label>
            <textarea value={steps} onChange={(e) => setSteps(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Image</label>
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          </div>
          <button type="submit" className="submit-button">{initialData.id ? 'Update' : 'Add'}</button>
        </form>
      </div>
    </div>
  );
};

export default RecipeForm;
