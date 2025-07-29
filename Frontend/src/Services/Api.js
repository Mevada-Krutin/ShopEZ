import axios from "axios";

const API_URL = "http://localhost:3001/api";

export const authenticLogin = async (data) => {
  try {
    return await axios.post(`${API_URL}/users/login`, data);
  } catch (error) {
    console.error("Login API error:", error.message);
    return error.response;
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
    const response = await axios.post(`${API_URL}/orders`, data, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Order API error:", error.response?.data || error.message);
    throw error;
  }
};
