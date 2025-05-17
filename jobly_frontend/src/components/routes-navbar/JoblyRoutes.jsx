import React from "react";
import {Routes, Route, Navigate} from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute.jsx";

import Homepage from "../home/Homepage.jsx";
import LoginForm from "../auth/LoginForm.jsx";
import SignupForm from "../auth/SignupForm.jsx";
import UpdateProfileForm from "../profile/UpdateProfileForm.jsx";
import CompanyList from "../companies/CompanyList.jsx";
import CompanyDetail from "../companies/CompanyDetail.jsx";
import JobList from "../jobs/JobList.jsx";

function JoblyRoutes({signUpFunc, loginFunc}) {
  return (
    <div className="Routes pt-5">
      <Routes>
        <Route exact path="/login" element={<LoginForm loginFunc={loginFunc} />} />
        <Route path="/signup" element={<SignupForm signUpFunc={signUpFunc} />} />
        
        <ProtectedRoute path="/profile" element={<UpdateProfileForm />} />
        <ProtectedRoute path="/companies" element={<CompanyList />} />
        <ProtectedRoute path="/companies/:name" element={<CompanyDetail />} />
        <ProtectedRoute path="/jobs" element={<JobList />} />
        <Route exact path="/" element={<Homepage />} />
        <Route path="*" element={<Navigate to="/"/>}/>
      </Routes>
    </div>
  );
}

export default JoblyRoutes;