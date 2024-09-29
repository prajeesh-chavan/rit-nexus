// commentService.js

import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/comments`;

// Function to fetch comments by post ID
export const fetchCommentsByPostId = async (id) => {
  try {
    const response = await axios.get(`${API_URL}?id=${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
};

// Function to post a new comment
export const postComment = async (id, newCommentData) => {
  try {
    const response = await axios.post(
      `${API_URL}`,
      {
        id,
        ...newCommentData,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error posting comment:", error);
    throw error;
  }
};
