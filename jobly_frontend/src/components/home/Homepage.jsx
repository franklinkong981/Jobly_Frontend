import React, {useContext} from "react";
import {Link} from "react-router-dom";

import CurrentUserContext from "../../contexts/currentUserContext.jsx";

function Homepage() {
  const {currentUserInfo} = useContext(CurrentUserContext);

  return (
    <div className="Homepage">
      <div className="container text-center">
        <h1 className="Homepage-title mb-4 font-weight-bold">Welcome to Jobly!</h1>
        <p className="Homepage-subtitle lead">Find all companies and job openings here in one convenient place.</p>
        {currentUserInfo ? (
          <h3 className="Homepage-welcome">
            Welcome back {currentUserInfo.username}
          </h3>
        ) : (
          <div className="Homepage-buttons">
            <Link className="Homepage-login-link btn btn-secondary font-weight-bold mr-3" to="/login">
              Log In
            </Link>
            <Link className="Homepage-signup-link btn btn-info font-weight-bold" to="/signup">
              Create Account
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Homepage;