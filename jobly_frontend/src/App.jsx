import React from "react";
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";

import JoblyNavbar from "./components/JoblyNavbar.jsx";
import Homepage from "./components/home/Homepage.jsx";
import LoginForm from "./components/auth/LoginForm.jsx";
import SignupForm from "./components/auth/SignupForm.jsx";
import UpdateProfileForm from "./components/profile/UpdateProfileForm.jsx";
import CompanyList from "./components/companies/CompanyList.jsx";
import CompanyDetail from "./components/companies/CompanyDetail.jsx";
import JobList from "./components/jobs/JobList.jsx";

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <JoblyNavbar/>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/profile" element={<UpdateProfileForm />} />
          <Route path="/companies" element={<CompanyList />} />
          <Route path="/companies/:name" element={<CompanyDetail />} />
          <Route path="/jobs" element={<JobList />} />
          <Route path="/" element={<Homepage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
