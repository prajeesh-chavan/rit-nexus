import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Lottie from "lottie-react";
import animationData from "../assets/lotties/hero.json";
import loader from "../assets/lotties/loader.json";
import { BlogCard } from "../components/BlogCard";
import { getAllPosts } from "../services/postService";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const fetchedPosts = await getAllPosts(); // Fetch posts from the service
        setPosts(fetchedPosts); // Set the fetched posts to state
      } catch (err) {
        setError(err.message); // Set error message if fetch fails
      } finally {
        setLoading(false); // Set loading to false
      }
    };

    getPosts();
  }, []);

  if (loading) {
    return <Loader />;
  }

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }

  return (
    <>
      <div className="flex flex-col">
        <Navbar />
        {/* Hero Sections */}
        <section className="bg-white">
          <div className="grid max-w-screen-xl px-12 md:px-24 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
            <div className="mr-auto place-self-center lg:col-span-7">
              <h1 className="w-full md:max-w-2xl mb-4 text-3xl font-extrabold tracking-tight leading-none text-center md:text-left md:text-4xl xl:text-5xl">
                Your Voice. Your Stories
                <br />
                RIT Nexus Blog
              </h1>
              <p className="max-w-2xl mb-6 font-light text-gray-500 text-sm lg:mb-8 md:text-base lg:text-lg">
                At RIT Nexus, every student has a story to tell. Explore a wide
                range of blogs written by your peers—sharing their experiences,
                insights, and perspectives on everything from campus life to
                career paths. Join the conversation, share your voice, and make
                your mark in the RIT community.
              </p>
              <div className="flex gap-4 justify-center md:justify-start">
                <Link
                  to="/create"
                  className="inline-flex items-center justify-center px-3 md:px-5 py-2 md:py-3 text-sm md:text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100"
                >
                  Create Blog
                </Link>
                <Link
                  to="/blogs"
                  className="inline-flex items-center justify-center px-3 md:px-5 py-2 md:py-3 text-sm md:text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100"
                >
                  Explore Blogs
                </Link>
              </div>
            </div>
            <div className="lg:mt-0 lg:col-span-5 lg:flex">
              <Lottie
                animationData={animationData}
                autoplay={true}
                className="w-full h-full"
              />
            </div>
          </div>
        </section>

        {/* Featured Blogs */}
        <section className="max-w-screen-xl px-12 md:px-24 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16">
          <h2 className="text-3xl text-center md:text-left md:text-5xl font-bold mb-12">
            Featured Blogs
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.map((post) => (
              <BlogCard key={post._id} post={post} />
            ))}
          </div>
          <Link
            to="/blogs"
            className=" block items-center justify-center px-5  py-3 mt-12 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100"
          >
            More Blogs
          </Link>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
