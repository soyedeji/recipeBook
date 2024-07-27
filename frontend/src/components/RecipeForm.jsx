import React, { useState } from 'react';

const RecipeForm = ({ onSubmit, initialData = {} }) => {
  const [title, setTitle] = useState(initialData.title || '');
  const [description, setDescription] = useState(initialData.description || '');
  const [ingredients, setIngredients] = useState(initialData.ingredients || '');
  const [steps, setSteps] = useState(initialData.steps || '');
  const [image, setImage] = useState(initialData.image || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...initialData,
      title,
      description,
      ingredients,
      steps,
      image,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{initialData.id ? 'Edit Recipe' : 'Add Recipe'}</h2>
      <div>
        <label>Title</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div>
        <label>Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
      </div>
      <div>
        <label>Ingredients</label>
        <textarea value={ingredients} onChange={(e) => setIngredients(e.target.value)} required />
      </div>
      <div>
        <label>Steps</label>
        <textarea value={steps} onChange={(e) => setSteps(e.target.value)} required />
      </div>
      <div>
        <label>Image URL</label>
        <input type="text" value={image} onChange={(e) => setImage(e.target.value)} />
      </div>
      <button type="submit">{initialData.id ? 'Update' : 'Add'}</button>
    </form>
  );
};

export default RecipeForm;
