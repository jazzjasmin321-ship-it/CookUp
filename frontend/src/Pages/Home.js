import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "./Home.css";

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  useEffect(() => {
    fetch("http://localhost:8080/api/recipes")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch recipes");
        }

        return response.json();
      })
      .then((data) => {
        setRecipes(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading recipes:", error);
        setError("Unable to load recipes.");
        setLoading(false);
      });
  }, []);

  const filteredRecipes = recipes.filter((recipe) => {
    if (!searchQuery.trim()) {
      return true;
    }

    const query = searchQuery.toLowerCase();

    const recipeName = recipe.name?.toLowerCase() || "";
    const chefName = recipe.chef?.fullname?.toLowerCase() || "";

    return (
      recipeName.includes(query) ||
      chefName.includes(query)
    );
  });

  return (
    <main className="home-page">

      {/* MOST POPULAR */}

      <section className="popular-section">

        <div className="popular-heading">

          <div>
            <p className="section-label">
              EXPLORE
            </p>

            <h2>
              {searchQuery
                ? `Search Results for "${searchQuery}"`
                : "Most Popular Dishes"}
            </h2>

            <p className="section-description">
              {searchQuery
                ? `${filteredRecipes.length} recipe${
                    filteredRecipes.length !== 1 ? "s" : ""
                  } found.`
                : "A sneak peek at what everyone is cooking."}
            </p>
          </div>

        </div>

        {/* LOADING */}

        {loading && (
          <p>Loading recipes...</p>
        )}

        {/* ERROR */}

        {error && (
          <p>{error}</p>
        )}

        {/* NO SEARCH RESULTS */}

        {!loading && !error && filteredRecipes.length === 0 && (
          <div className="no-results">
            <p>No recipes found.</p>
          </div>
        )}

        {/* RECIPE GRID */}

        {!loading && !error && filteredRecipes.length > 0 && (
          <div className="recipe-grid">

            {filteredRecipes.map((recipe) => (

              <div
                className="recipe-card"
                key={recipe.id}
              >

                {/* IMAGE */}

                <div className="recipe-image">

                  {recipe.picture ? (
                    <img
                      src={`/images/${recipe.picture}`}
                      alt={recipe.name}
                    />
                  ) : (
                    <span className="recipe-emoji">
                      🍛
                    </span>
                  )}

                </div>

                {/* CONTENT */}

                <div className="recipe-content">

                  <span className="recipe-type">
                    {recipe.level}
                  </span>

                  <h3>
                    {recipe.name}
                  </h3>

                  <p className="creator">
                    by{" "}
                    <strong>
                      {recipe.chef?.fullname || "CookUp Chef"}
                    </strong>
                  </p>

                  <p>
                    {recipe.time}
                  </p>

                  <p>
                    Views: {recipe.views}
                  </p>

                  {/* VIEW RECIPE */}

                  <Link
                    to={`/recipe/${recipe.id}`}
                    className="view-recipe-btn"
                  >
                    View Recipe →
                  </Link>

                </div>

              </div>

            ))}

          </div>
        )}

      </section>

    </main>
  );
}

export default Home;