import axios from "axios";

// Set the base URL for your backend API
const API_BASE_URL = "http://localhost:5000/api/user";

// Get the user's profile
export const getUserProfile = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data.user;
  } catch (error) {
    console.error(
      "Error fetching user profile",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};

// Update the user's profile
export const updateUserProfile = async (profile) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/`, profile, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error updating profile",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};
