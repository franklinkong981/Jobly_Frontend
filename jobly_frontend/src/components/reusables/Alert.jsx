import React from "react";
import {v4 as uuidv4} from "uuid";

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