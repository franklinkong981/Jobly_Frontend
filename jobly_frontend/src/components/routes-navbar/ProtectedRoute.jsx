import React,{useContext} from "react";
import {Route, Navigate} from "react-router-dom";
import currentUserContext from "../contexts-currentUserContext.jsx";

function ProtectedRoute({path, element}) {
  const {currentUserInfo} = useContext(currentUserContext);

  if (!currentUserInfo) {
    return <Navigate to="/login" />
  }

  return (
    <Route exact path={path} element={element} />
  );
}

export default ProtectedRoute;