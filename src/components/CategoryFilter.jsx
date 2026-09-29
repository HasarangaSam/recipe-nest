function CategoryFilter({ categories, selectedCategory, onCategoryChange }) {
  return (
    <div className="category-filter">
      <label htmlFor="category-filter">Filter by category</label>

      <select
        id="category-filter"
        value={selectedCategory}
        // The selected category is controlled by the parent component's state.
        onChange={(event) => onCategoryChange(event.target.value)}
      >
        <option value="All">All categories</option>

        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CategoryFilter;
