import React, {useContext} from "react";
import { Link, NavLink } from "react-router-dom";

import CurrentUserContext from "../../contexts/currentUserContext.jsx";

import "./JoblyNavbar.css";

/**
 * Navigation bar for the site, and shows up on every page.
 * Rendered by the top-level App component.
 * 
 * When user is logged in, shows links to companies, jobs, update user profile,
 * and log out link which runs the logOutFunc function prop to log the user out upon being clicked.
 * 
 * When logged out, will show links to the sign up and login forms.
 * 
 * Both logged in and logged out navbars will have the Jobly logo displayed on the left which redirects to the homepage.
 */
function JoblyNavbar({logOutFunc}) {
  const {currentUserInfo} = useContext(CurrentUserContext);

  function loggedInNavbar() {
    return (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item mr-4">
          <NavLink className="nav-link" to="/companies">
            All Companies
          </NavLink>
        </li>
        <li className="nav-item mr-4">
          <NavLink className="nav-link" to="/jobs">
            All Jobs
          </NavLink>
        </li>
        <li className="nav-item mr-4">
          <NavLink className="nav-link" to="/profile">
            Update Profile
          </NavLink>
        </li>
        <li className="nav-item">
          <Link className="nav-link logout-link" to="/" onClick={logOutFunc}>
            Log out {currentUserInfo.username}
          </Link>
        </li>
      </ul>
    );
  }

  function loggedOutNavbar() {
    return (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item mr-4">
          <NavLink className="nav-link" to="/login">
            Log In
          </NavLink>
        </li>
        <li className="nav-item mr-4">
          <NavLink className="nav-link" to="/signup">
            Sign Up
          </NavLink>
        </li>
      </ul>
    );
  }

  return (
    <nav className="JoblyNavbar navbar navbar-expand-md">
      <Link className="navbar-brand" to="/">
        Jobly
      </Link>
      {currentUserInfo ? loggedInNavbar() : loggedOutNavbar()}
    </nav>
  );
}

export default JoblyNavbar;