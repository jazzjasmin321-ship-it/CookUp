import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ChangePassword.css";

function ChangePassword() {
  const navigate = useNavigate();

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (passwords.newPassword !== passwords.confirmPassword) {
      alert("New passwords do not match!");
      return;
    }

    alert("Password changed successfully!");

    navigate("/profile");
  };

  return (
    <div className="change-password-page">

      <div className="change-password-card">

        {/* Header */}
        <div className="change-password-header">
          <h1>Change Password</h1>
          <p>
            Update your password to keep your account secure.
          </p>
        </div>

        <form onSubmit={handleSubmit}>

          {/* Current Password */}
          <div className="password-form-group">
            <label>Current Password</label>

            <input
              type={showPassword ? "text" : "password"}
              name="currentPassword"
              value={passwords.currentPassword}
              onChange={handleChange}
              placeholder="Enter current password"
              required
            />
          </div>

          {/* New Password */}
          <div className="password-form-group">
            <label>New Password</label>

            <input
              type={showPassword ? "text" : "password"}
              name="newPassword"
              value={passwords.newPassword}
              onChange={handleChange}
              placeholder="Enter new password"
              minLength="6"
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="password-form-group">
            <label>Confirm New Password</label>

            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              value={passwords.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm new password"
              minLength="6"
              required
            />
          </div>

          {/* Show Password */}
          <div className="show-password">
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />

            <label htmlFor="showPassword">
              Show password
            </label>
          </div>

          {/* Buttons */}
          <div className="change-password-actions">

            <button
              type="button"
              className="password-cancel-btn"
              onClick={() => navigate("/profile")}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="password-save-btn"
            >
              Change Password
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default ChangePassword;