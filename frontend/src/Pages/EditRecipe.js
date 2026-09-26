import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./CreateRecipe.css";

function EditRecipe() {

  const navigate = useNavigate();
  const { id } = useParams();

  const [recipe, setRecipe] = useState({
    name: "",
    picture: "",
    image: null,
    ingredients: "",
    instructions: "",
    time: "",
    level: "",
    chefId: null
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");


  /*
   * Load recipe from Spring Boot
   */

  useEffect(() => {

    const loadRecipe = async () => {

      try {

        setLoading(true);
        setError("");

        const response = await fetch(
          `http://localhost:8080/api/recipes/${id}`
        );

        if (!response.ok) {
          throw new Error("Recipe not found.");
        }

        const data = await response.json();

        console.log("Recipe loaded:", data);

        setRecipe({
          name: data.name || "",
          picture: data.picture || "",
          image: null,
          ingredients: data.ingredients || "",
          instructions: data.instructions || "",
          time: data.time || "",
          level: data.level || "",
          chefId: data.chef?.id || null
        });

        if (data.picture) {
          setImagePreview(
            `/images/${data.picture}`
          );
        }

        setLoading(false);

      } catch (error) {

        console.error(
          "Error loading recipe:",
          error
        );

        setError(
          "Unable to load recipe."
        );

        setLoading(false);

      }

    };

    loadRecipe();

  }, [id]);


  /*
   * Handle input changes
   */

  const handleChange = (e) => {

    setRecipe({
      ...recipe,
      [e.target.name]: e.target.value
    });

  };


  /*
   * Handle image change
   */

  const handleImageChange = (e) => {

    const file = e.target.files[0];

    if (file) {

      setRecipe({
        ...recipe,
        image: file
      });

      setImagePreview(
        URL.createObjectURL(file)
      );

    }

  };


  /*
   * Save updated recipe
   */

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");
    setSaving(true);

    try {

      const savedUser =
        localStorage.getItem("cookupUser");

      if (!savedUser) {

        throw new Error(
          "Please log in before editing a recipe."
        );

      }

      const user =
        JSON.parse(savedUser);


      /*
       * Keep old image unless
       * a new image is selected.
       */

      const pictureName =
        recipe.image
          ? recipe.image.name
          : recipe.picture;


      const recipeData = {

        name: recipe.name,

        picture: pictureName,

        ingredients: recipe.ingredients,

        instructions: recipe.instructions,

        time: recipe.time,

        level: recipe.level,

        chefId: recipe.chefId || user.id

      };


      console.log(
        "Sending updated recipe:",
        recipeData
      );


      const response = await fetch(

        `http://localhost:8080/api/recipes/${id}`,

        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(recipeData)
        }

      );


      if (!response.ok) {

        const message =
          await response.text();

        throw new Error(
          message ||
          "Unable to update recipe."
        );

      }


      const updatedRecipe =
        await response.json();


      console.log(
        "Updated recipe:",
        updatedRecipe
      );


      alert(
        "Recipe updated successfully!"
      );


      navigate(
        `/recipe/${id}`
      );


    } catch (error) {

      console.error(
        "Update recipe error:",
        error
      );

      setError(
        error.message ||
        "Unable to update recipe."
      );

    } finally {

      setSaving(false);

    }

  };


  /*
   * Loading
   */

  if (loading) {

    return (

      <div className="recipe-page">

        <div className="recipe-card">

          <p>
            Loading recipe...
          </p>

        </div>

      </div>

    );

  }


  return (

    <div className="recipe-page">

      <div className="recipe-card">


        {/* Header */}

        <div className="recipe-header">

          <h1>
            Edit Recipe
          </h1>

          <p>
            Update your recipe details and keep your recipe fresh.
          </p>

        </div>


        <form onSubmit={handleSubmit}>


          {/* Recipe Name */}

          <div className="form-group">

            <label>
              Recipe Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter recipe name"
              value={recipe.name}
              onChange={handleChange}
              required
            />

          </div>


          {/* Recipe Image */}

          <div className="form-group">

            <label>
              Recipe Image
            </label>

            <div className="image-upload">

              <input
                type="file"
                id="recipe-image"
                accept="image/*"
                onChange={handleImageChange}
              />

              <label
                htmlFor="recipe-image"
                className="image-upload-label"
              >

                <span className="upload-icon">
                  ＋
                </span>

                <span>
                  Change Recipe Image
                </span>

                <small>
                  PNG, JPG or JPEG
                </small>

              </label>

            </div>


            {imagePreview && (

              <div className="image-preview">

                <img
                  src={imagePreview}
                  alt="Recipe Preview"
                />

              </div>

            )}

          </div>


          {/* Ingredients */}

          <div className="form-group">

            <label>
              Ingredients
            </label>

            <textarea
              name="ingredients"
              placeholder="Update your ingredients"
              value={recipe.ingredients}
              onChange={handleChange}
              rows="5"
              required
            ></textarea>

          </div>


          {/* Instructions */}

          <div className="form-group">

            <label>
              Instructions
            </label>

            <textarea
              name="instructions"
              placeholder="Update the preparation steps"
              value={recipe.instructions}
              onChange={handleChange}
              rows="6"
              required
            ></textarea>

          </div>


          {/* Cooking Time & Difficulty */}

          <div className="recipe-row">

            <div className="form-group">

              <label>
                Cooking Time
              </label>

              <input
                type="text"
                name="time"
                placeholder="e.g. 30 minutes"
                value={recipe.time}
                onChange={handleChange}
                required
              />

            </div>


            <div className="form-group">

              <label>
                Difficulty
              </label>

              <select
                name="level"
                value={recipe.level}
                onChange={handleChange}
                required
              >

                <option value="">
                  Select level
                </option>

                <option value="Easy">
                  Easy
                </option>

                <option value="Medium">
                  Medium
                </option>

                <option value="Hard">
                  Hard
                </option>

              </select>

            </div>

          </div>


          {/* Error */}

          {error && (

            <p
              style={{
                color: "#dc2626",
                fontSize: "14px",
                marginTop: "10px"
              }}
            >
              {error}
            </p>

          )}


          {/* Buttons */}

          <div className="recipe-buttons">

            <button
              type="button"
              className="cancel-btn"
              onClick={() =>
                navigate(`/recipe/${id}`)
              }
            >
              Cancel
            </button>


            <button
              type="submit"
              className="save-btn"
              disabled={saving}
            >

              {saving
                ? "Saving Changes..."
                : "Save Changes"}

            </button>

          </div>

        </form>

      </div>

    </div>

  );

}

export default EditRecipe;