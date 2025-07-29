import React, { useEffect, useState } from "react";
import axios from "axios";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // ✅ Get admin token (make sure you set it during admin login)
        const token = localStorage.getItem("auth-token");
        if (!token) {
          setError("No admin token found. Please log in as admin.");
          setLoading(false);
          return;
        }

        const res = await axios.get("http://localhost:3001/api/users", {
          headers: {
Authorization: `Bearer ${localStorage.getItem("auth-token")}`
          },
        });

        setUsers(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);

        if (err.response?.status === 403) {
          setError("Access Denied: You are not an admin.");
        } else if (err.response?.status === 401) {
          setError("Unauthorized: Please log in as admin.");
        } else {
          setError("Failed to fetch users.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p className="text-center mt-6">Loading users...</p>;
  if (error) return <p className="text-center text-red-500 mt-6">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">User List</h2>
      <table className="min-w-full bg-white border">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-3 border">Name</th>
            <th className="p-3 border">Email</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user._id} className="border-b">
                <td className="p-3 border">{user.name}</td>
                <td className="p-3 border">{user.email}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className="text-center p-4">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
