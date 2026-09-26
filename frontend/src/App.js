import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation
} from "react-router-dom";

import Navbar from "./components/navbar/Navbar";

import Home from "./Pages/Home";
import RecipeDetails from "./Pages/RecipeDetails";

import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import ForgotPassword from "./Pages/ForgotPassword";

import CreateRecipe from "./Pages/CreateRecipe";
import EditRecipe from "./Pages/EditRecipe";

import Profile from "./Pages/Profile";
import MyRecipes from "./Pages/MyRecipes";
import EditProfile from "./Pages/EditProfile";
import ChangePassword from "./Pages/ChangePassword";


function AppContent() {

  const location = useLocation();

  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/forgot-password";


  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>

        {/* HOME */}

        <Route
          path="/"
          element={<Home />}
        />


        {/* RECIPE DETAILS */}

        <Route
          path="/recipe/:id"
          element={<RecipeDetails />}
        />


        {/* LOGIN */}

        <Route
          path="/login"
          element={<Login />}
        />


        {/* SIGNUP */}

        <Route
          path="/signup"
          element={<Signup />}
        />


        {/* FORGOT PASSWORD */}

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />


        {/* CREATE RECIPE */}

        <Route
          path="/create-recipe"
          element={<CreateRecipe />}
        />


        {/* EDIT RECIPE */}

        <Route
          path="/edit-recipe/:id"
          element={<EditRecipe />}
        />


        {/* PROFILE */}

        <Route
          path="/profile"
          element={<Profile />}
        />


        {/* MY RECIPES */}

        <Route
          path="/my-recipes"
          element={<MyRecipes />}
        />


        {/* EDIT PROFILE */}

        <Route
          path="/edit-profile"
          element={<EditProfile />}
        />


        {/* CHANGE PASSWORD */}

        <Route
          path="/change-password"
          element={<ChangePassword />}
        />

      </Routes>
    </>
  );
}


function App() {

  return (
    <BrowserRouter>

      <AppContent />

    </BrowserRouter>
  );
}

export default App;