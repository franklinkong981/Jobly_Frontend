import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

import Alert from "../reusables/Alert.jsx";

function SignupForm({signUpFunc}) {
  const navigate = useNavigate();

  const [signUpFormData, setSignUpFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  });
  const [signUpFormErrors, setSignUpFormErrors] = useState([]);

  async function handleSubmit(evt) {
    evt.preventDefault();
    let signUpResult = await signUpFunc(signUpFormData);
    if (signUpResult.signUpSuccessful) {
      navigate("/");
    } else {
      setSignUpFormErrors(signUpResult.errors);
    }
  }

  function handleChange(evt) {
    const {name, value} = evt.target;
    setSignUpFormData(signUpFormData => ({...signUpFormData, [name]: value}));
  }

  return (
    <div className="SignupForm">
      <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <h2 className="mb-3">Create a Jobly Account to Get Started</h2>
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="SignUpForm-username-field">Username</label>
                <input
                    id="SignUpForm-username-field"
                    type="text"
                    name="username"
                    className="form-control"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
              </div>
              <div className="form-group">
                <label htmlFor="SignUpForm-password-field">Password</label>
                <input
                    id="SignUpForm-password-field"
                    type="password"
                    name="password"
                    className="form-control"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
              </div>

              <div className="form-group">
                <label htmlFor="SignUpForm-first-name-field">First name</label>
                <input
                    id="SignUpForm-first-name-field"
                    type="text"
                    name="firstName"
                    className="form-control"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                />
              </div>
              <div className="form-group">
                <label htmlFor="SignUpForm-last-name-field">Last name</label>
                <input
                    id="SignUpForm-last-name-field"
                    type="text"
                    name="lastName"
                    className="form-control"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                    id="SignUpForm-email-field"
                    type="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
              </div>

              {formErrors.length ? <Alert alertText={formErrors} /> : null}

              <button type="submit" className="btn btn-primary float-right" onSubmit={handleSubmit}>
                Create Account
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;