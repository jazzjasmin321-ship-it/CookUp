import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
const location = useLocation();
const navigate = useNavigate();

const handleLogout = () => {
localStorage.removeItem("cookupUser");
navigate("/login");
};

return (
<>
{/* TOP NAVBAR */}

  <header className="top-navbar">

    <div className="navbar-brand">
      <h1>CookUp</h1>
    </div>

    <div className="search-container">

      <span className="search-icon">⌕</span>

      <input
        type="text"
        placeholder="Search recipes..."
      />

    </div>

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
