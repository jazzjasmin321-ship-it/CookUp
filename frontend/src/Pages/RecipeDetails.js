import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./RecipeDetails.css";

function RecipeDetails() {

  const { id } = useParams();

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {

  const loadRecipe = async () => {

    try {

      setLoading(true);
      setError("");

      // First get the recipe details
      const response = await fetch(
        `http://localhost:8080/api/recipes/${id}`
      );

      if (!response.ok) {
        throw new Error("Recipe not found");
      }

      let data = await response.json();


      /*
       * Count one view for this recipe visit.
       *
       * sessionStorage prevents the React development
       * duplicate request from counting twice.
       */
      const viewKey = `cookup-viewed-${id}`;

      if (!sessionStorage.getItem(viewKey)) {

        sessionStorage.setItem(viewKey, "true");

        const viewResponse = await fetch(
          `http://localhost:8080/api/recipes/${id}/view`,
          {
            method: "POST"
          }
        );

        if (viewResponse.ok) {
          data = await viewResponse.json();
        }
      }


      setRecipe(data);
      setLoading(false);

    } catch (error) {

      console.error(
        "Error loading recipe:",
        error
      );

      setError("Recipe not found.");
      setLoading(false);

    }

  };

  loadRecipe();

}, [id]);


  if (loading) {

    return (
      <main className="recipe-details-not-found">

        <h1>
          Loading Recipe...
        </h1>

      </main>
    );

  }


  if (error || !recipe) {

    return (
      <main className="recipe-details-not-found">

        <h1>
          Recipe Not Found
        </h1>

        <Link
          to="/"
          className="recipe-details-back-btn"
        >
          ← Back to Recipes
        </Link>

      </main>
    );

  }


  const ingredients = recipe.ingredients
    ? recipe.ingredients
        .split(",")
        .map((item) => item.trim())
    : [];


  const instructions = recipe.instructions
    ? recipe.instructions
        .split(".")
        .map((item) => item.trim())
        .filter((item) => item.length > 0)
    : [];


  return (

    <main className="recipe-details-page">

      {/* Back button */}

      <div className="recipe-details-back-container">

        <Link
          to="/"
          className="recipe-details-back-btn"
        >
          ← Back to Recipes
        </Link>

      </div>


      {/* Recipe header */}

      <section className="recipe-details-header">


        {/* Image */}

        <div className="recipe-details-image">

          {recipe.picture ? (

            <img
              src={`/images/${recipe.picture}`}
              alt={recipe.name}
            />

          ) : (

            <div className="recipe-details-image-placeholder">
              🍛
            </div>

          )}

        </div>


        {/* Recipe information */}

        <div className="recipe-details-info">

          <p className="recipe-details-category">
            {recipe.level}
          </p>


          <h1>
            {recipe.name}
          </h1>


          <p className="recipe-details-description">

            A delicious homemade{" "}

            {recipe.name.toLowerCase()}{" "}

            created by{" "}

            {recipe.chef?.fullname || "CookUp Chef"}.

          </p>


          {/* Meta */}

          <div className="recipe-details-meta">

            <div>

              <span>⏱</span>

              <p>
                {recipe.time}
              </p>

            </div>


            <div>

              <span>📊</span>

              <p>
                {recipe.level}
              </p>

            </div>


            <div>

              <span>👁</span>

              <p>
                {recipe.views} views
              </p>

            </div>

          </div>


          <button
            className="recipe-details-save-btn"
          >
            ♡ Save Recipe
          </button>

        </div>

      </section>


      {/* Recipe content */}

      <section className="recipe-details-content">


        {/* Ingredients */}

        <div className="recipe-details-ingredients">

          <h2>
            Ingredients
          </h2>


          <ul>

            {ingredients.map(
              (ingredient, index) => (

                <li key={index}>
                  {ingredient}
                </li>

              )
            )}

          </ul>

        </div>


        {/* Instructions */}

        <div className="recipe-details-instructions">

          <h2>
            Making Steps
          </h2>


          {instructions.map(
            (step, index) => (

              <div
                className="recipe-details-step"
                key={index}
              >

                <span>
                  {index + 1}
                </span>

                <p>
                  {step}.
                </p>

              </div>

            )
          )}

        </div>


      </section>

    </main>

  );

}


export default RecipeDetails;