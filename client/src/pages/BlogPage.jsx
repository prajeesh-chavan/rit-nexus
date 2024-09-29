// BlogPage.js

import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FaArrowLeft, FaWhatsapp } from "react-icons/fa";
import { getPostById, getRelatedPosts } from "../services/postService";
import { fetchCommentsByPostId, postComment } from "../services/commentService"; // Import comment service
import Loader from "../components/Loader";
import { BlogCard } from "../components/BlogCard";

const BlogPage = () => {
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [blogPost, setBlogPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitStatus, setSubmitStatus] = useState("");

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const response = await getPostById(id);
        setBlogPost(response);
        const relatedResponse = await getRelatedPosts(response.category);
        setRelatedPosts(relatedResponse);

        // Fetch comments for the blog post
        const commentsResponse = await fetchCommentsByPostId(id);
        setComments(commentsResponse);
      } catch (error) {
        console.error("Error fetching blog post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPost();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const newCommentData = {
      content: newComment,
      author: "Anonymous",
    };

    try {
      const savedComment = await postComment(id, newCommentData);
      setComments((prevComments) => [...prevComments, savedComment]);
      setNewComment("");
      setSubmitStatus("Comment posted successfully!");
    } catch (error) {
      console.error("Error posting comment:", error);
      setSubmitStatus("Failed to post comment, please try again.");
    }
  };

  const sharePost = (platform) => {
    const url = window.location.href;
    const text = `🌟 Check out this must-read blog post: "${blogPost.title}"!`;
    let shareUrl = "";

    switch (platform) {
      case "whatsapp":
        shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
          text
        )} ${encodeURIComponent(url)}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, "_blank");
  };

  if (loading) {
    return <Loader />;
  }

  if (!blogPost) {
    return <p>Blog post not found.</p>;
  }

  return (
    <div className="relative max-w-screen-xl px-12 md:px-24 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16">
      <Link to="/">
        <div className="flex gap-5 items-center mb-4">
          <FaArrowLeft />
          <h2>Back to Home</h2>
        </div>
      </Link>

      {/* Blog Post */}
      <article className="blog-content">
        <img
          src={`${import.meta.env.VITE_API_URL}/${blogPost.image}`}
          alt={blogPost.title}
          className="w-full h-72 object-cover"
        />
        <h1 className="text-4xl font-bold mt-4 text-secondary">
          {blogPost.title}
        </h1>
        <p className="text-gray-500 text-sm mb-6">
          By {blogPost.author} |{" "}
          {new Date(blogPost.createdAt).toLocaleDateString()}
        </p>
        <div dangerouslySetInnerHTML={{ __html: blogPost.content }}></div>

        {/* Social Share Buttons */}
        <div className="social-share mt-4">
          <h2 className="text-lg font-semibold">Share this post:</h2>
          <div className="flex space-x-4">
            <button onClick={() => sharePost("whatsapp")}>
              <FaWhatsapp className="text-green-500" />
            </button>
          </div>
        </div>
      </article>

      {/* Comments Section */}
      <section className="comments-section mt-8">
        <h2 className="text-2xl font-bold mb-4">Comments</h2>
        {comments.length > 0 ? (
          <ul>
            {comments.map((comment, index) => (
              <li key={index} className="border-b py-4">
                <p className="text-gray-700">{comment.content}</p>
                <p className="text-sm text-gray-500">
                  By {comment.username} on{" "}
                  {new Date(comment.createdAt).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No comments yet. Be the first to comment!</p>
        )}

        {/* Add Comment */}
        <form onSubmit={handleCommentSubmit} className="mt-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Write your comment here..."
            required
          ></textarea>
          <button
            type="submit"
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Post Comment
          </button>
        </form>
        {submitStatus && <p className="mt-2 text-green-500">{submitStatus}</p>}
      </section>

      {/* Related Posts Section */}
      <section className="related-posts mt-8">
        <h2 className="text-2xl font-bold mb-4">Related Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {relatedPosts.map((relatedPost) => (
            <BlogCard key={relatedPost._id} post={relatedPost} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
