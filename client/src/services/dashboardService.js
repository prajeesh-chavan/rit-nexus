// src/services/dashboardService.js
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/dashboard`;

export const getDashboardStats = async () => {
  try {
    const response = await axios.get(`${API_URL}/stats`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error fetching dashboard stats");
  }
};
