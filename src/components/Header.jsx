function Header({ favouriteCount }) {
  return (
    <header className="header">
      <div>
        <h1>RecipeNest</h1>
        <p>Simple recipes for everyday cooking.</p>
      </div>

      <strong>Favourites: {favouriteCount}</strong>
    </header>
  );
}

export default Header;
