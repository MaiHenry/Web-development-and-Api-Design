import React, { useState, useEffect } from "react";

// Implementation of context file for Login
export const LoginContext = React.createContext({
  user: undefined,
  profileName: undefined,
  applicationConfig: undefined,
  loginMethod: undefined,
  customName: undefined,
  customBio: undefined,
  loadUser: () => {},
  unloadUser: () => {},
});

// Provider & states for information
export const LoginProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);
  const [profileName, setProfileName] = useState(undefined);
  const [loginMethod, setLoginMethod] = useState(undefined);
  const [customName, setCustomName] = useState(undefined);
  const [customBio, setCustomBio] = useState(undefined);

  // Configuration for different auth.
  const applicationConfig = {
    google: {
      client_id: process.env.GOOGLE_CLIENT_ID,
      openid_configuration: process.env.GOOGLE_OPENID_CONFIGURATION,
    },
    microsoft: {
      client_id: process.env.MICROSOFT_CLIENT_ID,
      openid_configuration: process.env.MICROSOFT_OPENID_CONFIGURATION,
    },
  };

  const loadUser = async () => {
    try {
      const userId = window.sessionStorage.getItem("userId");
      const username = window.sessionStorage.getItem("username");

      if (userId && username) {
        setUser({ direct: { _id: userId, username } });
        setProfileName(username);
      } else {
        const response = await fetch("/api/login");
        if (!response.ok) {
          throw new Error("Failed to fetch user " + response.statusText);
        }
        const userData = await response.json();

        let userEmail;
        if (userData.user.google) {
          userEmail = userData.user.google.email;
          setUser(userData.user.google); // Set user data for Google users
          setProfileName(userData.user.google.name);
          setLoginMethod("google");
        } else if (userData.user.microsoft) {
          userEmail = userData.user.microsoft.email;
          setUser(userData.user.microsoft); // Set user data for Microsoft users
          setProfileName(userData.user.microsoft.name);
          setLoginMethod("microsoft");
        }

        if (userEmail) {
          const dbResponse = await fetch(`/api/login/user/${userEmail}`);
          if (!dbResponse.ok) {
            throw new Error();
          }
          const dbUserData = await dbResponse.json();
          setCustomName(dbUserData.customName);
          setCustomBio(dbUserData.customBio);
        }
      }
    } catch (error) {
      console.error("Error loading user:", error);
    }
  };

  // Clear user data from sessionStorage and reset state
  const unloadUser = () => {
    setUser(undefined);
    setProfileName(undefined);
  };

  // useEffect to load user data
  useEffect(() => {
    loadUser();
  }, []);

  // Provider component
  return (
    <LoginContext.Provider
      value={{
        user,
        setUser,
        profileName,
        loginMethod,
        setProfileName,
        applicationConfig,
        loadUser,
        unloadUser,
        customBio,
        customName,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
