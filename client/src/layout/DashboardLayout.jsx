import React from "react";
import { Link, Navigate } from "react-router-dom";
import logo from "../assets/logo.png";

const DashboardLayout = ({ children }) => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
  };
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="relative w-64 bg-gray-800 text-white">
        <nav className="mt-10">
          <Link
            to="/"
            href="#"
            className="flex items-center space-x-3 p-4 rtl:space-x-reverse"
          >
            <img src={logo} className="h-8" alt="Flowbite Logo" />
            <span className="self-center text-2xl font-extrabold whitespace-nowrap">
              RIT Nexus
            </span>
          </Link>
          <ul>
            <li className="p-4">
              <Link to="/dashboard" className="hover:text-gray-400">
                Dashboard Home
              </Link>
            </li>
            <li className="p-4">
              <Link to="/dashboard/my-blogs" className="hover:text-gray-400">
                My Blogs
              </Link>
            </li>
            <li className="p-4">
              <Link to="/create" className="hover:text-gray-400">
                Create New Post
              </Link>
            </li>
            <li className="p-4">
              <Link to="/dashboard/profile" className="hover:text-gray-400">
                Profile
              </Link>
            </li>
            <li className="p-4 absolute bottom-2 w-full">
              <Link
                to="/login"
                onClick={handleLogout}
                className="block bg-red-500 w-full items-center justify-center px-5  py-3 text-base font-bold text-center text-gray-900 rounded-lg hover:bg-red-700"
              >
                Logout
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-gray-100 p-10">{children}</main>
    </div>
  );
};

export default DashboardLayout;
