/** Logout button displayed on the Jobly Navbar.
 * Logs a user out by deleting current information about the logged in user and their token, then redirecting to the homepage. */

import React from "react";
import { useNavigate } from 'react-router-dom';
import { NavItem } from "reactstrap";

function LogOutButton({logOutFunc}) {
  const navigate = useNavigate();

  const handleClick = async () => {
    await logOutFunc(); 
    navigate('/'); 
  };

  return (
    <NavItem>
      <button onClick={handleClick}>Log Out</button>
    </NavItem>
  )
}

export default LogOutButton;