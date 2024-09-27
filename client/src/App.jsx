import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import BlogPage from "./pages/BlogPage";
import RegisterPage from "./pages/RegisterPage";
import { Toaster } from 'react-hot-toast';


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
        </Routes>
      </Router>
    </>
  );
}

export default App;
