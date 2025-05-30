import React, {useState, useContext} from "react";
import {useNavigate} from "react-router-dom";

import JoblyApi from "../../api/api.js";

import Alert from "../reusables/Alert.jsx";

import CurrentUserContext from "../../contexts/currentUserContext.jsx";

/**
 * Profile editing form that logged in user can fill out to update their profile information.
 * Top-level component of /profile route.
 * 
 * Handles changes to local form state on the frontend. Submitting form calls JoblyApi to save
 * updated user information on the backend and also the frontend through currentUserInfo in CurrentUserContext,
 * which triggers reloading throughout the site to updated user information.
 * 
 * Alert messages will be displayed if user inputs don't match expected criteria, confirmation of a successful save is a simple Alert component.
 * Uses the Alert component.
 */
function UpdateProfileForm() {
  const {currentUserInfo, setCurrentUserInfo} = useContext(CurrentUserContext);

  const [profileFormData, setProfileFormData] = useState({
    username: currentUserInfo.username,
    firstName: currentUserInfo.firstName,
    lastName: currentUserInfo.lastName,
    email: currentUserInfo.email
  });
  const [profileFormErrors, setProfileFormErrors] = useState([]);

  const [updateProfileSuccessful, setUpdateProfileSuccessful] = useState(false);

  function handleChange(evt) {
    const {name, value} = evt.target;
    setProfileFormData(profileFormData => ({
      ...profileFormData,
      [name]: value
    }));
  }

  /**
   * On form submission,
   * - First attempt to update user information on backend and report an errors.
   * - Upon successful update, clears any error messages on form, shows save-confirmed message.
   * - Finally, updates current user info on frontend through CurrentUserContext and reloads current user info throughout the site.
   */
  async function handleSubmit(evt) {
    evt.preventDefault();

    let updateProfileFormValues = {
      firstName: profileFormData.firstName,
      lastName: profileFormData.lastName,
      email: profileFormData.email
    };

    let username = profileFormData.username;
    let updatedUserInfo;

    try {
      updatedUserInfo = await JoblyApi.updateUserProfile(username, updateProfileFormValues);
    } catch(errors) {
      setProfileFormErrors(errors);
      return;
    }

    setProfileFormData(formData => ({...formData, password: ""}));
    setProfileFormErrors([]);
    setUpdateProfileSuccessful(true);

    // triggers current user info throughout the site.
    setCurrentUserInfo(updatedUserInfo);
  }

  return (
    <div className="UpdateProfileForm col-md-6 col-lg-4 offset-md-3 offset-lg-4">
      <h2 className="UpdateProfileForm-title">Edit Profile Information.</h2>
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="UpdateProfileForm-username-field">Username:</label>
              <p id="UpdateProfileForm-username-field" className="form-control-plaintext">{profileFormData.username}</p>
            </div>
            <div className="form-group">
              <label htmlFor="UpdateProfileForm-first-name-field">First Name:</label>
              <input id="UpdatProfileForm-first-name-field"
                className="form-control"
                type="text"
                name="firstName"
                value={profileFormData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="UpdateProfileForm-last-name-field">Last Name:</label>
              <input id="UpdateProfileForm-last-name-field"
                className="form-control"
                type="text"
                name="lastName"
                value={profileFormData.lastName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="UpdateProfileForm-email-field">Email:</label>
              <input id="UpdateProfileForm-email-field"
                className="form-control"
                type="email"
                name="email"
                value={profileFormData.email}
                onChange={handleChange}
              />
            </div>

            {profileFormErrors.length ? <Alert alertTexts={profileFormErrors} /> : null}

            {updateProfileSuccessful ? <Alert alertType="success" alertTexts={["Profile updated successfully!"]} /> : null}

            <button 
              className="UpdateProfileForm-button btn btn-primary btn-block mt-4" 
              onClick={handleSubmit}
            >Save Updated Info</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateProfileForm;