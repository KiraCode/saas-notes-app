import React, { useEffect, useState } from "react";
import { getUsers } from "../api/user.js";
import { useAuth } from "../context/authContext.jsx";

const Dashboard = () => {
  const { user } = useAuth();

  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUsers(user.userId, setUsers);
  }, [user.userId]);
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Users for Tenant</h2>
      <ul className="space-y-2">
        {users.map((user) => (
          <li key={user._id} className="p-2 border rounded-md">
            {user.username} ({user.role})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
