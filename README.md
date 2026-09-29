# RecipeNest

RecipeNest is a small React application created as a learning reference for React beginners.

The idea is simple: when learning React, it is easy to understand individual concepts but harder to see how those concepts work together in one application.

RecipeNest brings several React fundamentals together in a small, understandable project.

You can browse recipes, search and filter them, add recipes with an image URL, mark recipes as favourites, and keep favourites saved in the browser.

The project also demonstrates how **Context API can solve prop drilling** when shared state needs to be accessed by multiple components.

The project is intentionally simple. There is no backend or complex state management because the focus is on understanding React fundamentals.

---

## Features

- Browse recipes
- Search recipes by name or description
- Filter recipes by category
- Switch between all recipes and favourite recipes
- Add new recipes through a form
- Add a recipe image using an image URL
- Basic form validation
- Mark recipes as favourites
- Persist favourites with `localStorage`
- Controlled inputs
- Shared state with Context API
- Responsive layout

---

## Tech Stack

- React
- JavaScript
- Vite
- CSS
- Browser `localStorage`

No backend, database, authentication, Redux, Zustand, React Query, or external API is required.

The small technology stack keeps the focus on learning React rather than learning additional tools.

---

## Getting Started

### 1. Clone the repository

```bash
git clone git clone https://github.com/HasarangaSam/recipe-nest.git
```

### 2. Open the project

```bash
cd recipenest
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

Open the local URL shown by Vite in your browser.

---

## Project Structure

```text
recipenest/
├── public/
├── src/
│   ├── components/
│   │   ├── AddRecipeForm.jsx
│   │   ├── CategoryFilter.jsx
│   │   ├── Header.jsx
│   │   ├── RecipeCard.jsx
│   │   ├── RecipeList.jsx
│   │   ├── SearchBar.jsx
│   │   └── ViewSwitcher.jsx
│   │
│   ├── context/
│   │   ├── RecipeContext.jsx
│   │   └── RecipeContextValue.js
│   │
│   ├── data/
│   │   └── recipes.js
│   │
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── .gitignore
├── index.html
├── package.json
└── README.md
```

---

# React Concepts Demonstrated

The main purpose of RecipeNest is learning.

Each feature provides an opportunity to understand a React concept in a practical context.

---

## 1. Components

RecipeNest is divided into small components with focused responsibilities.

```text
Header
SearchBar
CategoryFilter
ViewSwitcher
RecipeList
RecipeCard
AddRecipeForm
```

For example, `RecipeCard` is responsible for displaying one recipe.

```jsx
function RecipeCard({ recipe }) {
  return (
    <article>
      <h2>{recipe.name}</h2>
      <p>{recipe.description}</p>
    </article>
  );
}
```

Instead of placing the entire application inside one component, the UI is divided into smaller pieces.

This makes the application easier to read, understand, and modify.

---

## 2. JSX

JSX allows us to describe the UI using a syntax that looks similar to HTML inside JavaScript.

For example:

```jsx
<h2>{recipe.name}</h2>
<p>{recipe.description}</p>
```

JavaScript values can be inserted into JSX using `{}`.

JSX is used throughout RecipeNest to describe the component UI.

---

## 3. Props

Props allow a parent component to pass information to a child component.

For example:

```jsx
<RecipeCard recipe={recipe} />
```

The child component receives the value:

```jsx
function RecipeCard({ recipe }) {
  // ...
}
```

RecipeNest uses props for:

- Recipe data
- Search values
- Selected categories
- Event handlers
- Favourite information
- Component configuration

Props are useful when information belongs to a direct parent-child relationship.

---

## 4. Component Composition

Components can be combined to create larger parts of the application.

The main structure looks like this:

```text
App
├── Header
├── AddRecipeForm
├── ViewSwitcher
├── SearchBar
├── CategoryFilter
└── RecipeList
     └── RecipeCard
```

Each component handles a smaller responsibility while working together to create the complete application.

This is an important React pattern because applications are usually built by composing smaller components.

---

# State and Events

## 5. `useState`

`useState` is used when the application needs to remember information that can change.

RecipeNest has several pieces of state:

```jsx
const [searchTerm, setSearchTerm] = useState("");
const [selectedCategory, setSelectedCategory] = useState("All");
const [activeView, setActiveView] = useState("all");
```

The recipe list is also stored in state because users can add new recipes:

```jsx
const [recipeList, setRecipeList] = useState(recipes);
```

When state changes, React renders the affected UI again.

---

## 6. Event Handling

React handles browser events through event props such as:

```text
onClick
onChange
onSubmit
```

For example:

```jsx
<button onClick={handleToggleFavourite}>Favourite</button>
```

And for an input:

```jsx
<input onChange={handleChange} />
```

Events connect user interactions to state updates.

A simplified flow is:

```text
User interaction
      ↓
Event handler
      ↓
State update
      ↓
React re-renders
      ↓
Updated UI
```

---

## 7. Controlled Inputs

The search field and recipe form fields are controlled by React state.

For example:

```jsx
<input value={formData.name} onChange={handleChange} />
```

The input value comes from React state.

When the user types:

```text
User types
    ↓
onChange
    ↓
setFormData()
    ↓
State changes
    ↓
Input updates
```

This is called a **controlled input**.

The recipe form uses the same approach for fields such as:

- Recipe name
- Category
- Description
- Cooking time
- Image URL

The same idea is used by the search field:

```jsx
<SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
```

---

# Lists and Conditional Rendering

## 8. Rendering Lists

Recipes are stored in an array.

The `map()` method is used to render each recipe:

```jsx
recipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />);
```

This allows one reusable component to display many recipes.

---

## 9. Keys

Each rendered recipe receives a unique `key`:

```jsx
<RecipeCard key={recipe.id} recipe={recipe} />
```

Keys help React identify individual items when a list changes.

RecipeNest uses the recipe's unique ID as the key.

---

## 10. Conditional Rendering

The application displays different content depending on the current state.

For example, when no recipes match the search or filter:

```jsx
if (recipes.length === 0) {
  return <p>No recipes found.</p>;
}
```

The favourite button also changes based on whether the recipe is currently a favourite:

```jsx
{
  isFavourite ? "♥ Favourite" : "♡ Favourite";
}
```

Conditional rendering allows the UI to respond to application state.

---

# Derived Data

## 11. Filtering Data

RecipeNest does not create separate state for filtered recipes.

Instead, the filtered recipes are calculated from existing state:

```jsx
const filteredRecipes = recipeList.filter((recipe) => {
  // filtering logic
});
```

This is an example of **derived data**.

The filtered result depends on:

- The current recipe list
- The search term
- The selected category
- The active view
- The favourite recipes

Because this information can already be calculated from existing state, it does not need to be stored separately.

This avoids unnecessary state.

---

# Sharing State

## 12. Lifting State Up

The recipe list belongs to `App` because multiple components need to work with it.

For example:

```text
App
├── AddRecipeForm
└── RecipeList
```

`AddRecipeForm` creates a new recipe, while `RecipeList` displays recipes.

The form does not directly modify the recipe list.

Instead, `App` provides a function:

```jsx
function handleAddRecipe(newRecipe) {
  setRecipeList((currentRecipes) => [...currentRecipes, newRecipe]);
}
```

The form calls that function after creating a recipe.

This is an example of **lifting state up**.

The important idea is:

> Keep shared state in the closest common parent that needs to coordinate it.

---

# Forms

## 13. Multiple Controlled Form Fields

The recipe form manages several fields with one state object:

```jsx
const [formData, setFormData] = useState({
  name: "",
  category: "",
  description: "",
  time: "",
  image: "",
});
```

The same change handler can update different fields:

```jsx
function handleChange(event) {
  const { name, value } = event.target;

  setFormData((currentFormData) => ({
    ...currentFormData,
    [name]: value,
  }));
}
```

The `name` attribute determines which field is updated.

This avoids creating a separate change handler for every input.

The form includes fields for:

- Recipe name
- Category
- Description
- Cooking time
- Image URL

The image URL is stored as part of the new recipe:

```jsx
const newRecipe = {
  id: Date.now(),
  name: formData.name.trim(),
  category: formData.category.trim(),
  description: formData.description.trim(),
  time: Number(formData.time),
  image: formData.image.trim(),
};
```

---

## 14. `onSubmit`

The recipe form uses React's `onSubmit` event:

```jsx
<form onSubmit={handleSubmit}>
```

The submit handler receives the browser event:

```jsx
function handleSubmit(event) {
  event.preventDefault();

  // form logic
}
```

This allows the application to control what happens when the form is submitted.

---

## 15. `preventDefault()`

Normally, submitting an HTML form triggers the browser's default form submission behavior.

RecipeNest handles the form entirely through React.

Therefore:

```jsx
event.preventDefault();
```

prevents the browser's default behavior.

The application can then validate the data and update React state.

---

## 16. Basic Form Validation

RecipeNest performs simple validation before creating a recipe.

The form checks that all fields contain a value:

```jsx
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
```

This demonstrates the basic idea of validating user input before updating application state.

The validation is intentionally simple because the purpose is to learn React forms rather than build a complete validation system.

---

# Updating State

## 17. Immutable State Updates

When a new recipe is created, RecipeNest does not directly modify the existing array.

Instead:

```jsx
setRecipeList((currentRecipes) => [...currentRecipes, newRecipe]);
```

The spread operator creates a new array.

Conceptually:

```text
Old array
[Recipe 1, Recipe 2]

        +

New recipe
[Recipe 3]

        ↓

New array
[Recipe 1, Recipe 2, Recipe 3]
```

We avoid:

```jsx
recipeList.push(newRecipe);
```

because directly mutating React state can lead to incorrect state management and rendering behavior.

The same principle is used when adding or removing favourite recipe IDs.

---

## 18. Functional State Updates

RecipeNest uses functional state updates when the new state depends on the previous state.

For example:

```jsx
setFavourites((currentFavourites) => {
  // ...
});
```

and:

```jsx
setRecipeList((currentRecipes) => [...currentRecipes, newRecipe]);
```

The updater function receives the latest state value and returns the next state.

This is especially useful when multiple updates may happen close together.

---

# `useEffect` and Browser Storage

## 19. Synchronizing with `localStorage`

RecipeNest uses `useEffect` to synchronize favourites with the browser's `localStorage`.

```jsx
useEffect(() => {
  localStorage.setItem("recipenest-favourites", JSON.stringify(favourites));
}, [favourites]);
```

`localStorage` is an external browser system rather than React state.

When the favourites state changes:

```text
favourites changes
        ↓
useEffect runs
        ↓
localStorage is updated
```

This is a practical example of using an effect to synchronize React state with something outside React.

---

## Initial `localStorage` Read

The initial favourite state uses a lazy initializer:

```jsx
const [favourites, setFavourites] = useState(() => {
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
```

The saved favourites are read when the state is initially created.

The two responsibilities are kept separate:

```text
Initial data
    ↓
useState lazy initializer

State changes
    ↓
useEffect
    ↓
localStorage synchronization
```

The project does not use an effect simply to initialize the state.

---

# Prop Drilling

## 20. The Problem

Before using Context API, shared favourite information could be passed through multiple components.

For example:

```text
App
 ↓
RecipeList
 ↓
RecipeCard
```

Suppose `App` owns the favourite state, but `RecipeCard` needs access to it.

The data may need to travel through `RecipeList`:

```jsx
<RecipeList favourites={favourites} onToggleFavourite={handleToggleFavourite} />
```

and then:

```jsx
<RecipeCard favourites={favourites} onToggleFavourite={onToggleFavourite} />
```

The problem is that `RecipeList` may only be passing the data through.

This pattern is called **prop drilling**.

Prop drilling is not automatically bad. Passing props is a normal and important React pattern.

The problem becomes more noticeable when shared data has to travel through several intermediate components.

---

# Context API

## 21. Solving Prop Drilling

RecipeNest uses React Context for the shared favourite state.

The provider exposes:

```jsx
{
  favourites, toggleFavourite;
}
```

Components inside the provider can access this shared value without receiving it through every intermediate component.

The structure is:

```text
RecipeProvider
      │
      └── App
           │
           ├── Header
           │
           ├── ViewSwitcher
           │
           └── RecipeList
                  │
                  └── RecipeCard
```

Both `App` and `RecipeList` can access the shared favourite state through Context.

---

## `createContext`

The Context is created in `RecipeContextValue.js`:

```jsx
export const RecipeContext = createContext(null);
```

The Context itself is kept separate from the Provider component.

This also keeps the Context hook reusable:

```jsx
export function useRecipeContext() {
  return useContext(RecipeContext);
}
```

---

## Provider

`RecipeProvider` owns the favourite state and provides it to components below it.

```jsx
<RecipeContext.Provider
  value={{
    favourites,
    toggleFavourite,
  }}
>
  {children}
</RecipeContext.Provider>
```

The provider is mounted in `main.jsx`:

```jsx
<RecipeProvider>
  <App />
</RecipeProvider>
```

This means components inside `App` can access the Context.

---

## `useContext`

Components can access the shared value through the custom hook:

```jsx
const { favourites, toggleFavourite } = useRecipeContext();
```

For example, `RecipeList` uses it to determine whether each recipe is a favourite and to provide the toggle function to `RecipeCard`.

The main idea is:

> Context allows components to access shared data without passing that data through every intermediate component.

---

# Why Context Instead of Props?

Props are still useful and should not be replaced with Context everywhere.

For example:

```jsx
<RecipeCard recipe={recipe} />
```

This makes sense because `recipe` is directly related to `RecipeCard`.

Context becomes useful when shared information is needed by multiple components and passing that information through intermediate components becomes inconvenient.

RecipeNest demonstrates this progression:

```text
Props
   ↓
State
   ↓
Lifting State Up
   ↓
Prop Drilling
   ↓
Context API
```

The important lesson is not:

> "Use Context instead of props."

It is:

> "Use Context when shared state needs to be accessed across the component tree and prop drilling becomes inconvenient."

---

# Application Data Flow

RecipeNest can be understood by following a few simple data flows.

## Adding a Recipe

```text
Fill in form
      ↓
onChange
      ↓
formData state
      ↓
Submit
      ↓
Validation
      ↓
Create recipe
      ↓
setRecipeList()
      ↓
RecipeList receives updated recipes
      ↓
New RecipeCard appears
```

## Searching and Filtering

```text
User enters search
      ↓
setSearchTerm()
      ↓
App state changes
      ↓
filteredRecipes recalculated
      ↓
RecipeList receives filtered data
      ↓
UI updates
```

## Favourites

```text
Click Favourite
      ↓
toggleFavourite()
      ↓
Context state updates
      ↓
RecipeCard re-renders
      ↓
useEffect runs
      ↓
localStorage is updated
```

---

# Learning Path

A beginner can study RecipeNest in this order:

```text
1. Components
       ↓
2. JSX
       ↓
3. Props
       ↓
4. Component composition
       ↓
5. useState
       ↓
6. Event handling
       ↓
7. Controlled inputs
       ↓
8. Lists and keys
       ↓
9. Conditional rendering
       ↓
10. Derived data
       ↓
11. Lifting state up
       ↓
12. Forms
       ↓
13. Immutable state updates
       ↓
14. Functional state updates
       ↓
15. useEffect
       ↓
16. localStorage
       ↓
17. Prop drilling
       ↓
18. Context API
```

The goal is not to memorize each API individually.

The goal is to understand **why each concept exists and how the concepts work together**.

---

# What This Project Does Not Cover

RecipeNest intentionally keeps the scope small.

It does not include:

- Backend development
- Databases
- Authentication
- REST APIs
- Redux
- Zustand
- React Query
- TypeScript
- Complex custom hooks
- Advanced form libraries
- Advanced state management

These technologies can be useful in larger applications, but they are outside the purpose of this project.

The goal is to become comfortable with React fundamentals before adding more complexity.

---

# Using RecipeNest as a Learning Reference

RecipeNest is designed to be experimented with.

After understanding the existing code, try changing it.

Some ideas:

- Add recipe ingredients
- Add preparation steps
- Add a difficulty level
- Add a cooking time filter
- Add a favourite count to each recipe
- Add a delete recipe feature
- Add sorting by cooking time
- Add another Context value
- Add a dark mode
- Add more validation rules
- Create another component and pass data to it with props

The project becomes more useful when you modify it rather than only reading it.

---

# Purpose

RecipeNest was created as a small learning reference for people who are starting with React.

When learning React, beginners often know individual concepts such as `useState`, props, forms, and `useEffect`, but may not yet have a simple project idea where those concepts can be practiced together.

RecipeNest provides that starting point.

The project is intentionally small so that a beginner can:

- Read the components
- Follow the data flow
- Understand where state lives
- Experiment with Context API
- Modify the UI
- Add new features
- Break things and understand why
- Use the project as a starting point for further learning

The goal is not to make the application large.

The goal is to make **React fundamentals easier to understand through a practical example**.

---

## License

This project is intended for learning and educational purposes.
