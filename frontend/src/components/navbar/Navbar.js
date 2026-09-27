import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("cookupUser");
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();

    const query = searchText.trim();

    if (!query) {
      navigate("/");
      return;
    }

    navigate(`/?search=${encodeURIComponent(query)}`);
  };

  return (
    <>
      {/* TOP NAVBAR */}

      <header className="top-navbar">

        <div className="navbar-brand">
          <h1>CookUp</h1>
        </div>

        <form
          className="search-container"
          onSubmit={handleSearch}
        >

          <span className="search-icon">⌕</span>

          <input
            type="text"
            placeholder="Search recipes..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

        </form>

      </header>


      {/* BOTTOM NAVIGATION */}

      <nav className="bottom-navbar">

        <Link
          to="/"
          className={`bottom-nav-item ${
            location.pathname === "/" ? "active" : ""
          }`}
        >
          <span className="nav-icon">⌂</span>
          <span>Home</span>
        </Link>


        <Link
          to="/create-recipe"
          className={`bottom-nav-item ${
            location.pathname === "/create-recipe"
              ? "active"
              : ""
          }`}
        >
          <span className="nav-icon create-icon">+</span>
          <span>Create</span>
        </Link>


        <Link
          to="/profile"
          className={`bottom-nav-item ${
            location.pathname === "/profile"
              ? "active"
              : ""
          }`}
        >
          <span className="nav-icon">◯</span>
          <span>Profile</span>
        </Link>


        <button
          type="button"
          className="bottom-nav-item logout-button"
          onClick={handleLogout}
        >
          <span className="nav-icon">↪</span>
          <span>Logout</span>
        </button>

      </nav>
    </>
  );
}

export default Navbar;