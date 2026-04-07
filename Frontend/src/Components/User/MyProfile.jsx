import React, { useState, useEffect } from "react";

export default function MyProfile() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  // ✅ Load user data from localStorage (or later from backend)
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("userProfile"));
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  // ✅ Save changes to localStorage
  const handleSave = () => {
    localStorage.setItem("userProfile", JSON.stringify(user));
    setIsEditing(false);
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-semibold text-center mb-6 text-blue-700">
          My Profile
        </h2>

        <div className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium">Name</label>
            <input
              type="text"
              value={user.name}
              disabled={!isEditing}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              className={`w-full border ${
                isEditing ? "border-blue-400" : "border-gray-300"
              } rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400`}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              value={user.email}
              disabled={!isEditing}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className={`w-full border ${
                isEditing ? "border-blue-400" : "border-gray-300"
              } rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400`}
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-gray-700 font-medium">Phone</label>
            <input
              type="text"
              value={user.phone}
              disabled={!isEditing}
              onChange={(e) => setUser({ ...user, phone: e.target.value })}
              className={`w-full border ${
                isEditing ? "border-blue-400" : "border-gray-300"
              } rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400`}
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-gray-700 font-medium">Address</label>
            <textarea
              rows="3"
              value={user.address}
              disabled={!isEditing}
              onChange={(e) => setUser({ ...user, address: e.target.value })}
              className={`w-full border ${
                isEditing ? "border-blue-400" : "border-gray-300"
              } rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400`}
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="flex justify-end mt-4 space-x-3">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Edit Profile
              </button>
            ) : (
              <>
                <button
                  onClick={handleSave}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
