import React, { useState, useEffect } from "react";

// Implementation of context file for Login
export const LoginContext = React.createContext({
  user: undefined,
  profileName: undefined,
  applicationConfig: undefined,
  clientId: undefined,
  loadUser: () => {},
  unloadUser: () => {},
});

// Provider & states for information
export const LoginProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);
  const [profileName, setProfileName] = useState(undefined);
  const [clientId, setclientId] = useState(undefined);

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
      // Retrieve user data from sessionStorage (for users logging in directly)
      const userId = window.sessionStorage.getItem("userId");
      const username = window.sessionStorage.getItem("username");

      if (userId && username) {
        setUser({ direct: { _id: userId, username } });
        setProfileName(username);
        setclientId(userId);
      } else {
        // If user data is not in SS, fetch from API
        const response = await fetch("/api/login");
        if (!response.ok) {
          throw new Error("Failed to fetch user " + response.statusText);
        }
        const userData = await response.json();

        if (userData.user.google) {
          setUser(userData.user.google); // Google users
          setProfileName(userData.user.google.name);
        } else if (userData.user.microsoft) {
          // Micrsoft users
          setUser(userData.user.microsoft);
          setProfileName(userData.user.microsoft.name);
        } else if (userData.user.direct) {
          // Direct users
          setUser(userData.user.direct);
          setProfileName(userData.user.direct.username);
        }
      }
    } catch (error) {
      console.error("Error loading user:", error);
    }
  };

  // Clear user data from sessionStorage and reset state
  const unloadUser = () => {
    window.sessionStorage.removeItem("userId");
    window.sessionStorage.removeItem("username");
    setUser(undefined);
    setProfileName(undefined);
    setclientId(undefined);
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
        setProfileName,
        clientId,
        setclientId,
        applicationConfig,
        loadUser,
        unloadUser,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
