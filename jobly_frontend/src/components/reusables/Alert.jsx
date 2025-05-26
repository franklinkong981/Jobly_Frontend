import React from "react";
import {v4 as uuidv4} from "uuid";

/** Formats error messages returned by JoblyApi and/or backend to make it more readable. */
function formatError(error) {
  let formattedError;
  if (error.includes("instance.password")) {
    formattedError = error.replace("instance.password", "Password");
  } else if (error.includes("instance.email")) {
    formattedError = error.replace("instance.email", "Email address");
  } else if (error.includes("instance.username")) {
    formattedError = error.replace("instance.username", "username");
  } else {
    formattedError = error;
  }
  return formattedError;
}

/**
 * Presentational component (much like flash messages) for showing Bootstrap-style alerts on the page.
 * Will be used in the LoginForm, SignupForm, and UpdateProfileForm components.
 * Whenever there is an error with authentication, the error messages will be displayed in this alert style at the bottom of the form.
 * 
 * Default alert type will be danger, but can set alertType prop to "success" for a green positive alert message.
 */
function Alert({alertType = "danger", alertTexts = []}) {
  return (
    <div className={`alert alert-${alertType}`} role="alert">
      {alertTexts.map(error => (
        <p className="mb-0 small" key={uuidv4()}>
          {formatError(error)}
        </p>
      ))}
    </div>
  );
}

export default Alert;