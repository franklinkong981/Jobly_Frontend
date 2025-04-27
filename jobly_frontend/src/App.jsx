import React from "react";
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";

import Navbar from "components/Navbar.jsx";
import Homepage from "components/Homepage.jsx";
import LoginForm from "components/LoginForm.jsx";
import SignupForm from "components/SignupForm.jsx";
import UpdateProfileForm from "components/UpdateProfileForm.jsx";
import CompanyList from "components/CompanyList.jsx";
import CompanyDetail from "components/CompanyDetail.jsx";
import JobList from "components/JobList.jsx";

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
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
