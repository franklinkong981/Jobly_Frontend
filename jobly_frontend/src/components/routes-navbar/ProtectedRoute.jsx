import React, {useContext} from "react";
import {Route, Navigate} from "react-router-dom";
import CurrentUserContext from "../../contexts/currentUserContext.jsx";

function ProtectedRoute({children}) {
  const {currentUserInfo} = useContext(CurrentUserContext);

  if (!currentUserInfo) {
    return <Navigate to="/login" />
  }

  return (
    <div>
      {children}
    </div>
  );
}

export default ProtectedRoute;