import React from "react";
import { Link } from "react-router-dom";
import { RiAdminFill } from "react-icons/ri";
import {toast} from "react-toastify";
import axios from "axios";

function Dashboard() {
  const handleLogout = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_SIGNUP_API}/admin/logout`, {
        withCredentials: true,
      });
      toast.success(response.data.message);
      localStorage.removeItem("Admintoken");
    } catch (error) {
      console.log("Error in logging out ", error);
      toast.error(error.response.data.errors || "Error in logging out");
    }
  };
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-100 p-5 z-10">
        <div className="flex items-center justify-center mb-10 gap-3">
          <RiAdminFill  className="rounded-full h-6 w-6 mt-4" />
          <h2 className="text-lg font-semibold mt-4">I'm Admin</h2>
        </div>
        <nav className="flex flex-col space-y-4">
          <Link to="/admin/our-courses">
            <button className="w-full bg-green-700 hover:bg-green-600 text-white py-2 rounded">
              Our Courses
            </button>
          </Link>
          <Link to="/admin/create-course">
            <button className="w-full bg-orange-500 hover:bg-blue-600 text-white py-2 rounded">
              Create Course
            </button>
          </Link>

          <Link to="/">
            <button className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded">
              Home
            </button>
          </Link>
          <Link to="/admin/login">
            <button
              onClick={handleLogout}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded"
            >
              Logout
            </button>
          </Link>
        </nav>
      </div>
      <div className="flex h-screen items-center justify-center ml-[40%]">
       <video src="https://cdnl.iconscout.com/lottie/premium/preview-watermark/admin-panel-animated-icon-download-in-lottie-json-gif-static-svg-file-formats--administration-management-control-dashboard-interface-3d-printing-pack-science-technology-icons-9802915.mp4" alt="Admin Dashboard" className="absolute z-0 max-h-96" />
      </div>
    </div>
  );
}

export default Dashboard;