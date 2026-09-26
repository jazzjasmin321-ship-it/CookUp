import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateRecipe.css";

function CreateRecipe() {

const navigate = useNavigate();

const [recipe, setRecipe] = useState({
name: "",
image: null,
ingredients: "",
instructions: "",
time: "",
level: "",
});

const [imagePreview, setImagePreview] = useState(null);

const [error, setError] = useState("");
const [loading, setLoading] = useState(false);

const handleChange = (e) => {

setRecipe({
  ...recipe,
  [e.target.name]: e.target.value,
});


};

const handleImageChange = (e) => {


const file = e.target.files[0];

if (file) {

  setRecipe({
    ...recipe,
    image: file,
  });

  setImagePreview(
    URL.createObjectURL(file)
  );

}


};

const handleSubmit = async (e) => {


e.preventDefault();

setError("");
setLoading(true);

try {

  const savedUser =
    localStorage.getItem("cookupUser");

  if (!savedUser) {

    setError(
      "Please log in before creating a recipe."
    );

    setLoading(false);

    return;
  }


  const user = JSON.parse(savedUser);


  /*
   * Image is stored as a filename.
   * The actual image must exist inside:
   * cooked/public/images/
   */
  const pictureName =
    recipe.image
      ? recipe.image.name
      : "";


  const recipeData = {

    name: recipe.name,

    picture: pictureName,

    ingredients: recipe.ingredients,

    instructions: recipe.instructions,

    time: recipe.time,

    level: recipe.level,

    chefId: user.id

  };


  console.log(
    "Sending recipe:",
    recipeData
  );


  const response = await fetch(
    "http://localhost:8080/api/recipes",
    {
      method: "POST",

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
      message || "Failed to create recipe."
    );

  }


  const createdRecipe =
    await response.json();


  console.log(
    "Recipe created:",
    createdRecipe
  );


  alert(
    "Recipe created successfully!"
  );


  navigate("/");


} catch (error) {

  console.error(
    "Create recipe error:",
    error
  );

  setError(
    error.message ||
    "Unable to create recipe."
  );

} finally {

  setLoading(false);

}


};

return ( <div className="recipe-page">


  <div className="recipe-card">

    <div className="recipe-header">

      <h1>
        Create Recipe
      </h1>

      <p>
        Share your delicious recipe with the CookUp community.
      </p>

    </div>


    <form onSubmit={handleSubmit}>


      {/* ================= RECIPE NAME ================= */}

      <div className="recipe-section">

        <label>
          Recipe Name
        </label>

        <input
          type="text"
          name="name"
          placeholder="Enter your recipe name"
          value={recipe.name}
          onChange={handleChange}
          required
        />

      </div>


      {/* ================= IMAGE ================= */}

      <div className="recipe-section">

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

            <div className="upload-icon">
              +
            </div>

            <strong>
              Add Recipe Image
            </strong>

            <span>
              Upload PNG, JPG or JPEG
            </span>

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


      {/* ================= INGREDIENTS + INSTRUCTIONS ================= */}

      <div className="recipe-grid">

        <div className="recipe-section">

          <label>
            Ingredients
          </label>

          <textarea
            name="ingredients"
            placeholder="List the ingredients you need..."
            value={recipe.ingredients}
            onChange={handleChange}
            required
          ></textarea>

        </div>


        <div className="recipe-section">

          <label>
            Instructions
          </label>

          <textarea
            name="instructions"
            placeholder="Explain how to prepare your recipe..."
            value={recipe.instructions}
            onChange={handleChange}
            required
          ></textarea>

        </div>

      </div>


      {/* ================= TIME + DIFFICULTY ================= */}

      <div className="recipe-grid">

        <div className="recipe-section">

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


        <div className="recipe-section">

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
              Select difficulty
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


      {/* ================= ERROR ================= */}

      {error && (

        <p
          style={{
            color: "#dc2626",
            fontSize: "13px",
            marginTop: "10px"
          }}
        >
          {error}
        </p>

      )}


      {/* ================= BUTTONS ================= */}

      <div className="recipe-buttons">

        <button
          type="button"
          className="cancel-btn"
          onClick={() => navigate("/")}
        >
          Cancel
        </button>


        <button
          type="submit"
          className="save-btn"
          disabled={loading}
        >

          {loading
            ? "Creating Recipe..."
            : "Create Recipe"}

        </button>

      </div>

    </form>

  </div>

</div>


);
}

export default CreateRecipe;
