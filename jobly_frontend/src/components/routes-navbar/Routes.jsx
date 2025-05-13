import React from "react";
import {Switch, Route, Navigate} from "react-router-dom";

import Homepage from "./components/home/Homepage.jsx";
import LoginForm from "./components/auth/LoginForm.jsx";
import SignupForm from "./components/auth/SignupForm.jsx";
import UpdateProfileForm from "./components/profile/UpdateProfileForm.jsx";
import CompanyList from "./components/companies/CompanyList.jsx";
import CompanyDetail from "./components/companies/CompanyDetail.jsx";
import JobList from "./components/jobs/JobList.jsx";

function Routes({signUpFunc, loginFunc}) {
  return (
    <div className="Routes pt-5">
      <Switch>
        <Route exact path="/login" element={<LoginForm loginFunc={loginFunc} />} />
        <Route path="/signup" element={<SignupForm signUpFunc={signUpFunc} />} />
        
        <Route path="/profile" element={<UpdateProfileForm />} />
        <Route path="/companies" element={<CompanyList />} />
        <Route path="/companies/:name" element={<CompanyDetail />} />
        <Route path="/jobs" element={<JobList />} />
        <Route exact path="/" element={<Homepage />} />
        <Route path="*" element={<Navigate to="/"/>}/>
      </Switch>
    </div>
  );
}

export default Routes;