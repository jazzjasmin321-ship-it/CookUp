import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event) => {

    event.preventDefault();

    setError("");
    setLoading(true);

    try {

      const response = await fetch(
        "http://localhost:8080/api/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            email: email,
            password: password
          })
        }
      );

      if (!response.ok) {

        if (response.status === 401) {
          throw new Error("Invalid email or password.");
        }

        throw new Error("Something went wrong. Please try again.");
      }

      const user = await response.json();

      console.log("Login successful:", user);

      /*
       * Save the logged-in user's information
       * so other pages can use it.
       */
      localStorage.setItem(
        "cookupUser",
        JSON.stringify(user)
      );

      /*
       * Go to Home after successful login.
       */
      navigate("/");

    } catch (error) {

      console.error("Login error:", error);

      setError(error.message);

    } finally {

      setLoading(false);

    }
  };


  return (
    <div className="login-page">

      <div className="login-card">

        {/* Logo */}
        <div className="login-logo">
          COOKED<span>.</span>
        </div>

        <h1>Welcome back</h1>

        <p className="login-description">
          Log in to continue exploring delicious recipes.
        </p>

        {/* Login Form */}
        <form
          className="login-form"
          onSubmit={handleLogin}
        >

          {/* Email */}
          <div className="input-group">

            <label>
              Email address
            </label>

            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              required
            />

          </div>


          {/* Password */}
          <div className="input-group">

            <div className="password-label">

              <label>
                Password
              </label>

              <Link to="/forgot-password">
                Forgot password?
              </Link>

            </div>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              required
            />

          </div>


          {/* Error message */}
          {error && (
            <p
              style={{
                color: "#dc2626",
                fontSize: "13px",
                margin: "5px 0 0"
              }}
            >
              {error}
            </p>
          )}


          {/* Login button */}
          <button
            type="submit"
            className="login-submit"
            disabled={loading}
          >

            {loading
              ? "Logging in..."
              : "Log in"}

          </button>

        </form>


        {/* Signup */}
        <p className="login-signup">

          Don't have an account?

          <Link to="/signup">
            {" "}Create an account
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Login;