import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";

function Navbar() {
  return (
    <div>
      <Navbar expand="md">
        <NavLink exact to="/" className="navbar-brand">
          Jobly
        </NavLink>

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
            <NavLink to="/login">Log In</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/signup">Sign Up</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  );
}

export default Navbar;