// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const UserList = () => {
//   const [users, setUsers] = useState([]);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(true);

//   // For editing
//   const [editingUserId, setEditingUserId] = useState(null);
//   const [editForm, setEditForm] = useState({ name: "", email: "" });

//   // For search & sort
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortBy, setSortBy] = useState("");

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const token = localStorage.getItem("admin-token");
//       if (!token) {
//         setError("No admin token found. Please log in as admin.");
//         setLoading(false);
//         return;
//       }

//       const res = await axios.get("http://localhost:3001/api/users", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       setUsers(res.data);
//     } catch (err) {
//       console.error("Error fetching users:", err);
//       if (err.response?.status === 403) {
//         setError("Access Denied: You are not an admin.");
//       } else if (err.response?.status === 401) {
//         setError("Unauthorized: Please log in as admin.");
//       } else {
//         setError("Failed to fetch users.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Delete user
//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this user?")) return;

//     try {
//       await axios.delete(`http://localhost:3001/api/users/${id}`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("admin-token")}`,
//         },
//       });
//       setUsers(users.filter((user) => user._id !== id));
//     } catch (err) {
//       console.error("Error deleting user:", err);
//       alert("Failed to delete user.");
//     }
//   };

//   // Edit user
//   const handleEdit = (user) => {
//     setEditingUserId(user._id);
//     setEditForm({ name: user.name, email: user.email });
//   };

//   // Update user
//   const handleUpdate = async (id) => {
//     try {
//       const res = await axios.put(
//         `http://localhost:3001/api/users/${id}`,
//         editForm,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("admin-token")}`,
//           },
//         }
//       );

//       setUsers(users.map((u) => (u._id === id ? res.data : u)));
//       setEditingUserId(null);
//     } catch (err) {
//       console.error("Error updating user:", err);
//       alert("Failed to update user.");
//     }
//   };

//   if (loading) return <p className="text-center mt-6">Loading users...</p>;
//   if (error) return <p className="text-center text-red-500 mt-6">{error}</p>;

//   // Filter by search term
//   const filteredUsers = users.filter((user) => {
//     const name = user.name?.toLowerCase() || "";
//     const email = user.email?.toLowerCase() || "";
//     const search = searchTerm.toLowerCase();
//     return name.includes(search) || email.includes(search);
//   });

//   // Sort users
//   const sortedUsers = [...filteredUsers].sort((a, b) => {
//     switch (sortBy) {
//       case "nameAsc":
//         return a.name.localeCompare(b.name);
//       case "nameDesc":
//         return b.name.localeCompare(a.name);
//       case "emailAsc":
//         return a.email.localeCompare(b.email);
//       case "emailDesc":
//         return b.email.localeCompare(a.email);
//       default:
//         return 0;
//     }
//   });

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">User List</h2>

//       {/* Search + Sort */}
//       <div className="mb-4 flex flex-col md:flex-row gap-4 items-center">
//         <input
//           type="text"
//           placeholder="Search by name or email..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="border p-2 rounded w-full md:w-1/3"
//         />

//         <select
//           value={sortBy}
//           onChange={(e) => setSortBy(e.target.value)}
//           className="border p-2 rounded"
//         >
//           <option value="">Sort By</option>
//           <option value="nameAsc">Name: A → Z</option>
//           <option value="nameDesc">Name: Z → A</option>
//           <option value="emailAsc">Email: A → Z</option>
//           <option value="emailDesc">Email: Z → A</option>
//         </select>
//       </div>

//       {/* Users Table */}
//       <table className="min-w-full bg-white border">
//         <thead>
//           <tr className="bg-gray-200 text-left">
//             <th className="p-3 border">Name</th>
//             <th className="p-3 border">Email</th>
//             <th className="p-3 border">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {sortedUsers.length > 0 ? (
//             sortedUsers.map((user) => (
//               <tr key={user._id} className="border-b">
//                 <td className="p-3 border">
//                   {editingUserId === user._id ? (
//                     <input
//                       type="text"
//                       value={editForm.name}
//                       onChange={(e) =>
//                         setEditForm({ ...editForm, name: e.target.value })
//                       }
//                       className="border p-1"
//                     />
//                   ) : (
//                     user.name
//                   )}
//                 </td>
//                 <td className="p-3 border">
//                   {editingUserId === user._id ? (
//                     <input
//                       type="email"
//                       value={editForm.email}
//                       onChange={(e) =>
//                         setEditForm({ ...editForm, email: e.target.value })
//                       }
//                       className="border p-1"
//                     />
//                   ) : (
//                     user.email
//                   )}
//                 </td>
//                 <td className="p-3 border flex gap-2">
//                   {editingUserId === user._id ? (
//                     <>
//                       <button
//                         onClick={() => handleUpdate(user._id)}
//                         className="bg-green-500 text-white px-3 py-1 rounded"
//                       >
//                         Save
//                       </button>
//                       <button
//                         onClick={() => setEditingUserId(null)}
//                         className="bg-gray-400 text-white px-3 py-1 rounded"
//                       >
//                         Cancel
//                       </button>
//                     </>
//                   ) : (
//                     <>
//                       <button
//                         onClick={() => handleEdit(user)}
//                         className="bg-blue-500 text-white px-3 py-1 rounded"
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => handleDelete(user._id)}
//                         className="bg-red-500 text-white px-3 py-1 rounded"
//                       >
//                         Delete
//                       </button>
//                     </>
//                   )}
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="3" className="text-center p-4">
//                 No users found.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default UserList;


// ✅ NEW CODE
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const UserList = () => {
//   const [users, setUsers] = useState([]);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(true);

//   const [editingUserId, setEditingUserId] = useState(null);
//   const [editForm, setEditForm] = useState({ name: "", email: "", role: "", status: "" });

//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortBy, setSortBy] = useState("");

//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const limit = 5;

//   useEffect(() => {
//     fetchUsers(currentPage);
//   }, [currentPage, searchTerm, sortBy]); // refetch when page, search, or sort changes

//   const fetchUsers = async (page) => {
//     try {
//       setLoading(true);
//       const token = localStorage.getItem("admin-token");
//       if (!token) {
//         setError("No admin token found. Please log in as admin.");
//         setLoading(false);
//         return;
//       }

//       const res = await axios.get(
//         `http://localhost:3001/api/users?page=${page}&limit=${limit}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       let fetchedUsers = res.data.data;

//       // Filter by search term
//       if (searchTerm.trim()) {
//         const s = searchTerm.toLowerCase();
//         fetchedUsers = fetchedUsers.filter(
//           (u) => u.name.toLowerCase().includes(s) || u.email.toLowerCase().includes(s)
//         );
//       }

//       // Sort users
//       const sortedUsers = [...fetchedUsers].sort((a, b) => {
//         switch (sortBy) {
//           case "nameAsc":
//             return a.name.localeCompare(b.name);
//           case "nameDesc":
//             return b.name.localeCompare(a.name);
//           case "emailAsc":
//             return a.email.localeCompare(b.email);
//           case "emailDesc":
//             return b.email.localeCompare(a.email);
//           default:
//             return 0;
//         }
//       });

//       setUsers(sortedUsers);
//       setTotalUsers(res.data.totalPages * limit); // approximate total users
//       setTotalPages(res.data.totalPages);
//     } catch (err) {
//       console.error("Error fetching users:", err);
//       setError("Failed to fetch users.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this user?")) return;
//     try {
//       await axios.delete(`http://localhost:3001/api/users/${id}`, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("admin-token")}` },
//       });
//       setUsers(users.filter((u) => u._id !== id));
//     } catch (err) {
//       console.error(err);
//       alert("Failed to delete user.");
//     }
//   };

//   const handleEdit = (user) => {
//     setEditingUserId(user._id);
//     setEditForm({ name: user.name, email: user.email, role: user.role, status: user.status });
//   };

//   const handleUpdate = async (id) => {
//     try {
//       const res = await axios.put(`http://localhost:3001/api/users/${id}`, editForm, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("admin-token")}` },
//       });
//       setUsers(users.map((u) => (u._id === id ? res.data.data : u)));
//       setEditingUserId(null);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to update user.");
//     }
//   };

//   const handlePageJump = (e) => {
//     const page = parseInt(e.target.value);
//     if (page >= 1 && page <= totalPages) setCurrentPage(page);
//   };

//   if (loading) return <p className="text-center mt-6">Loading users...</p>;
//   if (error) return <p className="text-center text-red-500 mt-6">{error}</p>;

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-2">User List</h2><br />

//       {/* Search + Sort */}
//       <div className="mb-4 flex flex-col md:flex-row gap-4 items-center">
//         <input
//           type="text"
//           placeholder="Search by name or email..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="border p-2 rounded w-full md:w-1/3"
//         />
//         <select
//           value={sortBy}
//           onChange={(e) => setSortBy(e.target.value)}
//           className="border p-2 rounded"
//         >
//           <option value="">Sort By</option>
//           <option value="nameAsc">Name: A → Z</option>
//           <option value="nameDesc">Name: Z → A</option>
//           <option value="emailAsc">Email: A → Z</option>
//           <option value="emailDesc">Email: Z → A</option>
//         </select>
//       </div>

//       {/* Users Table */}
//       <table className="min-w-full bg-white border">
//         <thead>
//           <tr className="bg-gray-200 text-left">
//             <th className="p-3 border">Name</th>
//             <th className="p-3 border">Email</th>
//             <th className="p-3 border">Role</th>
//             <th className="p-3 border">Status</th>
//             <th className="p-3 border">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.length ? (
//             users.map((user) => (
//               <tr key={user._id} className="border-b">
//                 <td className="p-3 border">
//                   {editingUserId === user._id ? (
//                     <input
//                       type="text"
//                       value={editForm.name}
//                       onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
//                       className="border p-1"
//                     />
//                   ) : (
//                     user.name
//                   )}
//                 </td>
//                 <td className="p-3 border">
//                   {editingUserId === user._id ? (
//                     <input
//                       type="email"
//                       value={editForm.email}
//                       onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
//                       className="border p-1"
//                     />
//                   ) : (
//                     user.email
//                   )}
//                 </td>
//                 <td className="p-3 border">
//                   {editingUserId === user._id ? (
//                     <select
//                       value={editForm.role}
//                       onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
//                       className="border p-1"
//                     >
//                       <option value="customer">Customer</option>
//                       <option value="admin">Admin</option>
//                     </select>
//                   ) : user.role === "admin" ? (
//                     <span className="bg-purple-200 text-purple-700 px-2 py-1 rounded">Admin</span>
//                   ) : (
//                     <span className="bg-green-200 text-green-700 px-2 py-1 rounded">Customer</span>
//                   )}
//                 </td>
//                 <td className="p-3 border">
//                   {editingUserId === user._id ? (
//                     <select
//                       value={editForm.status}
//                       onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
//                       className="border p-1"
//                     >
//                       <option value="active">Active</option>
//                       <option value="blocked">Blocked</option>
//                     </select>
//                   ) : user.status === "active" ? (
//                     <span className="bg-green-200 text-green-700 px-2 py-1 rounded">Active</span>
//                   ) : (
//                     <span className="bg-red-200 text-red-700 px-2 py-1 rounded">Blocked</span>
//                   )}
//                 </td>
//                 <td className="p-3 border flex gap-2">
//                   {editingUserId === user._id ? (
//                     <>
//                       <button
//                         onClick={() => handleUpdate(user._id)}
//                         className="bg-green-500 text-white px-3 py-1 rounded"
//                       >
//                         Save
//                       </button>
//                       <button
//                         onClick={() => setEditingUserId(null)}
//                         className="bg-gray-400 text-white px-3 py-1 rounded"
//                       >
//                         Cancel
//                       </button>
//                     </>
//                   ) : (
//                     <>
//                       <button
//                         onClick={() => handleEdit(user)}
//                         className="bg-blue-500 text-white px-3 py-1 rounded"
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => handleDelete(user._id)}
//                         className="bg-red-500 text-white px-3 py-1 rounded"
//                       >
//                         Delete
//                       </button>
//                     </>
//                   )}
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="5" className="text-center p-4">
//                 No users found.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>

//       {/* Pagination */}
//       <div className="flex justify-center items-center mt-4 gap-2">
//         <button
//           disabled={currentPage === 1}
//           onClick={() => setCurrentPage((p) => p - 1)}
//           className="px-3 py-1 border rounded disabled:opacity-50"
//         >
//           Prev
//         </button>
//         <span className="px-2">Page</span>
//         <input
//           type="number"
//           value={currentPage}
//           onChange={handlePageJump}
//           className="w-12 border p-1 rounded text-center"
//         />
//         <span className="px-2">of {totalPages}</span>
//         <button
//           disabled={currentPage === totalPages}
//           onClick={() => setCurrentPage((p) => p + 1)}
//           className="px-3 py-1 border rounded disabled:opacity-50"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default UserList;


// ✅ NEW CODE
import React, { useEffect, useState } from "react";
import axios from "axios";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const [editingUserId, setEditingUserId] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", email: "", role: "", status: "" });

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5;

  // Fetch users whenever currentPage or sortBy changes
  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage, sortBy]);

  // Handler for search input
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset page to 1 on search
  };

  const fetchUsers = async (page) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("admin-token");
      if (!token) {
        setError("No admin token found. Please log in as admin.");
        setLoading(false);
        return;
      }

      const res = await axios.get(
        `http://localhost:3001/api/users?page=${page}&limit=${limit}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      let fetchedUsers = res.data.data;

      // Filter by search term
      if (searchTerm.trim()) {
        const s = searchTerm.toLowerCase();
        fetchedUsers = fetchedUsers.filter(
          (u) => u.name.toLowerCase().includes(s) || u.email.toLowerCase().includes(s)
        );
      }

      // Sort users
      const sortedUsers = [...fetchedUsers].sort((a, b) => {
        switch (sortBy) {
          case "nameAsc":
            return a.name.localeCompare(b.name);
          case "nameDesc":
            return b.name.localeCompare(a.name);
          case "emailAsc":
            return a.email.localeCompare(b.email);
          case "emailDesc":
            return b.email.localeCompare(a.email);
          default:
            return 0;
        }
      });

      setUsers(sortedUsers);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`http://localhost:3001/api/users/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("admin-token")}` },
      });
      setUsers(users.filter((u) => u._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete user.");
    }
  };

  const handleEdit = (user) => {
    setEditingUserId(user._id);
    setEditForm({ name: user.name, email: user.email, role: user.role, status: user.status });
  };

  const handleUpdate = async (id) => {
    try {
      const res = await axios.put(`http://localhost:3001/api/users/${id}`, editForm, {
        headers: { Authorization: `Bearer ${localStorage.getItem("admin-token")}` },
      });
      setUsers(users.map((u) => (u._id === id ? res.data.data : u)));
      setEditingUserId(null);
    } catch (err) {
      console.error(err);
      alert("Failed to update user.");
    }
  };

  const handlePageJump = (e) => {
    const page = parseInt(e.target.value);
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  if (loading) return <p className="text-center mt-6">Loading users...</p>;
  if (error) return <p className="text-center text-red-500 mt-6">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-2">User List</h2><br />

      {/* Search + Sort */}
      <div className="mb-4 flex flex-col md:flex-row gap-4 items-center">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={handleSearchChange} // updated handler
          className="border p-2 rounded w-full md:w-1/3"
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Sort By</option>
          <option value="nameAsc">Name: A → Z</option>
          <option value="nameDesc">Name: Z → A</option>
          <option value="emailAsc">Email: A → Z</option>
          <option value="emailDesc">Email: Z → A</option>
        </select>
      </div>

      {/* Users Table */}
      <table className="min-w-full bg-white border">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-3 border">Name</th>
            <th className="p-3 border">Email</th>
            <th className="p-3 border">Role</th>
            <th className="p-3 border">Status</th>
            <th className="p-3 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length ? (
            users.map((user) => (
              <tr key={user._id} className="border-b">
                <td className="p-3 border">
                  {editingUserId === user._id ? (
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="border p-1"
                    />
                  ) : (
                    user.name
                  )}
                </td>
                <td className="p-3 border">
                  {editingUserId === user._id ? (
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      className="border p-1"
                    />
                  ) : (
                    user.email
                  )}
                </td>
                <td className="p-3 border">
                  {editingUserId === user._id ? (
                    <select
                      value={editForm.role}
                      onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                      className="border p-1"
                    >
                      <option value="customer">Customer</option>
                      <option value="admin">Admin</option>
                    </select>
                  ) : user.role === "admin" ? (
                    <span className="bg-purple-200 text-purple-700 px-2 py-1 rounded">Admin</span>
                  ) : (
                    <span className="bg-green-200 text-green-700 px-2 py-1 rounded">Customer</span>
                  )}
                </td>
                <td className="p-3 border">
                  {editingUserId === user._id ? (
                    <select
                      value={editForm.status}
                      onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                      className="border p-1"
                    >
                      <option value="active">Active</option>
                      <option value="blocked">Blocked</option>
                    </select>
                  ) : user.status === "active" ? (
                    <span className="bg-green-200 text-green-700 px-2 py-1 rounded">Active</span>
                  ) : (
                    <span className="bg-red-200 text-red-700 px-2 py-1 rounded">Blocked</span>
                  )}
                </td>
                <td className="p-3 border flex gap-2">
                  {editingUserId === user._id ? (
                    <>
                      <button
                        onClick={() => handleUpdate(user._id)}
                        className="bg-green-500 text-white px-3 py-1 rounded"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingUserId(null)}
                        className="bg-gray-400 text-white px-3 py-1 rounded"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEdit(user)}
                        className="bg-blue-500 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center p-4">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-4 gap-2">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="px-2">Page</span>
        <input
          type="number"
          value={currentPage}
          onChange={handlePageJump}
          className="w-12 border p-1 rounded text-center"
        />
        <span className="px-2">of {totalPages}</span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserList;


// ✅ NEW CODE

