import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

import Alert from "../reusables/Alert.jsx";

/** Login form. Users can log in by entering their username and password.
 * Top level component of the route /login.
 * 
 * This component shows the form and manages the update to form fields as state changes.
 * 
 * Upon submission:
 * - Calls the JoblyApi which communicates with backend to authenticate the user.
 * - If failed, return errors as Alert components. 
 * - If successful, returns user token, and updates user information in frontend.
 * - Finally, redirects to logged in homepage.
 */
function LoginForm({loginFunc}) {
  const navigate = useNavigate();

  const [loginFormData, setLoginFormData] = useState({
      username: "",
      password: ""
    });
  const [loginFormErrors, setLoginFormErrors] = useState([]);

  /**
   * Handles form submission. Calls the loginFunc prop, which should contain
   * a call to the JoblyApi to authenticate the user via the backend.
   * If successful, redirect to logged in homepage.
   */
  async function handleSubmit(evt) {
    evt.preventDefault();
    let loginResult = await loginFunc(loginFormData);
    if (loginResult.loginSuccessful) {
      navigate("/");
    } else {
      setLoginFormErrors(loginResult.errors);
    }
  }

  function handleChange(evt) {
    const {name, value} = evt.target;
    setLoginFormData(loginFormData => ({...loginFormData, [name]: value}));
  }
  
  return (
    <div className="LoginForm">
      <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <h2 className="mb-3">Log In to Jobly</h2>

        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="LoginForm-username-field">Username</label>
                <input
                    id="LoginForm-username-field"
                    type="text"
                    name="username"
                    className="form-control"
                    value={loginFormData.username}
                    onChange={handleChange}
                    required
                />
              </div>
              <div className="form-group">
                <label htmlFor="LoginForm-password-field">Password</label>
                <input
                    id="LoginForm-password-field"
                    type="password"
                    name="password"
                    className="form-control"
                    value={loginFormData.password}
                    onChange={handleChange}
                    required
                />
              </div>

              {loginFormErrors.length ? <Alert alertTexts={loginFormErrors} /> : null}

              <button type="submit" className="btn btn-primary float-right" onSubmit={handleSubmit}>
                Log In
              </button>
            </form>
            <p>Don't have an account? <a href="/signup">Create one now!</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;