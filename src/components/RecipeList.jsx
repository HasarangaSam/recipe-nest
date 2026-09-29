import RecipeCard from "./RecipeCard";

import { useRecipeContext } from "../context/RecipeContextValue";

function RecipeList({ recipes }) {
  // Context provides shared favourite state without passing it through multiple components.
  const { favourites, toggleFavourite } = useRecipeContext();

  if (recipes.length === 0) {
    return (
      <p className="empty-message">
        No recipes found. Try a different search or category.
      </p>
    );
  }

  return (
    <section className="recipe-list">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          isFavourite={favourites.includes(recipe.id)}
          onToggleFavourite={toggleFavourite}
        />
      ))}
    </section>
  );
}

export default RecipeList;
