function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="search-bar">
      <label htmlFor="recipe-search">Search recipes</label>

      <input
        id="recipe-search"
        type="text"
        placeholder="Search by recipe name..."
        value={searchTerm}
        // The input is controlled by state, so every change is sent back to the parent.
        onChange={(event) => onSearchChange(event.target.value)}
      />
    </div>
  );
}

export default SearchBar;
