import React, { useEffect, useState } from "react";
import googleLogo from "../images/google_logo.png";
import microsoftLogo from "../images/microsoftlogin.png";
import { fetchJSON } from "../apiRequests/fetchJSON.jsx";
import "../../Styles.css";

export function LoginWithOpenIdButton() {
  const [googleAuthUrl, setGoogleAuthUrl] = useState("");
  const [microsoftAuthUrl, setMicrosoftAuthUrl] = useState("");

  // Load Google authorization URL with required parameters
  async function loadGoogleAuthorizationUrl() {
    const config = await fetchJSON("/auth/google/config");
    const params = {
      response_type: "token",
      scope: "email profile",
      client_id: config.client_id,
      redirect_uri: window.location.origin + "/login/callback",
      state: randomString(50),
    };

    setGoogleAuthUrl(
      `${config.authorization_endpoint}?${new URLSearchParams(params)}`
    );
  }

  // Load Microsoft authorization URL with required parameters
  async function loadMicrosoftAuthorizationUrl() {
    const config = await fetchJSON("/auth/microsoft/config");
    const redirect_uri = window.location.origin + "/login/callback";
    const code_verifier = randomString(50);
    window.sessionStorage.setItem("code_verifier", code_verifier);
    const code_challenge = await sha256(code_verifier);
    const state = randomString(50);

    const params = new URLSearchParams({
      response_mode: "fragment",
      response_type: "code",
      scope: "openid email profile",
      client_id: config.client_id,
      redirect_uri,
      code_challenge,
      code_challenge_method: "S256",
      state,
    });

    setMicrosoftAuthUrl(
      `${config.authorization_endpoint}?${params.toString()}`
    );
  }

  // Load authorization URLs when component mount
  useEffect(() => {
    loadGoogleAuthorizationUrl();
    loadMicrosoftAuthorizationUrl();
  }, []);

  return (
    <div>
      <div>
        <a href={googleAuthUrl}>
          <img
            className="googlelogo"
            src={googleLogo}
            alt="Google login"
            style={{ width: "200px" }}
          />
        </a>
      </div>
      <div>
        <a href={microsoftAuthUrl}>
          <img
            className="microsoftlogo"
            src={microsoftLogo}
            alt="Microsoft login"
            style={{ width: "200px" }}
          />
        </a>
      </div>
    </div>
  );
}

// Generate random string of length
function randomString(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// Calculate SHA-256 hash of a string
export async function sha256(string) {
  const binaryHash = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder("utf-8").encode(string)
  );
  return btoa(String.fromCharCode.apply(null, new Uint8Array(binaryHash)))
    .split("=")[0]
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}
