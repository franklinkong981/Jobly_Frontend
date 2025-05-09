import React, {useState} from "react";
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
  const [userToken, setUserToken] = useState(null);
  const [currentUserInfo, setCurrentUserInfo] = useState(null);

  //runs whenever the token changes (aka signup, login, or logout) to either get information about the user who just signed up/logged in
  //by decoding the token they received or setting the current user to null.
  useEffect(function getUserInfoUponTokenChange() {
    if (userToken) {
      const decodedPayload = jwtDecode(userToken);
      setCurrentUserInfo(currentUserInfo => decodedPayload);
    } else if (currentUserInfo){
      setCurrentUserInfo(currentUserInfo => null);
    }
  }, [token]);

  const signUpNewUser = async (values) => {
    await JoblyApi.signUp(values);
    setUserToken(userToken => JoblyApi.token);
  }

  const loginUser = async (values) => {
    await JoblyApi.login(values);
    setUserToken(userToken => JoblyApi.token);
  }

  const logoutUser = async (values) => {
    await JoblyApi.logout();
    setUserToekn(userToken => JoblyApi.token);
  }

  return (
    <div className="App">
      <BrowserRouter>
        <CurrentUserContext.Provider value={currentUserInfo}>
          <JoblyNavbar/>
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
