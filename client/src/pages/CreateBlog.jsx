import React, { useState } from "react";
import { createPost } from "../services/postService";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle form submission for publishing or saving as a draft
  const handleSubmit = async (e, postStatus) => {
    e.preventDefault();
    setLoading(true);

    if (content.length < 20) {
      setError("Blog content must be at least 20 characters.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", category);
    formData.append(
      "tags",
      tags.split(",").map((tag) => tag.trim())
    );
    if (image) formData.append("image", image);

    formData.append("status", postStatus); // Adding the status (draft or published)

    try {
      const newPost = await createPost(formData);
      toast.success(
        `Post ${
          postStatus === "draft" ? "saved as draft" : "published"
        } successfully!`
      );
      navigate("/"); // Redirect to home or post page after submission
    } catch (error) {
      setError("Error creating post. Please try again.");
      toast.error("Error creating post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-screen-lg px-4 py-8 mx-auto">
        <h1 className="text-2xl font-bold mb-4">Create a New Blog Post</h1>

        {error && <div className="text-red-500 mb-4">{error}</div>}

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter blog title"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Content</label>
            <ReactQuill
              value={content}
              onChange={setContent}
              className="mt-1"
              theme="snow"
              placeholder="Write your blog content here..."
              style={{ height: "200px" }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter category"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">
              Tags (comma separated)
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter tags"
            />
          </div>

          {/* Buttons for Publish and Save as Draft */}
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={(e) => handleSubmit(e, "published")}
              className="w-full bg-secondary text-white font-bold py-2 rounded-md hover:bg-secondary/85 transition duration-200"
              disabled={loading || !title || !content || !category}
            >
              {loading ? "Publishing..." : "Publish Blog"}
            </button>
            <button
              type="button"
              onClick={(e) => handleSubmit(e, "draft")}
              className="w-full bg-gray-500 text-white font-bold py-2 rounded-md hover:bg-gray-600 transition duration-200"
              disabled={loading || !title || !content || !category}
            >
              {loading ? "Saving Draft..." : "Save as Draft"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateBlog;
