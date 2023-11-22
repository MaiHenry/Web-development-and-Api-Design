import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../LoginContext";
import { putJSON } from "../apiRequests/putJSON";
import "../../Styles.css";

export function ProfilePage() {
  const navigate = useNavigate();
  const { user, profileName, unloadUser, customName, customBio, loadUser } =
    useContext(LoginContext);
  const [newCustomName, setNewCustomName] = useState(customName);
  const [newCustomBio, setNewCustomBio] = useState(customBio);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await putJSON(`/api/login/user/update/${user.email}`, {
        customName: newCustomName,
        customBio: newCustomBio,
      });
      loadUser();
      await putJSON(`/api/messages/${user.email}`, {
        newCustomName: newCustomName,
      });

      setNewCustomName(newCustomName);
      setNewCustomBio(newCustomBio);
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

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
        {user.picture === "https://graph.microsoft.com/v1.0/me/photo/$value" ||
        user.picture == null ? (
          <p>
            Welcome! <br></br>
          </p> // Placeholder in case of no picture
        ) : (
          <div className="profile-picture">
            <img src={user.picture} alt="Profile" />
          </div>
        )}
        <p>
          <strong>Name:</strong> {profileName}
        </p>
        <p>
          <strong>Address:</strong> {user.email}
        </p>
        <p>
          <strong>Custom Name:</strong> {customName || ""}
        </p>
        <p>
          <strong>Custom Bio:</strong> {customBio || ""}
        </p>
        <div className="spacer"></div>
        <h3>Update your custom name and bio!</h3>
        <form onSubmit={handleUpdate} className="profile-form">
          <div>
            <input
              type="text"
              value={newCustomName}
              onChange={(e) => setNewCustomName(e.target.value)}
              placeholder="Custom Name"
            />
          </div>
          <div>
            <textarea
              rows="5"
              value={newCustomBio}
              onChange={(e) => setNewCustomBio(e.target.value)}
              placeholder="Custom Bio"
            />
          </div>
          <button type="submit">Update Profile</button>
        </form>
      </div>

      <form onSubmit={handleSubmitLogout} className="logout-form">
        <button>Log out</button>
      </form>
    </div>
  );
}
