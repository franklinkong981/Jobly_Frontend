import React, {useState, useEffect} from "react";
import {BrowserRouter} from "react-router-dom";

import { jwtDecode } from "jwt-decode";

import JoblyApi from "./api/api.js";

import JoblyNavbar from "./components/routes-navbar/JoblyNavbar.jsx";
import JoblyRoutes from "./components/routes-navbar/JoblyRoutes.jsx";

import CurrentUserContext from "./contexts/currentUserContext.jsx";

function App() {
  const [userInfoLoaded, setUserInfoLoaded] = useState(false);
  const [userToken, setUserToken] = useState("");
  const [currentUserInfo, setCurrentUserInfo] = useState(null);

  useEffect(function getUserInfoUponTokenChange() {
    async function getCurrentUserInfo() {
      if (userToken) {
        try {
          JoblyApi.token = userToken;
          let currentUsername = jwtDecode(userToken);
          let currentUser = await JoblyApi.getCurrentLoggedInUser(currentUsername);
          setCurrentUserInfo(currentUser);
        } catch(err) {
          console.error("Problem encountered while fetching new current user information: ", err);
          setCurrentUserInfo(null);
        }
      }
      setUserInfoLoaded(true);
    }

    setUserInfoLoaded(false);
    getCurrentUserInfo();

  }, [userToken]);

  const signUpNewUser = async (signUpFormValues) => {
    try {
      let signUpToken = await JoblyApi.signUp(signupFormValues);
      setUserToken(signUpToken);
      return {signUpSuccessful: true};
    } catch(errors) {
      console.error("User signup failed: ", errors);
      return {signUpSuccessful: false, errors};
    }
  };

  const loginUser = async (loginFormValues) => {
    try {
      let loginToken = await JoblyApi.login(loginFormValues);
      setUserToken(loginToken);
      return {loginSuccessful: true};
    } catch(errors) {
      console.error("User login failed", errors);
      return {loginSuccessful: false, errors};
    }
  };

  const logoutUser = () => {
    setCurrentUserInfo(currentUserInfo => null);
    setUserToken(userToken => null);
  };

  if (!userInfoLoaded) return (
    <div className="App">
      <h1>Loading...</h1>
    </div>
  )

  return (
    <BrowserRouter>
      <CurrentUserContext.Provider value={{currentUserInfo, setCurrentUserInfo}}>
        <div className="App">
          <JoblyNavbar logOutFunc={logoutUser} />
          <JoblyRoutes signUpFunc={signUpNewUser} loginFunc={loginUser} />
        </div>
      </CurrentUserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
