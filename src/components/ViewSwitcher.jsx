function ViewSwitcher({ activeView, onViewChange, favouriteCount }) {
  return (
    <div className="view-switcher">
      <button
        type="button"
        className={activeView === "all" ? "active" : ""}
        onClick={() => onViewChange("all")}
      >
        All Recipes
      </button>

      <button
        type="button"
        className={activeView === "favourites" ? "active" : ""}
        onClick={() => onViewChange("favourites")}
      >
        Favourites ({favouriteCount})
      </button>
    </div>
  );
}

export default ViewSwitcher;
