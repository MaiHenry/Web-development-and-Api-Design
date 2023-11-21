import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../LoginContext";
import { fetchJSON } from "../apiRequests/fetchJSON";

export function LoginCallback() {
  const { loadUser } = useContext(LoginContext);
  const { applicationConfig } = useContext(LoginContext);
  const [error, setError] = useState(null);
  const [errorDescription, setErrorDescription] = useState(null);
  const navigate = useNavigate();

  async function handleCallback() {
    const hash = Object.fromEntries(
      new URLSearchParams(window.location.hash.substring(1))
    );

    let { access_token, error, error_description, state, code } = hash;
    const isMicrosoftLogin = state && code; // Check if auth is microsoft.

    if (isMicrosoftLogin) {
      setError(error);
      setErrorDescription(error_description);

      if (code) {
        const microsoftConfig = applicationConfig.microsoft;
        const { token_endpoint } = await fetchJSON(
          microsoftConfig.openid_configuration
        );
        const code_verifier = window.sessionStorage.getItem("code_verifier");
        const redirect_uri = `${window.location.origin}/login/callback`;

        const res = await fetch(token_endpoint, {
          method: "POST",
          body: new URLSearchParams({
            grant_type: "authorization_code",
            code,
            client_id: microsoftConfig.client_id,
            code_verifier,
            redirect_uri,
          }),
        });
        const json = await res.json();
        access_token = json.access_token;
        console.log("Received access_token:", access_token); // Log the recieved token
      }
    }

    // Common logic for both Google and Microsoft
    if (access_token) {
      const loginUrl = `/api/login/${
        isMicrosoftLogin ? "microsoft" : "google"
      }`;

      const response = await fetch(loginUrl, {
        method: "POST",
        body: JSON.stringify({ access_token }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Login failed " + response.statusText);
      }
      await loadUser();
      navigate("/");
    }
  }

  // Trigger login callback when component mounts
  useEffect(() => {
    handleCallback();
  }, []);

  if (error) {
    return (
      <>
        <h1>Error</h1>
        <div>{error}</div>
        {errorDescription && <p>{errorDescription}</p>}
      </>
    );
  } else {
    return <h2>Please wait ...</h2>;
  }
}
