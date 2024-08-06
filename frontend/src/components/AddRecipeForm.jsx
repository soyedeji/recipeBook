import React, { useState } from 'react';
import '../styles/AddRecipeForm.css';

const AddRecipeForm = ({ onSubmit, initialData = {}, closeOverlay }) => {
  const [title, setTitle] = useState(initialData.title || '');
  const [description, setDescription] = useState(initialData.description || '');
  const [ingredients, setIngredients] = useState(initialData.ingredients || '');
  const [steps, setSteps] = useState(initialData.steps || '');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('ingredients', ingredients);
    formData.append('steps', steps);
    if (image) {
      formData.append('image', image);
    }
    if (initialData.id) {
      formData.append('id', initialData.id);
    }

    try {
      await onSubmit(formData);
    } catch (error) {
      setError('There was an error submitting the form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  return (
    <div className="overlay">
      <div className="overlay-content">
        <button className="close-button" onClick={closeOverlay}>X</button>
        <form onSubmit={handleSubmit} className="recipe-form">
          <h2>{initialData.id ? 'Edit Recipe' : 'Add Recipe'}</h2>
          {error && <p className="error">{error}</p>}
          <div className="form-group">
            <label>Title</label>
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
            <input type="file" onChange={handleImageChange} />
          </div>
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Submitting...' : initialData.id ? 'Update' : 'Add'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRecipeForm;
