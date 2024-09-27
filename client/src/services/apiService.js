import axios from "axios";

const API_URL = "/api";

export const fetchPosts = async () => {
  try {
    const response = await axios.get(`${API_URL}/posts`);
    return response.data;
  } catch (error) {
    console.error("Error fetching posts", error);
  }
};
c