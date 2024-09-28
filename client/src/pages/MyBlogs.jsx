import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getMyBlogs, deletePost } from "../services/postService";

const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await getMyBlogs();
        setBlogs(response);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setError("Failed to load blogs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this blog? This action cannot be undone."
      )
    ) {
      try {
        await deletePost(id);
        setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
      } catch (error) {
        console.error("Error deleting post:", error);
        setError("Failed to delete the blog. Please try again.");
      }
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  if (blogs.length === 0) {
    return (
      <div className="text-center p-4">
        No blogs found. Start writing your first blog!
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6 text-left">My Blogs</h1>
      <div className="grid grid-cols-1 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="p-6 bg-white flex justify-between shadow-md rounded-lg transition-transform transform hover:scale-[1.01]"
          >
            <div>
              <h2 className="font-semibold mb-2 text-xl">
                {blog.title}
                <span
                  className={`inline-block ml-2 px-2 py-1 text-sm rounded-lg ${
                    blog.status === "published"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {blog.status}
                </span>
              </h2>
              <p className="text-base text-gray-500">
                {new Date(blog.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex justify-end items-center gap-4">
              <Link
                to={`/blog/${blog._id}`}
                className="text-blue-500 hover:underline"
              >
                View
              </Link>
              <Link
                to={`/dashboard/edit-post/${blog._id}`}
                className="text-green-500 hover:underline"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(blog._id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBlogs;
