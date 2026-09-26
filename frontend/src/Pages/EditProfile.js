
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EditProfile.css";

function EditProfile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    fullname: "",
    email: "",
    bio: "",
    profilePicture: "",
  });

  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const savedUser =
          localStorage.getItem("cookupUser");

        if (!savedUser) {
          navigate("/login");
          return;
        }

        const user = JSON.parse(savedUser);

        const response = await fetch(
          `http://localhost:8080/api/users/${user.id}`
        );

        if (!response.ok) {
          throw new Error("Unable to load profile.");
        }

        const data = await response.json();

        setProfile({
          fullname: data.fullname || "",
          email: data.email || "",
          bio: data.bio || "",
          profilePicture: data.profilePicture || "",
        });

        if (data.profilePicture) {
          setImage(`/images/${data.profilePicture}`);
        }

      } catch (error) {
        console.error(
          "Profile loading error:",
          error
        );

        setError("Unable to load profile.");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [navigate]);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImageFile(file);
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSaving(true);

    try {
      const savedUser =
        localStorage.getItem("cookupUser");

      if (!savedUser) {
        navigate("/login");
        return;
      }

      const user = JSON.parse(savedUser);

      const pictureName = imageFile
        ? imageFile.name
        : profile.profilePicture;

      const updatedUser = {
        fullname: profile.fullname,
        email: profile.email,
        bio: profile.bio,
        profilePicture: pictureName,
      };

      const response = await fetch(
        `http://localhost:8080/api/users/${user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        }
      );

      if (!response.ok) {
        const message = await response.text();

        throw new Error(
          message || "Unable to update profile."
        );
      }

      const data = await response.json();

      // Keep the updated user in localStorage
      localStorage.setItem(
        "cookupUser",
        JSON.stringify(data)
      );

      alert("Profile updated successfully!");

      navigate("/profile");

    } catch (error) {
      console.error(
        "Profile update error:",
        error
      );

      setError(
        error.message ||
        "Unable to update profile."
      );

    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="edit-profile-page">
        <div className="edit-profile-card">
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="edit-profile-page">

      <div className="edit-profile-card">

        <div className="edit-profile-header">
          <h1>Edit Profile</h1>

          <p>
            Update your profile information and tell the community
            a little about yourself.
          </p>
        </div>

        <form onSubmit={handleSubmit}>

          {/* PROFILE IMAGE */}
          <div className="profile-image-section">

            <div className="profile-image-preview">

              {image ? (
                <img
                  src={image}
                  alt="Profile"
                />
              ) : (
                <span>
                  {profile.fullname
                    ? profile.fullname
                        .charAt(0)
                        .toUpperCase()
                    : "👤"}
                </span>
              )}

            </div>

            <div className="image-upload">

              <label htmlFor="profileImage">
                Change Photo
              </label>

              <input
                id="profileImage"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />

              <p>JPG, PNG or JPEG</p>

            </div>

          </div>

          {/* NAME */}
          <div className="edit-form-group">

            <label>Name</label>

            <input
              type="text"
              name="fullname"
              value={profile.fullname}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />

          </div>

          {/* EMAIL */}
          <div className="edit-form-group">

            <label>Email</label>

            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />

          </div>

          {/* BIO */}
          <div className="edit-form-group">

            <label>Bio</label>

            <textarea
              name="bio"
              value={profile.bio}
              onChange={handleChange}
              placeholder="Tell us something about yourself..."
              rows="5"
            ></textarea>

          </div>

          {error && (
            <p
              style={{
                color: "#dc2626",
                fontSize: "14px",
                marginTop: "10px",
              }}
            >
              {error}
            </p>
          )}

          {/* PROFILE ACTIONS */}
          <div className="edit-profile-actions">

            <button
              type="button"
              className="edit-cancel-btn"
              onClick={() => navigate("/profile")}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="edit-save-btn"
              disabled={saving}
            >
              {saving
                ? "Saving Changes..."
                : "Save Changes"}
            </button>

          </div>

        </form>

        {/* ACCOUNT SECURITY */}
        <div className="account-security">

          <div className="security-header">

            <h2>Account Security</h2>

            <p>
              Manage your password and keep your account secure.
            </p>

          </div>

          <button
            className="change-password-option"
            onClick={() =>
              navigate("/change-password")
            }
          >

            <div className="security-icon">
              🔒
            </div>

            <div className="security-text">

              <h3>Change Password</h3>

              <p>
                Update your account password
              </p>

            </div>

            <span className="security-arrow">
              →
            </span>

          </button>

        </div>

      </div>

    </div>
  );
}

export default EditProfile;
