// src/pages/DashboardHome.js
import React, { useState, useEffect } from "react";
import { getDashboardStats } from "../services/dashboardService"; // Fetch data from backend
import { ClipLoader } from "react-spinners";

const DashboardHome = () => {
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [drafts, setDrafts] = useState(0);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { blogs, comments, drafts, activity } = await getDashboardStats();
        setTotalBlogs(blogs);
        setTotalComments(comments);
        setDrafts(drafts);
        setRecentActivity(activity);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard stats", error);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center">
        <ClipLoader color="#4A90E2" loading={loading} size={50} />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-bold mb-6">
        Welcome to User Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Total Blogs */}
        <div className="bg-white p-6 shadow-md rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Total Blogs</h2>
          <p className="text-4xl">{totalBlogs}</p>
        </div>

        {/* Total Comments */}
        <div className="bg-white p-6 shadow-md rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Comments on Blogs</h2>
          <p className="text-4xl">{totalComments}</p>
        </div>

        {/* Drafts */}
        <div className="bg-white p-6 shadow-md rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Drafts</h2>
          <p className="text-4xl">{drafts}</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
        {recentActivity.length > 0 ? (
          <ul className="list-disc pl-5">
            {recentActivity.map((activity, index) => (
              <li key={index} className="mb-2">
                {activity}
              </li>
            ))}
          </ul>
        ) : (
          <p>No recent activity found.</p>
        )}
      </div>
    </div>
  );
};

export default DashboardHome;
