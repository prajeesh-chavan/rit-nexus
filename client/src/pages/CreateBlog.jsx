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

  // Handle image selection and preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
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

          <div className="h-auto">
            <label className="block text-sm font-medium">Content</label>
            <ReactQuill
              value={content}
              onChange={setContent}
              className="mt-1 h-96"
              theme="snow"
              placeholder="Write your blog content here..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mt-12">Category</label>
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

          {/* Image Upload Section */}
          <div>
            <label className="block text-sm font-medium">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-lg file:text-sm file:font-semibold file:bg-secondary file:text-white hover:file:bg-secondary/85"
            />
          </div>

          {/* Image Preview */}
          {imagePreview && (
            <div className="mt-4">
              <p className="text-sm font-medium">Image Preview:</p>
              <img
                src={imagePreview}
                alt="Selected"
                className="mt-2 w-full max-w-xs rounded-lg"
              />
            </div>
          )}

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

        {/* Preview Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Live Preview</h2>

          {/* Blog Preview */}
          <article className="blog-content bg-gray-100 p-6 rounded-lg">
            {/* Preview Image */}
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-72 object-cover rounded-lg"
              />
            )}

            {/* Preview Title */}
            <h1 className="text-4xl font-bold mt-4 text-secondary">
              {title || "Blog Title"}
            </h1>

            {/* Preview Author, Date, and Category */}
            <p className="text-gray-500 text-sm mb-6">
              By Preview Author | {new Date().toLocaleDateString()} |{" "}
              {category || "Category"}
            </p>

            {/* Preview Content */}
            <div
              className="text-gray-700"
              dangerouslySetInnerHTML={{
                __html:
                  content || "<p>Your blog content will appear here...</p>",
              }}
            ></div>

            {/* Preview Tags */}
            {tags && (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-600">
                  Tags:{" "}
                  {tags
                    .split(",")
                    .map((tag) => tag.trim())
                    .join(", ")}
                </p>
              </div>
            )}
          </article>
        </div>
      </div>
    </>
  );
};

export default CreateBlog;
