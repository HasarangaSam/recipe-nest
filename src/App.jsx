import { useState } from "react";

import AddRecipeForm from "./components/AddRecipeForm";
import CategoryFilter from "./components/CategoryFilter";
import Header from "./components/Header";
import RecipeList from "./components/RecipeList";
import SearchBar from "./components/SearchBar";
import ViewSwitcher from "./components/ViewSwitcher";
import { useRecipeContext } from "./context/RecipeContextValue";
import { recipes } from "./data/recipes";

function App() {
  const [recipeList, setRecipeList] = useState(recipes);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeView, setActiveView] = useState("all");

  // Read shared favourite state from Context instead of passing it through props.
  const { favourites } = useRecipeContext();

  const categories = [...new Set(recipeList.map((recipe) => recipe.category))];

  const filteredRecipes = recipeList.filter((recipe) => {
    const searchValue = searchTerm.toLowerCase();

    const matchesSearch =
      recipe.name.toLowerCase().includes(searchValue) ||
      recipe.description.toLowerCase().includes(searchValue);

    const matchesCategory =
      selectedCategory === "All" || recipe.category === selectedCategory;

    const matchesView = activeView === "all" || favourites.includes(recipe.id);

    return matchesSearch && matchesCategory && matchesView;
  });

  function handleAddRecipe(newRecipe) {
    // Use a functional update to create a new array from the latest recipe state.
    setRecipeList((currentRecipes) => [...currentRecipes, newRecipe]);
  }

  return (
    <>
      <Header favouriteCount={favourites.length} />

      <main className="container">
        <section className="intro">
          <h2>Explore Recipes</h2>
          <p>Find something simple and delicious to make.</p>
        </section>

        <AddRecipeForm onAddRecipe={handleAddRecipe} />

        <ViewSwitcher
          activeView={activeView}
          onViewChange={setActiveView}
          favouriteCount={favourites.length}
        />

        <div className="recipe-filters">
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>

        <RecipeList recipes={filteredRecipes} />
      </main>
    </>
  );
}

export default App;
