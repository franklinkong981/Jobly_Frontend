import React, {useContext} from "react";
import {Route, Navigate} from "react-router-dom";
import currentUserContext from "../../contexts/currentUserContext.jsx";

function ProtectedRoute({children}) {
  const {currentUserInfo} = useContext(currentUserContext);

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