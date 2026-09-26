import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  return (
    <main className="home-page">

      {/* VEG / NON-VEG */}

      <section className="category-section">

        <button className="category-btn active">
          <span className="category-dot veg-dot"></span>
          Veg
        </button>

        <button className="category-btn">
          <span className="category-dot nonveg-dot"></span>
          Non-Veg
        </button>

      </section>

      {/* MOST POPULAR */}

      <section className="popular-section">

        <div className="popular-heading">

          <div>
            <p className="section-label">
              EXPLORE
            </p>

            <h2>
              Most Popular Dishes
            </h2>

            <p className="section-description">
              A sneak peek at what everyone is cooking.
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

        {/* RECIPE GRID */}

        {!loading && !error && (
          <div className="recipe-grid">

            {recipes.map((recipe) => (

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