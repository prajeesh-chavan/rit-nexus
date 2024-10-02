import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { BlogCard } from "../components/BlogCard";
import { BlogCardSkeleton } from "../components/skeltons/BlogCardSkelton";
import { getAllPosts } from "../services/postService";

function Blogs() {
  const [posts, setPosts] = useState([]); // State to hold posts
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const getPosts = async () => {
      try {
        const fetchedPosts = await getAllPosts();
        setPosts(fetchedPosts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getPosts();
  }, []);

  return (
    <>
      <Navbar />
      <div className="max-w-screen-xl min-h-screen mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-8">Blogs</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Show skeleton while loading */}
          {loading
            ? Array(3) // Adjust the number of skeleton cards based on your layout
                .fill(0)
                .map((_, index) => <BlogCardSkeleton key={index} />)
            : posts.map((post) => <BlogCard key={post._id} post={post} />)}
        </div>
        {/* Show error message if there is an error */}
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </div>
      <Footer />
    </>
  );
}

export default Blogs;
