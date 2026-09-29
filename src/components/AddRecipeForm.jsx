import { useState } from "react";

function AddRecipeForm({ onAddRecipe }) {
  // Keep all form fields together so one change handler can manage them.
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    time: "",
    image: "",
  });

  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    // Create a new form object while keeping the values from the other fields.
    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    // Prevent the browser from reloading the page when the form is submitted.
    event.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.category.trim() ||
      !formData.description.trim() ||
      !formData.time ||
      !formData.image.trim()
    ) {
      setError("Please fill in all fields.");
      return;
    }

    const newRecipe = {
      id: Date.now(),
      name: formData.name.trim(),
      category: formData.category.trim(),
      description: formData.description.trim(),
      time: Number(formData.time),
      image: formData.image.trim(),
    };

    onAddRecipe(newRecipe);

    setFormData({
      name: "",
      category: "",
      description: "",
      time: "",
      image: "",
    });

    setError("");
  }

  return (
    <section className="add-recipe">
      <h2>Add a Recipe</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="recipe-name">Recipe name</label>

          <input
            id="recipe-name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Chicken Curry"
          />
        </div>

        <div className="form-field">
          <label htmlFor="recipe-category">Category</label>

          <input
            id="recipe-category"
            name="category"
            type="text"
            value={formData.category}
            onChange={handleChange}
            placeholder="e.g. Dinner"
          />
        </div>

        <div className="form-field">
          <label htmlFor="recipe-description">Description</label>

          <textarea
            id="recipe-description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the recipe..."
            rows="4"
          />
        </div>

        <div className="form-field">
          <label htmlFor="recipe-time">Cooking time</label>

          <input
            id="recipe-time"
            name="time"
            type="number"
            min="1"
            value={formData.time}
            onChange={handleChange}
            placeholder="e.g. 30"
          />
        </div>

        <div className="form-field">
          <label htmlFor="recipe-image">Image URL</label>

          <input
            id="recipe-image"
            name="image"
            type="url"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://example.com/recipe-image.jpg"
          />
        </div>

        {error && <p className="form-error">{error}</p>}

        <button type="submit" className="add-recipe-button">
          Add Recipe
        </button>
      </form>
    </section>
  );
}

export default AddRecipeForm;
