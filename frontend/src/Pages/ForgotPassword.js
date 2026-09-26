
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ForgotPassword.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Password reset link has been sent to your email.");
  };

  return (
    <main className="forgot-page">

      {/* CookUp Heading */}
      <div className="forgot-brand">
        <h1>CookUp</h1>
        <p>Cook. Share. Enjoy.</p>
      </div>

      {/* Forgot Password Card */}
      <div className="forgot-container">

        <div className="forgot-header">
          <h2>Forgot Password?</h2>

          <p>
            Enter your email address and we'll send you
            a link to reset your password.
          </p>
        </div>

        <form className="forgot-form" onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Email Address</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="reset-btn">
            Send Reset Link
          </button>

        </form>

        <p className="back-login">
          Remember your password?{" "}
          <Link to="/login">
            Log In
          </Link>
        </p>

      </div>

    </main>
  );
}

export default ForgotPassword;
