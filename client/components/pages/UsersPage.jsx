import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function UserCard({ user, onInspect }) {
  let bioText = user.customBio || "";
  if (bioText.length > 80) {
    bioText = bioText.slice(0, 77) + "...";
  }
  return (
    <div className="users-card">
      <h3>{user.customName || user.name || "User"}</h3>
      <p>{bioText}</p>
      <div className="spacer"></div>
      <button onClick={() => onInspect(user._id)}>Inspect user</button>
    </div>
  );
}

export function UsersPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  function inspectUser(userId) {
    navigate(`/login/${userId}`);
  }

  useEffect(() => {
    fetch("/api/login/user")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading users...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>All Users</h2>
      <div className="line"></div>
      <div>
        {users.map((user) => (
          <UserCard key={user._id} user={user} onInspect={inspectUser} />
        ))}
      </div>
    </div>
  );
}
