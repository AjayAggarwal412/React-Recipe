import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import RecipeList from "./components/RecipeList";
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RecipeInfo from "./components/RecipeInfo";
import Favorites from "./components/Favorites";
import { css } from "@emotion/react";
import { FadeLoader } from "react-spinners";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

function App() {
  const APP_ID = process.env.REACT_APP_APP_ID;
  const API_KEY = process.env.REACT_APP_API_KEY;

  const [loading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState("Noodles");
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  useEffect(() => {
    getRecipes();
  }, [query]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const getRecipes = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${API_KEY}`
      );
      const data = await response.json();
      setRecipes(data.hits);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    setQuery(query);
  };

  const addToFavorites = (recipe) => {
    if (
      !favorites.find(
        (favRecipe) => favRecipe.recipe.label === recipe.recipe.label
      )
    ) {
      const updatedFavorites = [...favorites, recipe];
      setFavorites(updatedFavorites);
    }
  };

  const removeFromFavorites = (recipe) => {
    const updatedFavorites = favorites.filter(
      (favRecipe) => favRecipe.recipe.label !== recipe.recipe.label
    );
    setFavorites(updatedFavorites);
  };

  return (
    <Router>
      {loading ? (
        <div className="loader">
          <FadeLoader
            color={"#fab73d"}
            loading={loading}
            css={override}
            height={25}
            width={5}
          />
        </div>
      ) : (
        <div className="App">
          <Header handleSearch={handleSearch} />

          <Routes>
            <Route
              path="/"
              element={
                <RecipeList
                  recipes={recipes}
                  addToFavorites={addToFavorites}
                  removeFromFavorites={removeFromFavorites}
                />
              }
            />
            <Route
              path="/recipe/:id"
              element={<RecipeInfo recipes={recipes} />}
            />
            <Route
              path="/favorites"
              element={
                <Favorites
                  favorites={favorites}
                  removeFromFavorites={removeFromFavorites}
                />
              }
            />
          </Routes>

          {!query && (
            <h1 className="type-something">Type Something in Searchbar</h1>
          )}
        </div>
      )}
    </Router>
  );
}

export default App;
