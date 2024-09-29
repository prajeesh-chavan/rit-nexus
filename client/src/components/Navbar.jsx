import React, { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import { getUserProfile } from "../services/userService";
import { toast } from "react-hot-toast"; // Ensure you import toast if you're using it

function Navbar() {
  const [profileImage, setProfileImage] = useState(null);
  const [isOpen, setIsOpen] = useState(false); // State to manage mobile menu visibility

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await getUserProfile();
        setProfileImage(profile.image);
      } catch (error) {
        toast.error("Error fetching user profile");
      }
    };

    fetchProfile();
  }, []);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev); // Toggle mobile menu state
  };

  return (
    <nav className="bg-white my-8 mx-auto w-[90%] max-w-6xl shadow-md rounded-2xl z-50">
      <div className="flex items-center justify-between mx-auto p-4">
      <button
          onClick={toggleMenu}
          type="button"
          className="items-center p-2 w-5 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-solid-bg"
          aria-expanded={isOpen}
        >
          <span className="sr-only">Open main menu</span>
          <FaBars size={28} />
        </button>
        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={logo} className="h-8" alt="Flowbite Logo" />
          <span className="self-center text-2xl font-extrabold whitespace-nowrap">
            RIT Nexus
          </span>
        </a>
        <div />

        <div
          className={`md:block ${
            isOpen ? "fixed inset-0 bg-gray-800 bg-opacity-70 z-40" : "hidden"
          }`}
          onClick={toggleMenu}
        >
          <div
            className={`absolute top-0 left-0 w-2/3 bg-white h-full shadow-lg transition-transform duration-300 ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            
            <ul className="flex flex-col font-medium mt-4 p-4">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `block py-2 px-3 rounded ${
                      isActive
                        ? "text-blue-700"
                        : "text-gray-900 hover:bg-gray-100"
                    }`
                  }
                  end
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/create"
                  className={({ isActive }) =>
                    `block py-2 px-3 rounded ${
                      isActive
                        ? "text-blue-700"
                        : "text-gray-900 hover:bg-gray-100"
                    }`
                  }
                >
                  Create Blog
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `block py-2 px-3 rounded ${
                      isActive
                        ? "text-blue-700"
                        : "text-gray-900 hover:bg-gray-100"
                    }`
                  }
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    `block py-2 px-3 rounded ${
                      isActive
                        ? "text-blue-700"
                        : "text-gray-900 hover:bg-gray-100"
                    }`
                  }
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        <div className={`hidden md:flex flex-grow justify-center`}>
          <ul className="flex space-x-8">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `block py-2 px-3 rounded ${
                    isActive
                      ? "text-blue-700"
                      : "text-gray-900 hover:bg-gray-100"
                  }`
                }
                end
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/create"
                className={({ isActive }) =>
                  `block py-2 px-3 rounded ${
                    isActive
                      ? "text-blue-700"
                      : "text-gray-900 hover:bg-gray-100"
                  }`
                }
              >
                Create Blog
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `block py-2 px-3 rounded ${
                    isActive
                      ? "text-blue-700"
                      : "text-gray-900 hover:bg-gray-100"
                  }`
                }
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `block py-2 px-3 rounded ${
                    isActive
                      ? "text-blue-700"
                      : "text-gray-900 hover:bg-gray-100"
                  }`
                }
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
        <Link to="/dashboard">
          <img
            src={`http://192.168.230.130:5000/${profileImage}`}
            alt="Profile Preview"
            className="size-10 rounded-full object-cover object-top cursor-pointer shadow-sm hover:scale-[1.02] transition-transform"
          />
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
