import axios from "axios";

// Set the base URL for your backend API
const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api/user`;

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

// Update user profile
export const updateUserProfile = async (profileData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/`, profileData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data.user; // Adjusted to return updated user object
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};
