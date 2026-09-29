import { useEffect, useState } from "react";

import { RecipeContext } from "./RecipeContextValue";

export function RecipeProvider({ children }) {
  const [favourites, setFavourites] = useState(() => {
    // Read saved favourites when the state is created instead of using an effect for initial loading.
    const savedFavourites = localStorage.getItem("recipenest-favourites");

    if (!savedFavourites) {
      return [];
    }

    try {
      return JSON.parse(savedFavourites);
    } catch {
      return [];
    }
  });

  // Keep localStorage synchronized whenever the favourites state changes.
  useEffect(() => {
    localStorage.setItem("recipenest-favourites", JSON.stringify(favourites));
  }, [favourites]);

  function toggleFavourite(recipeId) {
    setFavourites((currentFavourites) => {
      if (currentFavourites.includes(recipeId)) {
        return currentFavourites.filter((id) => id !== recipeId);
      }

      // Create a new array instead of modifying the existing state array.
      return [...currentFavourites, recipeId];
    });
  }

  return (
    <RecipeContext.Provider
      value={{
        favourites,
        toggleFavourite,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
}
