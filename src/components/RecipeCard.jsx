function RecipeCard({ recipe, isFavourite, onToggleFavourite }) {
  return (
    <article className="recipe-card">
      <img src={recipe.image} alt={recipe.name} />

      <div className="recipe-card-content">
        <span>{recipe.category}</span>

        <h2>{recipe.name}</h2>

        <p>{recipe.description}</p>

        <div className="recipe-card-footer">
          <small>{recipe.time} minutes</small>

          <button
            type="button"
            className="favourite-button"
            onClick={() => onToggleFavourite(recipe.id)}
            aria-pressed={isFavourite}
          >
            {/* The button text changes based on the current favourite state. */}
            {isFavourite ? "♥ Favourite" : "♡ Favourite"}
          </button>
        </div>
      </div>
    </article>
  );
}

export default RecipeCard;
