import { createContext, useContext } from "react";

// The Context and its hook are kept separate from the Provider for Fast Refresh compatibility.
export const RecipeContext = createContext(null);

export function useRecipeContext() {
  return useContext(RecipeContext);
}
