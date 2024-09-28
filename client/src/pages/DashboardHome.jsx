// src/pages/DashboardHome.js
import React from "react";

const DashboardHome = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-6">Welcome to Your Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 shadow-md rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Total Blogs</h2>
          <p className="text-4xl">12</p>
        </div>
        <div className="bg-white p-6 shadow-md rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Comments on Blogs</h2>
          <p className="text-4xl">34</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
