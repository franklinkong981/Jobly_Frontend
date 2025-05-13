import React, {useState, useEffect} from "react";
import { jwtDecode } from "jwt-decode";
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";

import JoblyApi from "./api/api.js";

import JoblyNavbar from "./components/JoblyNavbar.jsx";
import Homepage from "./components/home/Homepage.jsx";
import LoginForm from "./components/auth/LoginForm.jsx";
import SignupForm from "./components/auth/SignupForm.jsx";
import UpdateProfileForm from "./components/profile/UpdateProfileForm.jsx";
import CompanyList from "./components/companies/CompanyList.jsx";
import CompanyDetail from "./components/companies/CompanyDetail.jsx";
import JobList from "./components/jobs/JobList.jsx";

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

  return (
    <div className="App">
      <BrowserRouter>
        <CurrentUserContext.Provider value={currentUserInfo}>
          <JoblyNavbar logOutFunc={logoutUser}/>
          <Routes>
            <Route path="/login" element={<LoginForm loginFunc={loginUser} />} />
            <Route path="/signup" element={<SignupForm signUpFunc={signUpNewUser} />} />
            
            <Route path="/profile" element={<UpdateProfileForm />} />
            <Route path="/companies" element={<CompanyList />} />
            <Route path="/companies/:name" element={<CompanyDetail />} />
            <Route path="/jobs" element={<JobList />} />
            <Route path="/" element={<Homepage />} />
          </Routes>
        </CurrentUserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
