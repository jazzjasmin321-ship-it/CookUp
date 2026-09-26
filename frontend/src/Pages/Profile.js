import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Profile.css";

function Profile() {

const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => {


const loadProfile = async () => {

  try {

    const savedUser =
      localStorage.getItem("cookupUser");

    if (!savedUser) {
      setLoading(false);
      return;
    }

    const loggedInUser =
      JSON.parse(savedUser);

    const response = await fetch(
      `http://localhost:8080/api/users/${loggedInUser.id}`
    );

    if (!response.ok) {
      throw new Error("Unable to load profile.");
    }

    const data = await response.json();

    setUser(data);

  } catch (error) {

    console.error(
      "Profile loading error:",
      error
    );

  } finally {

    setLoading(false);

  }

};

loadProfile();


}, []);

if (loading) {


return (
  <div className="profile-page">
    <p>Loading profile...</p>
  </div>
);


}

if (!user) {


return (
  <div className="profile-page">
    <p>Please log in to view your profile.</p>
  </div>
);


}

return (


<div className="profile-page">


  {/* PROFILE SECTION */}

  <section className="profile-section">

    <div className="profile-image">

      {user.profilePicture ? (

        <img
          src={`/images/${user.profilePicture}`}
          alt={user.fullname}
        />

      ) : (

        <span>
          {user.fullname
            ? user.fullname.charAt(0).toUpperCase()
            : "J"}
        </span>

      )}

    </div>


    <h1>
      {user.fullname}
    </h1>


    <a
  href={`mailto:${user.email}`}
  className="profile-email"
>
  {user.email}
</a>

    <p className="profile-bio">

      {user.bio ||
        "Food lover who enjoys cooking, trying new recipes, and sharing delicious dishes with others."}

    </p>


    <Link
      to="/edit-profile"
      className="edit-profile-btn"
    >
      Edit Profile
    </Link>


    {/* MY RECIPES BUTTON */}

    <Link
      to="/my-recipes"
      className="my-recipes-btn"
    >
      My Recipes →
    </Link>

  </section>


</div>


);

}

export default Profile;
