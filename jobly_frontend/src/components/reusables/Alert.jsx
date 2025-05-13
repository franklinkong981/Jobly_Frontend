import React from "react";
import {v4 as uuidv4} from "uuid";

function Alert({alertType = "danger", alertTexts = []}) {
  return (
    <div className={`alert alert-${alertType}`} role="alert">
      {alertTexts.map(error => (
        <p className="mb-0 small" key={uuidv4()}>
          {error}
        </p>
      ))}
    </div>
  );
}

export default Alert;