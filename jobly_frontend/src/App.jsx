import React, {useState, useEffect} from "react";
import {BrowserRouter} from "react-router-dom";

import { jwtDecode } from "jwt-decode";

import JoblyApi from "./api/api.js";

import JoblyNavbar from "./components/routes-navbar/JoblyNavbar.jsx";
import JoblyRoutes from "./components/routes-navbar/JoblyRoutes.jsx";

import useLocalStorage from "./hooks/useLocalStorage.jsx";

import CurrentUserContext from "./contexts/currentUserContext.jsx";

export const TOKEN_STORAGE_ID = "jobly-token";

function App() {
  const [userInfoLoaded, setUserInfoLoaded] = useState(false);
  const [userToken, setUserToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const [currentUserInfo, setCurrentUserInfo] = useState(null);

  const [appliedJobIds, setAppliedJobIds] = useState(new Set([]));

  useEffect(function getUserInfoUponTokenChange() {
    async function getCurrentUserInfo() {
      if (userToken) {
        try {
          JoblyApi.token = userToken;
          let currentUserPayload= jwtDecode(userToken);
          let currentUser = await JoblyApi.getCurrentLoggedInUser(currentUserPayload.username);
          setCurrentUserInfo(currentUser);
          setAppliedJobIds(new Set(currentUser.appliedJobs));
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
      console.log(signUpFormValues);
      let signUpToken = await JoblyApi.signUp(signUpFormValues);
      setUserToken(userToken => signUpToken);
      return {signUpSuccessful: true};
    } catch(errors) {
      console.error("User signup failed: ", errors);
      return {signUpSuccessful: false, errors};
    }
  };

  const loginUser = async (loginFormValues) => {
    try {
      console.log(loginFormValues);
      let loginToken = await JoblyApi.login(loginFormValues);
      setUserToken(userToken => loginToken);
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

  const hasUserAppliedToJob = (jobId) => {
    return appliedJobIds.has(jobId);
  };

  const applyToJob = async (jobId) => {
    if (hasUserAppliedToJob(jobId)) return;

    await JoblyApi.applyToJob(currentUserInfo.username, jobId);
    setAppliedJobIds(new Set([...appliedJobIds, jobId]));
  };

  if (!userInfoLoaded) return (
    <div className="App">
      <h1>Loading...</h1>
    </div>
  )

  return (
    <BrowserRouter>
      <CurrentUserContext.Provider value={{currentUserInfo, setCurrentUserInfo, hasUserAppliedToJob, applyToJob}}>
        <div className="App">
          <JoblyNavbar logOutFunc={logoutUser} />
          <JoblyRoutes signUpFunc={signUpNewUser} loginFunc={loginUser} />
        </div>
      </CurrentUserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
