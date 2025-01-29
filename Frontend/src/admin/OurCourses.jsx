import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

function OurCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("Admintoken") || "{}");
    // const token = admin?.token;
    console.log(token)

    if (!token) {
      toast.error("Please login to access this page.");
      navigate("/admin/login");
      return;
    }

    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_SIGNUP_API}/courses/allcourses`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCourses(response.data.courses);
        setLoading(false);
      } catch (err) {
        setError("Failed to load courses. Please try again.");
        console.error("Error fetching courses:", err);
        setLoading(false);
      }
    };

    fetchCourses();
  }, [navigate]);

  const handleDelete = async (id) => {
    const token = JSON.parse(localStorage.getItem("Admintoken") || "{}");
    // const token = admin?.token;

    if (!token) {
      toast.error("Unauthorized access. Please login.");
      navigate("/admin/login");
      return;
    }

    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_SIGNUP_API}/courses/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(response.data.message);
      setCourses((prevCourses) => prevCourses.filter((course) => course._id !== id));
    } catch (err) {
      console.error("Error deleting course:", err);
      toast.error(err.response?.data?.errors || "Error in deleting course.");
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="bg-gray-100 p-8 space-y-4">
      <h1 className="text-3xl font-bold text-center mb-8">Our Courses</h1>
      <Link
        className="bg-orange-400 py-2 px-4 rounded-lg text-white hover:bg-orange-500 duration-300"
        to={"/admin/dashboard"}
      >
        Go to Dashboard
      </Link>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course._id} className="bg-white shadow-md rounded-lg p-4">
            {/* Course Image */}
            <img
              src={course?.image?.url || "https://via.placeholder.com/300x200"}
              alt={course?.title || "Course Image"}
              className="h-40 w-full object-cover rounded-t-lg"
            />
            {/* Course Title */}
            <h2 className="text-xl font-semibold mt-4 text-gray-800">
              {course?.title || "Untitled Course"}
            </h2>
            {/* Course Description */}
            <p className="text-gray-600 mt-2 text-sm">
              {course?.description
                ? course.description.length > 200
                  ? `${course.description.slice(0, 200)}...`
                  : course.description
                : "No description available."}
            </p>
            {/* Course Price */}
            <div className="flex justify-between mt-4 text-gray-800 font-bold">
              <div>
                ₹{course?.price || "0"}{" "}
                <span className="line-through text-gray-500">₹5000</span>
              </div>
              <div className="text-green-600 text-sm mt-2">50% off</div>
            </div>
            {/* Actions */}
            <div className="flex justify-between">
              <Link
                to={`/admin/update-course/${course._id}`}
                className="bg-orange-500 text-white py-2 px-4 mt-4 rounded hover:bg-orange-600"
              >
                Update
              </Link>
              <button
                onClick={() => handleDelete(course._id)}
                className="bg-red-500 text-white py-2 px-4 mt-4 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OurCourses;
