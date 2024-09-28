import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AboutUs = () => {
  return (
    <>
      <Navbar />
      <div className="max-w-screen-xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-center mb-8">About Us</h1>
        <p className="text-lg text-center mb-6">
          Welcome to RIT Nexus! We are a community of students
          dedicated to sharing knowledge, experiences, and insights relevant to
          college life.
        </p>

        <div className="flex flex-col md:flex-row md:space-x-8">
          {/* Mission Section */}
          <div className="md:w-1/2 bg-white shadow-md rounded-lg p-6 mb-6 md:mb-0">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-700">
              Our mission is to empower students by providing valuable content
              that enhances their academic journey and personal growth. We aim
              to foster a supportive environment where students can learn from
              each other and share their unique perspectives.
            </p>
          </div>

          {/* Team Section */}
          <div className="md:w-1/2 bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
            <p className="text-gray-700">
              Our team is made up of enthusiastic college students who are
              passionate about various fields of study. We come together to
              create informative and engaging content that resonates with our
              fellow students and addresses their needs.
            </p>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-center mb-4">
            Why Read Our Blog?
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li className="text-lg text-gray-700">
              ✔️ Tips for Academic Success
            </li>
            <li className="text-lg text-gray-700">
              ✔️ Insights on Campus Life
            </li>
            <li className="text-lg text-gray-700">
              ✔️ Resources for Career Development
            </li>
            <li className="text-lg text-gray-700">
              ✔️ Opportunities for Student Engagement
            </li>
          </ul>
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
          <p className="text-lg">
            We would love to hear from you! If you have any suggestions for
            topics, feedback, or just want to connect, feel free to reach out to
            us.
          </p>
          <a
            href="/contact"
            className="mt-4 inline-block bg-secondary text-white font-bold py-2 px-4 rounded-md hover:bg-secondary/85 transition duration-200"
          >
            Contact Us
          </a>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
