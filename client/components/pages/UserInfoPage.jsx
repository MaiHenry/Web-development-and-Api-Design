import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export function UserInfoPage() {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/login/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }
        return response.json();
      })
      .then((data) => {
        setUser(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return <div>Loading user...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const { provider, name, email, customName, customBio } = user;

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      <div className="profile-info">
        <h3>
          <strong>Name:</strong> {name}
        </h3>
        <div className="divider"></div>
        <p>
          <strong>Email:</strong> {email}
        </p>
        <p>
          <strong>Account type:</strong> {provider}
        </p>
        <p>
          <strong>Custom Name:</strong> {customName || "None"}
        </p>
        <p>
          <strong>Custom Bio:</strong> {customBio || "None"}
        </p>
      </div>

      <button onClick={() => navigate("/people")}>Back</button>
    </div>
  );
}
