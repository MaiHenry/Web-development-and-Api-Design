import React, { useState, useEffect } from "react";

function UserCard({ user }) {
    let bioText = user.customBio || "";
    if(bioText.length > 25){
        bioText = bioText.slice(0, 22) + "...";
    }
    return (
      <div className="users-card">
      <h3>{user.customName || user.name }</h3>
      <p>{bioText}</p>
      <div className="spacer"></div>
      <button>Inspect user</button>
      </div>
    );
  }  

  export function UsersPage() {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      fetch("/api/login/user") 
        .then(response => {
          if (!response.ok) {
            throw new Error("Failed to fetch users");
          }
          return response.json();
        })
        .then(data => {
          setUsers(data);
          setIsLoading(false);
        })
        .catch(error => {
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
        <div>
          {users.map(user => (
            <UserCard key={user._id} user={user} />
          ))}
        </div>
      </div>
    );
  }
  