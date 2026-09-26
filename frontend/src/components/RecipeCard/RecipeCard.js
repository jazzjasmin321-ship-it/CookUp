import React from "react";
import { Link } from "react-router-dom";
import "./RecipeCard.css";

function RecipeCard({
  id,
  name,
  image,
  cookingTime,
  difficulty
}) {
  return (
    <Link
      to={`/recipe/${id}`}
      className="recipe-link"
    >

      <div className="recipe-card">

        <div className="recipe-image">
          {image}
        </div>

        <div className="recipe-info">

          <h3>{name}</h3>

          <p className="recipe-time">
            ⏱ {cookingTime}
          </p>

          <p className="recipe-difficulty">
            Difficulty: {difficulty}
          </p>

        </div>

      </div>

    </Link>
  );
}

export default RecipeCard;