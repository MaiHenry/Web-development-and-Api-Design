import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../LoginContext";
import '../../Styles.css';  

export function ProfilePage() {
  const navigate = useNavigate();
  const { user, profileName, unloadUser } = useContext(LoginContext);

  async function handleSubmitLogout(e) {
    e.preventDefault();
    const res = await fetch("/api/login", {
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error("Failed to log out " + res.statusText);
    }
    unloadUser();
    navigate("/");
  }

  if (!user) {
    return <p>Loading...</p>; // handle for not logged in state
  }

  return (
    <div className="profile-container">
      <h2>Profile Page</h2>
      <div className="profile-info">
        {user.picture === "https://graph.microsoft.com/v1.0/me/photo/$value" || user.picture == null ? (
          <p>Welcome! <br></br></p> // Placeholder in case of no picture
        ) : (
          <div className="profile-picture">
            <img src={user.picture} alt="Profile" />
          </div>
        )}
        <p><strong>Name:</strong> {profileName}</p>
        <p><strong>Address:</strong> {user.email}</p>
      </div>
  
      <form onSubmit={handleSubmitLogout} className="logout-form">
        <button>Log out</button>
      </form>
    </div>
  );
  
}
