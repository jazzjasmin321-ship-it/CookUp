import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./MyRecipes.css";

function MyRecipes() {

  const navigate = useNavigate();

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {

    const loadMyRecipes = async () => {

      try {

        setLoading(true);
        setError("");


        // Get logged-in user
        const savedUser =
          localStorage.getItem("cookupUser");


        if (!savedUser) {

          setError(
            "Please log in to view your recipes."
          );

          setLoading(false);

          return;
        }


        const user = JSON.parse(savedUser);


        // Get recipes created by this user
        const response = await fetch(
          `http://localhost:8080/api/users/${user.id}/recipes`
        );


        if (!response.ok) {

          throw new Error(
            "Unable to load your recipes."
          );

        }


        const data = await response.json();


        setRecipes(data);
        setLoading(false);


      } catch (error) {

        console.error(
          "Error loading recipes:",
          error
        );

        setError(
          "Unable to load your recipes."
        );

        setLoading(false);

      }

    };


    loadMyRecipes();

  }, []);


  /*
   * Delete recipe
   */
  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this recipe?"
    );


    if (!confirmDelete) {
      return;
    }


    try {

      const response = await fetch(
        `http://localhost:8080/api/recipes/${id}`,
        {
          method: "DELETE"
        }
      );


      if (!response.ok) {

        throw new Error(
          "Unable to delete recipe."
        );

      }


      // Remove deleted recipe from screen
      setRecipes(
        recipes.filter(
          (recipe) => recipe.id !== id
        )
      );


      alert(
        "Recipe deleted successfully!"
      );


    } catch (error) {

      console.error(
        "Delete error:",
        error
      );

      alert(
        "Unable to delete recipe."
      );

    }

  };


  return (

    <div className="my-recipes-page">


      {/* Header */}

      <div className="my-recipes-header">

        <div>

          <h1>
            My Recipes
          </h1>

          <p>
            Your delicious creations in one place.
          </p>

        </div>


        <Link
          to="/create-recipe"
          className="create-new-btn"
        >

          <span>
            +
          </span>

          Create Recipe

        </Link>

      </div>


      {/* Loading */}

      {loading && (

        <p>
          Loading your recipes...
        </p>

      )}


      {/* Error */}

      {!loading && error && (

        <p
          style={{
            color: "#dc2626",
            textAlign: "center"
          }}
        >
          {error}
        </p>

      )}


      {/* Empty */}

      {!loading &&
        !error &&
        recipes.length === 0 && (

          <div
            style={{
              textAlign: "center",
              padding: "50px 20px"
            }}
          >

            <h2>
              No recipes yet
            </h2>

            <p>
              Create your first recipe and it will appear here.
            </p>

            <Link
              to="/create-recipe"
              className="create-new-btn"
            >
              Create Recipe
            </Link>

          </div>

        )}


      {/* Recipe Grid */}

      {!loading &&
        !error &&
        recipes.length > 0 && (

          <div className="my-recipes-grid">

            {recipes.map((recipe) => (

              <div
                className="my-recipe-card"
                key={recipe.id}
              >


                {/* Image */}

                <div className="my-recipe-image">

                  {recipe.picture ? (

                    <img
                      src={`/images/${recipe.picture}`}
                      alt={recipe.name}
                    />

                  ) : (

                    <div>
                      🍛
                    </div>

                  )}

                </div>


                {/* Content */}

                <div className="my-recipe-content">

                  <h2>
                    {recipe.name}
                  </h2>


                  <div className="recipe-meta">

                    <span>
                      {recipe.time}
                    </span>

                    <span>
                      •
                    </span>

                    <span>
                      {recipe.level}
                    </span>

                    <span>
                      •
                    </span>

                    <span>
                      {recipe.views} views
                    </span>

                  </div>


                  {/* Buttons */}

                  <div className="my-recipe-actions">


                    <button
                      className="edit-recipe-btn"
                      onClick={() =>
                        navigate(
                          `/edit-recipe/${recipe.id}`
                        )
                      }
                    >
                      Edit
                    </button>


                    <button
                      className="delete-recipe-btn"
                      onClick={() =>
                        handleDelete(recipe.id)
                      }
                    >
                      Delete
                    </button>


                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

    </div>

  );

}

export default MyRecipes;