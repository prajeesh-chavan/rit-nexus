import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/posts`;

// Create a new blog post
export const createPost = async (postData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(API_URL, postData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

// Get all blog posts
export const getAllPosts = async () => {
  try {
    const response = await axios.get(`${API_URL}/blogs`);
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

// Get a single blog post by ID
export const getPostById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching post:", error);
    throw error;
  }
};

// Get related blog posts by category
export const getRelatedPosts = async (category) => {
  try {
    const response = await axios.get(`${API_URL}/related/${category}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching related posts:", error);
    throw error;
  }
};

// Update a blog post
export const updatePost = async (id, postData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(`${API_URL}/${id}`, postData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
};

// Delete a blog post
export const deletePost = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
};

export const getMyBlogs = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};
