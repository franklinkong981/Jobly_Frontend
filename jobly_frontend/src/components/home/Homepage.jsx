import React, {useContext} from "react";

import {Button} from "reactstrap";

function Homepage() {
  const {currentUserInfo} = useContext(CountContext);

  return (
    <div className="Homepage">
      <h1>{currentUserInfo ? `Welcome back to Jobly, ${currentUserInfo.username}` : "Welcome to Jobly!"}</h1>
      <h2>Here you can find companies and job openings all in one convenient place.</h2>
      {currentUserInfo || (
        <div className="Homepage-buttons">
          <Link to={`/signup`} key={`homepage-signup-link`}>
            <Button color="primary">Log In</Button>
          </Link>
          <Link to={`/login`} key={`homepage-login-link`}>
            <Button color="secondary">Create An Account</Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Homepage;