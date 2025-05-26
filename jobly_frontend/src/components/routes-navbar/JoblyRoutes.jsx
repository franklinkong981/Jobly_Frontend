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

/**
 * The component for site-wide routes rendered by the App component.
 * 
 * Parts of the site should only be visitable when logged in. Those routes
 * are wrapped by <ProtectedRoute>, which is an authorization component.
 * 
 * Visitng a non-existent route redirects to the homepage.
 */
function JoblyRoutes({signUpFunc, loginFunc}) {
  return (
    <div className="Routes pt-5">
      <Routes>
        <Route exact path="/login" element={<LoginForm loginFunc={loginFunc} />} />
        <Route path="/signup" element={<SignupForm signUpFunc={signUpFunc} />} />
        
        <Route path="/profile" element={<ProtectedRoute> 
          <UpdateProfileForm /> 
        </ProtectedRoute>} />

        <Route path="/companies" element={<ProtectedRoute> 
          <CompanyList /> 
        </ProtectedRoute>} />

        <Route path="/companies/:name" element={<ProtectedRoute> 
          <CompanyDetail /> 
        </ProtectedRoute>} />

        <Route path="/jobs" element={<ProtectedRoute> 
          <JobList /> 
        </ProtectedRoute>} />

        <Route exact path="/" element={<Homepage />} />
        <Route path="*" element={<Navigate to="/"/>}/>
      </Routes>
    </div>
  );
}

export default JoblyRoutes;