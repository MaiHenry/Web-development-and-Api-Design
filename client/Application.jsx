import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { LoginProvider } from "./LoginContext";

// Import pages and components
import { ProfilePage } from "./components/pages/ProfilePage";

// Login Imports
import { LoginPage } from "./components/pages/LoginPage";
import { LoginCallback } from "./components/login/LoginCallback";
import { LoginFooter } from "./components/login/LoginFooter";
import { LoginNavLink } from "./components/login/LoginNavLink";

export function Application() {
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

  return (
    <LoginProvider>
      <BrowserRouter>
        <header>
          <h1>Chatroom</h1>
        </header>
        <nav>
          <div className="dividerNav" />
          <div className="dividerNav" />
          <LoginNavLink />
        </nav>
        <main>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route
              path="/login/callback"
              element={<LoginCallback applicationConfig={applicationConfig} />}
            />
            <Route path="*" element={<h2>Not Found</h2>} />
          </Routes>
        </main>
        <LoginFooter />
      </BrowserRouter>
    </LoginProvider>
  );
}