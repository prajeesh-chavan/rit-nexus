import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
  FaGithub,
} from "react-icons/fa"; // Import icons from react-icons

const Footer = () => {
  return (
    <footer className="bg-tertiary text-white py-4">
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Social Media Icons */}
        <div className="mt-8 flex justify-center space-x-4">
          <a
            href="https://wa.me/7012020059"
            className="text-gray-400 hover:text-white transition duration-200"
          >
            <FaWhatsapp size={24} />
          </a>
          <a
            href="https://github.com/prajeesh-chavan"
            className="text-gray-400 hover:text-white transition duration-200"
          >
            <FaGithub size={24} />
          </a>
          <a
            href="https://www.instagram.com/prajeeshchavan/"
            className="text-gray-400 hover:text-white transition duration-200"
          >
            <FaInstagram size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/prajeeshchavan"
            className="text-gray-400 hover:text-white transition duration-200"
          >
            <FaLinkedin size={24} />
          </a>
        </div>

        {/* Copyright Section */}
        <div className="text-center mt-8 text-sm">
          &copy; {new Date().getFullYear()} Prajeesh Chavan. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
