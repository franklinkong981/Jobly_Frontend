import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

import Alert from "../reusables/Alert.jsx";

/** Signup form. Users can sign up by entering information such as their usernamd and email.
 * Top level component of the route /signup.
 * 
 * This component shows the form and manages the update to form fields as state changes.
 * 
 * Upon submission:
 * - Calls the JoblyApi which communicates with backend to create a new account for the user in the database.
 * - If failed, return errors as Alert components. 
 * - If successful, returns user token, and updates user information in frontend by loading logged in user info into the CurrentUserContext.
 * - Finally, redirects to logged in homepage.
 */
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

  /**
   * Handles form submission. Calls the loginFunc prop, which should contain
   * a call to the JoblyApi to create a new account for the user in the backend database.
   * If successful, redirect to logged in homepage.
   */
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
                <label htmlFor="SignUpForm-username-field">Choose a username</label>
                <input
                    id="SignUpForm-username-field"
                    type="text"
                    name="username"
                    className="form-control"
                    value={signUpFormData.username}
                    onChange={handleChange}
                    required
                />
              </div>
              <div className="form-group">
                <label htmlFor="SignUpForm-password-field">Choose a password</label>
                <input
                    id="SignUpForm-password-field"
                    type="password"
                    name="password"
                    className="form-control"
                    value={signUpFormData.password}
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
                    value={signUpFormData.firstName}
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
                    value={signUpFormData.lastName}
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
                    value={signUpFormData.email}
                    onChange={handleChange}
                    required
                />
              </div>

              {signUpFormErrors.length ? <Alert alertTexts={signUpFormErrors} /> : null}

              <button type="submit" className="btn btn-primary float-right" onSubmit={handleSubmit}>
                Create Account
              </button>
            </form>
            <p>Already have an account? <a href="/login">Log In Now!</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;