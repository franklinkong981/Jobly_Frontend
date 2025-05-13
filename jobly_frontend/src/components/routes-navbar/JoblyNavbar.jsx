import React, {useContext} from "react";
import { Link, NavLink } from "react-router-dom";

import CurrentUserContext from "../../contexts/currentUserContext.jsx";

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