import React from "react";
import Navbar from "../components/Navbar";
import Lottie from "lottie-react";
import animationData from "../assets/lotties/hero.json";
import { BlogCard } from "../components/BlogCard";

const HomePage = () => {
  return (
    <>
      <div className="flex flex-col">
        <Navbar />

        {/* Hero Sections */}
        <section className="bg-white mt-32">
          <div className="grid max-w-screen-xl px-24 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
            <div className="mr-auto place-self-center lg:col-span-7">
              <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl">
                Write Your Story, Shape the Future
              </h1>
              <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl">
                Every story has the power to inspire change. Join our dynamic
                blog platform to share your journey, explore diverse
                perspectives, and spark meaningful discussions. From personal
                anecdotes to thought-provoking articles, your words can make an
                impact. Dive in, connect with fellow creators, and be part of a
                community that thrives on sharing and inspiration!
              </p>
              <a
                href="#"
                className="inline-flex items-center justify-center px-5  py-3 mr-5 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100"
              >
                Get started
                <svg
                  className="w-5 h-5 ml-2 -mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100"
              >
                Create Blog
              </a>
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
        <section className="max-w-screen-xl px-24 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16">
          <h2 className="text-5xl font-bold mb-12">Featured Blogs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <BlogCard/>
            <BlogCard/>
            <BlogCard/>
            
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;
