import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { updatePost, getPostById } from "../services/postService";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

const EditBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [status, setStatus] = useState("draft");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPreview, setIsPreview] = useState(false);

  const { blogId } = useParams();
  const navigate = useNavigate();

  // Fetch post data when component mounts
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postData = await getPostById(blogId);
        setTitle(postData.title);
        setContent(postData.content);
        setCategory(postData.category);
        setTags(postData.tags.join(", "));
        setStatus(postData.status);
        if (postData.image) {
          setImagePreview(postData.image);
        }
      } catch (error) {
        console.error("Error fetching post data:", error);
        toast.error("Error loading post. Please try again.");
      }
    };
    fetchPost();
  }, [blogId]);

  // Handle form submission for editing
  const handleSubmit = async (e, publish = false) => {
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
    formData.append("status", publish ? "published" : "draft");
    if (image) formData.append("image", image);

    try {
      const updatedPost = await updatePost(blogId, formData);
      console.log("Post updated successfully:", updatedPost);
      toast.success(
        publish ? "Post published successfully!" : "Draft saved successfully!"
      );
      navigate("/dashboard/my-blogs");
    } catch (error) {
      console.error("Error updating post:", error);
      setError("Error updating post. Please try again.");
      toast.error("Error updating post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size should be less than 5MB.");
        return;
      }
      if (!file.type.startsWith("image/")) {
        setError("Please upload a valid image.");
        return;
      }
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-screen-xl px-4 py-8 mx-auto lg:px-24 lg:gap-8 xl:gap-0 lg:py-16">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold mb-4">Edit Blog Post</h1>

          {/* Toggle Button to Switch Between Edit and Preview Mode */}
          <div className="mb-4">
            <button
              type="button"
              onClick={() => setIsPreview(!isPreview)}
              className="px-4 py-2 bg-secondary text-white font-bold rounded-md"
            >
              {isPreview ? "Back to Edit Mode" : "Preview"}
            </button>
          </div>
        </div>

        {error && <div className="text-red-500 mb-4">{error}</div>}

        {/* Conditionally render the form or the preview */}
        {!isPreview ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title Input */}
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

            {/* Content Editor */}
            <div>
              <label className="block text-sm font-medium">Content</label>
              <ReactQuill
                value={content}
                onChange={setContent}
                className="mt-1"
                theme="snow"
                placeholder="Write your blog content here..."
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium">
                Upload Cover Photo
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="mt-4 border border-gray-300 rounded-md"
                  style={{ maxHeight: "200px", maxWidth: "100%" }}
                />
              )}
            </div>

            {/* Category Input */}
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

            {/* Tags Input */}
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

            {/* Submit Button */}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={(e) => handleSubmit(e, false)}
                className={`w-full bg-gray-500 text-white font-bold py-2 rounded-md hover:bg-gray-500/85 transition duration-200 ${
                  loading || !title || !content || !category
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                disabled={loading || !title || !content || !category}
              >
                {loading ? "Submitting..." : "Save Draft"}
              </button>
              <button
                type="button"
                onClick={(e) => handleSubmit(e, true)}
                className={`w-full bg-secondary text-white font-bold py-2 rounded-md hover:bg-secondary/85 transition duration-200 ${
                  loading || !title || !content || !category
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                disabled={loading || !title || !content || !category}
              >
                {loading
                  ? "Submitting..."
                  : status == "draft"
                  ? "Publish"
                  : "Update Post"}
              </button>
            </div>
          </form>
        ) : (
          // Preview Mode Section
          <div className="bg-white p-4 border rounded-lg shadow-md">
            <h2 className="text-3xl font-bold mb-4">{title}</h2>
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Blog Visual"
                className="mb-4 rounded-lg"
                style={{
                  maxHeight: "300px",
                  width: "100%",
                  objectFit: "cover",
                }}
              />
            )}
            {!imagePreview && (
              <img
                src={`${import.meta.env.VITE_API_URL}/${image}`}
                alt={blogPost.title}
                className="w-full h-72 object-cover"
              />
            )}
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: content }}
            />
            <div className="text-sm text-gray-500 mt-4">
              Tags:{" "}
              {tags
                .split(",")
                .map((tag) => `#${tag.trim()}`)
                .join(", ")}
            </div>
            <div className="text-sm text-gray-500 mt-2">
              Category: {category}
            </div>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => setIsPreview(false)}
                className="py-2 px-4 bg-secondary text-white font-bold rounded-md"
              >
                Edit
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default EditBlog;
