import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";

function Signup() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");


    // Check passwords
    if (formData.password !== formData.confirmPassword) {

      setError("Passwords do not match!");

      return;
    }


    setLoading(true);


    try {

      const response = await fetch(
        "http://localhost:8080/api/register",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            fullname: formData.name,
            email: formData.email,
            password: formData.password
          })
        }
      );


      if (!response.ok) {

        throw new Error(
          "Unable to create account. Please try again."
        );

      }


      const user = await response.json();

      console.log("Account created:", user);


      // Save the newly created user
      localStorage.setItem(
        "cookupUser",
        JSON.stringify(user)
      );


      // Go to Home
      navigate("/");


    } catch (error) {

      console.error(
        "Signup error:",
        error
      );

      setError(error.message);

    } finally {

      setLoading(false);

    }

  };


  return (
    <main className="signup-page">

      {/* CookUp Heading */}
      <div className="signup-brand">

        <h1>CookUp</h1>

        <p>
          Cook. Share. Enjoy.
        </p>

      </div>


      {/* Signup Form Card */}
      <div className="signup-container">

        <div className="signup-header">

          <h2>Create an Account</h2>

          <p>
            Join CookUp and share your favorite recipes.
          </p>

        </div>


        <form
          className="signup-form"
          onSubmit={handleSubmit}
        >

          {/* Full Name */}
          <div className="form-group">

            <label>
              Full Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />

          </div>


          {/* Email */}
          <div className="form-group">

            <label>
              Email Address
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />

          </div>


          {/* Password */}
          <div className="form-group">

            <label>
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
            />

          </div>


          {/* Confirm Password */}
          <div className="form-group">

            <label>
              Confirm Password
            </label>

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />

          </div>


          {/* Error */}
          {error && (
            <p
              style={{
                color: "#dc2626",
                fontSize: "13px",
                margin: "5px 0"
              }}
            >
              {error}
            </p>
          )}


          {/* Submit */}
          <button
            type="submit"
            className="signup-btn"
            disabled={loading}
          >

            {loading
              ? "Creating Account..."
              : "Create Account"}

          </button>

        </form>


        {/* Login */}
        <p className="login-text">

          Already have an account?{" "}

          <Link to="/login">
            Log in
          </Link>

        </p>

      </div>

    </main>
  );
}

export default Signup;