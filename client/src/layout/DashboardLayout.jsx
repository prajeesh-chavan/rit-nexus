import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { toast } from "react-hot-toast";
import { MdOutlineMenu } from "react-icons/md";

const DashboardLayout = ({ children }) => {
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to manage sidebar visibility

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    setIsLoggedOut(true); // Set logged out state to true
  };

  // Redirect if logged out
  if (isLoggedOut) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen flex">
      {/* Toggle Button for Mobile */}
      <button
        className="p-4 text-gray-500 text-3xl md:hidden fixed top-0 left-0 z-50"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <MdOutlineMenu />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed h-screen inset-y-0 left-0 w-64 bg-gray-800 text-white transition-transform transform z-40 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:fixed md:translate-x-0  md:w-64`}
      >
        <nav className="mt-10">
          <Link to="/" className="flex items-center space-x-3 p-4">
            <img src={logo} className="h-8" alt="Flowbite Logo" />
            <span className="self-center text-2xl font-extrabold whitespace-nowrap">
              RIT Nexus
            </span>
          </Link>
          <ul onClick={() => setIsSidebarOpen(false)}>
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
            <div className="p-4 absolute bottom-2 w-full">
              <Link
                to="/login"
                onClick={handleLogout}
                className="block bg-red-500 w-full items-center justify-center px-5 py-3 text-base font-bold text-center text-gray-900 rounded-lg hover:bg-red-700"
              >
                Logout
              </Link>
            </div>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className="w-full flex-1 bg-gray-100 p-10 md:ml-64 min-h-screen transition-all duration-300">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
