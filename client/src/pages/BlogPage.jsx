import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { FaArrowAltCircleLeft, FaArrowLeft } from "react-icons/fa";

const BlogPage = () => {
  const { id } = useParams();

  // Sample blog data for testing
  const sampleBlog = {
    id: 1,
    title: "The Beauty of MERN Stack Development",
    content: `
      <p>In the world of web development, the MERN stack has become a powerhouse for creating full-stack applications. 
      Comprising MongoDB, Express.js, React, and Node.js, the MERN stack is ideal for developers seeking a unified 
      JavaScript-based development experience. In this post, we’ll dive into the strengths of each technology and why 
      the MERN stack is so widely embraced.</p>
      <p>MongoDB offers flexibility in storing data as documents, while Express.js simplifies building web applications 
      on the backend. With React's component-based architecture, developers can create dynamic, responsive user 
      interfaces. Finally, Node.js ensures that everything runs smoothly on the server side. Together, these tools make 
      the MERN stack a powerful choice for modern web development.</p>`,
    image: "https://via.placeholder.com/800x400", // Sample image URL
    author: "John Doe",
    createdAt: "2024-09-25",
  };

  // Sample related posts
  const sampleRelatedPosts = [
    {
      id: 2,
      title: "Why React is the Future of Frontend Development",
      excerpt:
        "Learn why React is considered one of the best frameworks for building user interfaces...",
      image: "https://via.placeholder.com/300", // Sample image URL
    },
    {
      id: 3,
      title: "Mastering Node.js for Backend Development",
      excerpt:
        "Node.js is an essential part of the MERN stack. This guide will help you master it...",
      image: "https://via.placeholder.com/300", // Sample image URL
    },
  ];

  // Sample comments
  const sampleComments = [
    {
      id: 1,
      content:
        "Great post! MERN is definitely one of my favorite stacks for web development.",
      author: "Jane Smith",
      createdAt: "2024-09-26",
    },
    {
      id: 2,
      content:
        "Thanks for the insights, I found the comparison between Express.js and other backend frameworks very useful.",
      author: "Mark Lee",
      createdAt: "2024-09-27",
    },
  ];

  const [comments, setComments] = useState(sampleComments);
  const [newComment, setNewComment] = useState("");

  // Handle new comment submission
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const newCommentData = {
      id: comments.length + 1,
      content: newComment,
      author: "Anonymous",
      createdAt: new Date().toISOString(),
    };
    setComments([...comments, newCommentData]);
    setNewComment("");
  };

  return (
    <>
      <div className="relative max-w-screen-xl px-24 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16">
        <Link to="/">
          <div className="flex gap-5 items-center mb-4">
            <FaArrowLeft className="" />
            <h2>Back to Home</h2>
          </div>
        </Link>
        {/* Blog Post */}
        <article className="blog-content">
          <img
            src={sampleBlog.image}
            alt={sampleBlog.title}
            className="w-full h-72 object-cover"
          />
          <h1 className="text-4xl font-bold mt-4 text-secondary">
            {sampleBlog.title}
          </h1>
          <p className="text-gray-500 text-sm mb-6">
            By {sampleBlog.author} |{" "}
            {new Date(sampleBlog.createdAt).toLocaleDateString()}
          </p>
          <div dangerouslySetInnerHTML={{ __html: sampleBlog.content }}></div>
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
            {sampleRelatedPosts.map((post) => (
              <div
                key={post.id}
                className="border rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{post.title}</h3>
                  <p className="text-gray-600">{post.excerpt}</p>
                  <a
                    href={`/blog/${post.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    Read more
                  </a>
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
