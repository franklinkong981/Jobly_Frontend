import React, {useContext} from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";

import CurrentUserContext from "../../contexts/currentUserContext.jsx";

function JoblyNavbar({logOutFunc}) {
  const {currentUserInfo} = useContext(CurrentUserContext);

  return (
    <div>
      <Navbar expand="md">
        <NavLink exact to="/" className="navbar-brand">
          Jobly
        </NavLink>

        {Object.keys(currentUserInfo).length > 0 ? (
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink to="/companies">Companies</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/jobs">Jobs</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/profile">Update Profile</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/">Log Out</NavLink>
            </NavItem>
          </Nav>
        ) : (
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink to="/login">Log In</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/signup">Sign Up</NavLink>
            </NavItem>
          </Nav>
        )}
      </Navbar>
    </div>
  );
}

export default JoblyNavbar;