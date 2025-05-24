import React from "react";
import CurrentUserContext from "./currentUserContext.jsx";

const testUser = {
  username: "testuser",
  first_name: "Testy",
  last_name: "Usery",
  email: "testuser981@gmail.com"
};

const TestUserProvider = ({children, currentTestUser = testUser, hasUserAppliedToJob= () => false}) => (
  <CurrentUserContext.Provider value={{currentTestUser, hasUserAppliedToJob}}>
    {children}
  </CurrentUserContext.Provider>
);

export {TestUserProvider};