import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import { ToastContainer } from "react-toastify";
import Courses from "./Components/Courses";
import BuyCourse from "./Components/BuyCourse";
import Purchases from "./Components/Purchases";
import AdminSignup from "./admin/AdminSignup";
import AdminLogin from "./admin/AdminLogin";
import Dashboard from "./admin/Dashboard";
import OurCourse from "./admin/OurCourses";
import AdminUpdateCourse from "./admin/UpdateCourse";
import AdminCourseCreate from "./admin/AdminCourseCreate";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/buy/:courseId" element={<BuyCourse />} />
        <Route path="/purchases" element={<Purchases />} />

        {/* Admin Routes */}

        <Route path="/admin/signup" element={<AdminSignup />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/create-course" element={<AdminCourseCreate />} />
        <Route path="/admin/update-course/:id" element={<AdminUpdateCourse />} />
        <Route path="/admin/our-courses" element={<OurCourse />} />
      </Routes>
      <ToastContainer />
    </>
  );
};

export default App;
