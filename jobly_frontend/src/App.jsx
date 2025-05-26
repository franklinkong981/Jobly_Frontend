/** The top-level component of the Jobly app.
*/

import React, {useState, useEffect} from "react";
// import {BrowserRouter} from "react-router-dom";

import { jwtDecode } from "jwt-decode";

import JoblyApi from "./api/api.js";

import JoblyNavbar from "./components/routes-navbar/JoblyNavbar.jsx";
import JoblyRoutes from "./components/routes-navbar/JoblyRoutes.jsx";

import useLocalStorage from "./hooks/useLocalStorage.jsx";

import CurrentUserContext from "./contexts/currentUserContext.jsx";

export const TOKEN_STORAGE_ID = "jobly-token";

/** 
 * userInfoLoaded: Has currently logged in user's data been returned from API? If not, display loading text on screen.
 * currentUserInfo: Object containing user information from API, this is used to determine if someone is logged in.
 * token: JWT for logged in users, most API calls will require this in the headers. 
 * token is initially read from localStorage when the page is first loaded/refreshed, if not there it will be set to null.
 * 
 * App contains the Routes component.
*/
function App() {
  const [userInfoLoaded, setUserInfoLoaded] = useState(false);
  const [userToken, setUserToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const [currentUserInfo, setCurrentUserInfo] = useState(null);

  //list of job ids that current logged-in user has applied to.
  const [appliedJobIds, setAppliedJobIds] = useState(new Set([]));

  useEffect(function getUserInfoUponTokenChange() {
    //Load user information from the JoblyApi. Only depends on userToken,
    //since this only needs to run when user logs in or logs out.
    async function getCurrentUserInfo() {
      if (userToken) {
        try {
          //put token in JoblyApi class so we can use it to make API calls to the backend.
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

  /**
   * Handles account signup. 
   * signUpFormValues = object containing values from SignUpForm submission.
   */
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

  /**
   * Handles account login.
   * loginFormValues = object containing values from LoginForm submission.
   */
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

  /**
   * Handles user logout. Sets currently logged in user info and userToken
   * to null since there is now no user is logged in.
   */
  const logoutUser = () => {
    setCurrentUserInfo(currentUserInfo => null);
    setUserToken(userToken => null);
  };

  /**
   * Checks whether a job with a specific jobId has been applied for by the current logged in user.
   */
  const hasUserAppliedToJob = (jobId) => {
    return appliedJobIds.has(jobId);
  };

  /**
   * Has the currently logged in user apply to the job with the specific jobId.
   * Updates this application information in the backend and updates the list of applied jobIds in the frontend as well.
   */
  const applyToJob = async (jobId) => {
    if (hasUserAppliedToJob(jobId)) return;

    await JoblyApi.applyToJob(currentUserInfo.username, jobId);
    setAppliedJobIds(new Set([...appliedJobIds, jobId]));
  };

  //When the page is first loaded, "Loading" will be displayed while the currently logged in user (if applicable)'s information is being fetched.
  if (!userInfoLoaded) return (
    <div className="App">
      <h1>Loading...</h1>
    </div>
  )

  return (
    <CurrentUserContext.Provider value={{currentUserInfo, setCurrentUserInfo, hasUserAppliedToJob, applyToJob}}>
      <div className="App">
        <JoblyNavbar logOutFunc={logoutUser} />
        <JoblyRoutes signUpFunc={signUpNewUser} loginFunc={loginUser} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
