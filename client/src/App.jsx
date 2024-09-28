import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import BlogPage from "./pages/BlogPage";
import RegisterPage from "./pages/RegisterPage";
import { Toaster } from "react-hot-toast";
import CreateBlog from "./pages/CreateBlog";
import ContactUs from "./pages/Contact";
import AboutUs from "./pages/About";
import Blogs from "./pages/Blogs";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import DashboardLayout from "./layout/DashboardLayout";
import MyBlogs from "./pages/MyBlogs";
import DashboardHome from "./pages/DashboardHome";
import EditBlog from "./pages/EditBlog";

function App() {
  return (
    <>
      <Toaster />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/blog/:id" element={<BlogPage />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <CreateBlog />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/edit-post/:blogId"
            element={
              <ProtectedRoute>
                <EditBlog />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <DashboardHome />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/my-blogs"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <MyBlogs />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/profile"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Profile />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
