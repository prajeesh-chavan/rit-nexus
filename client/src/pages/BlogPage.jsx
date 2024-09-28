import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { getPostById, getRelatedPosts } from "../services/postService"; // Import the new service

const BlogPage = () => {
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [blogPost, setBlogPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]); // Fixed state variable name
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const response = await getPostById(id);
        setBlogPost(response);

        // Fetch related posts after the blog post is fetched
        const relatedResponse = await getRelatedPosts(response.category); // Assume the response has a category
        setRelatedPosts(relatedResponse);
      } catch (error) {
        console.error("Error fetching blog post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPost();
  }, [id]);

  // Handle new comment submission
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const newCommentData = {
      content: newComment,
      author: "Anonymous",
      createdAt: new Date().toISOString(),
    };

    try {
      const response = await fetch(`/api/posts/${id}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCommentData),
      });
      const savedComment = await response.json();
      setComments((prevComments) => [...prevComments, savedComment]);
      setNewComment("");
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!blogPost) {
    return <p>Blog post not found.</p>;
  }

  return (
    <>
      <div className="relative max-w-screen-xl px-24 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16">
        <Link to="/">
          <div className="flex gap-5 items-center mb-4">
            <FaArrowLeft />
            <h2>Back to Home</h2>
          </div>
        </Link>
        {/* Blog Post */}
        <article className="blog-content">
          <img
            src={`http://localhost:5000/${blogPost.image}`}
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
        </article>

        {/* Comments Section */}
        <section className="comments-section mt-8">
          <h2 className="text-2xl font-bold mb-4">Comments</h2>
          {comments.length > 0 ? (
            <ul>
              {comments.map((comment) => (
                <li key={comment.id} className="border-b py-4">
                  <p className="text-gray-700">{comment.content}</p>
                  <p className="text-sm text-gray-500">
                    By {comment.author} on{" "}
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
        </section>

        {/* Related Posts Section */}
        <section className="related-posts mt-8">
          <h2 className="text-2xl font-bold mb-4">Related Posts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Map through related posts if available */}
            {relatedPosts.map((post) => (
              <div
                key={post.id}
                className="border rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={`http://localhost:5000/${post.image}`}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{post.title}</h3>
                  <p className="text-gray-600">{post.excerpt}</p>
                  <Link
                    to={`/blog/${post.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    Read more
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default BlogPage;
