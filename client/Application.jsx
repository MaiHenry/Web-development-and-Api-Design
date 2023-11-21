import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { LoginProvider } from "./LoginContext";

// Import pages and components
import { ProfilePage } from "./components/pages/ProfilePage";
import { ProtectedRoutes } from "./components/routing/ProtectedRoutes";

// Login Imports
import { LoginPage } from "./components/pages/LoginPage";
import { LoginCallback } from "./components/login/LoginCallback";
import { LoginFooter } from "./components/login/LoginFooter";
import { LoginNavLink } from "./components/login/LoginNavLink";
import { ChatRoomPage } from "./components/pages/ChatRoomPage";
import { CreateRoomPage } from "./components/pages/CreateRoomPage";
import { EditChatRoomPage } from "./components/pages/EditChatRoomPage";

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
          <LoginNavLink />
        </nav>
        <main>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/login/callback" element={<LoginCallback applicationConfig={applicationConfig} />}/>
            <Route path="/profile" element={<ProtectedRoutes><ProfilePage /> </ ProtectedRoutes>} />
            <Route path="/chatroom" element={<ProtectedRoutes><ChatRoomPage /> </ ProtectedRoutes>} />
            <Route path="/create" element={<ProtectedRoutes><CreateRoomPage /> </ ProtectedRoutes>} />
            <Route path="/edit/:chatRoomId" element={<ProtectedRoutes><EditChatRoomPage /> </ ProtectedRoutes>} />
            <Route path="*" element={<h2>Not Found</h2>} />
          </Routes>
        </main>
        <LoginFooter />
      </BrowserRouter>
    </LoginProvider>
  );
}
