import axios from "axios";

const API_URL = "http://localhost:3001/api";

// export const authenticLogin = async (data) => {
//   try {
//     const res = await axios.post(`${API_URL}/users/login`, {
//       email: data.email,
//       password: data.password,
//     });
   
//     return res.data; // return server response (token, user info, etc.)
//   } catch (error) {
//     console.error("Login API Error:", error.response?.data || error.message);
//     throw error; // rethrow to handle in frontend
//   }
// };

// ✅ User LOGIN
export const authenticLogin = async (data) => {
  try {
    return await axios.post(`${API_URL}/users/login`, data);
  } catch (err) {
    throw err;
  }
};


export const authenticsingup = async (data) => {
  try {
    return await axios.post(`${API_URL}/users/register`, data);
  } catch (error) {
    console.error("Signup API error:", error.message);
    return error.response;
  }
};

// ✅ Order API

export const authenticConfirmUser = async (data) => {
  try {
    const userToken = localStorage.getItem("user-token"); // get logged-in user token

    const response = await axios.post(`${API_URL}/orders`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`, // <-- add it here
      },
    });

    return response.data;
  } catch (error) {
    console.error("Order API error:", error.response?.data || error.message);
    throw error;
  }
};
