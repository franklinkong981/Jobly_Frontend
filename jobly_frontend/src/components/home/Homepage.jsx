import React, {useContext} from "react";
import {Link} from "react-router-dom";

import CurrentUserContext from "../../contexts/currentUserContext.jsx";

function Homepage() {
  const {currentUserInfo} = useContext(CurrentUserContext);

  return (
    <div className="Homepage">
      {currentUserInfo ? (
        <div className="Homepage-logged-in container text-center">
          <h1 className="Homepage-logged-in-title mb-4 font-weight-bold">Welcome back {currentUserInfo.firstName}!</h1>
          <p className="Homepage-logged-in-subtitle lead">See companies and job openings below.</p>
          <div className="Homepage-logged-in-links">
            <Link className="Homepage-logged-in-companies-link btn btn-secondary font-weight-bold mr-3" to="/companies">
              See All Companies
            </Link>
            <Link className="Homepage-logged-in-jobs-link btn btn-info font-weight-bold" to="/jobs">
              See Job Openings
            </Link>
          </div>
        </div>
      ) : (
        <div className="Homepage-logged-out container text-center">
          <h1 className="Homepage-logged-out-title mb-4 font-weight-bold">Welcome to Jobly!</h1>
          <p className="Homepage-logged-out-subtitle lead">Find all companies and job openings here in one convenient place.</p>
          <div className="Homepage-logged-out-links">
            <Link className="Homepage-logged-out-login-link btn btn-secondary font-weight-bold mr-3" to="/login">
              Log In
            </Link>
            <Link className="Homepage-logged-out-signup-link btn btn-info font-weight-bold" to="/signup">
              Create Account
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Homepage;