import React, { useState } from "react";
import axios from "axios";
import { toast, Bounce } from "react-toastify";
import AdminHeader from "./AdminHeader";
import { useNavigate } from "react-router-dom";

const AdminSignup = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSignupData = async (e) => {
    e.preventDefault();

    // Simple client-side validation
    if (!firstname || !lastname || !email || !password) {
      setError("All fields are required!");
      return;
    }

    try {
      setError(""); // Clear previous errors

      const signupData = {
        firstname,
        lastname,
        email,
        password,
      };

      const response = await axios.post(
        `http://localhost:3000/admin/signup`,
        signupData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;
    //   console.log(response)
    //   console.log(data);

      // Save token to localStorage
      localStorage.setItem("Admintoken", JSON.stringify(data.token));
     
      // Show success message
      toast.success(`${data.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Bounce,
      });
      // Clear form fields after successful signup
      setFirstname("");
      setLastname("");
      setEmail("");
      setPassword("");
     navigate("/admin/dashboard");
    } catch (err) {
      console.log(err);

      // Gracefully handle errors
      const errorResponse = err.response?.data?.errors || [];
      const errorMessage =
        errorResponse.length > 0
          ? errorResponse[0].msg
          : "Something went wrong. Please try again.";
      setError(errorMessage);
    }
  };

  return (
    <div className="bg-gradient-to-r from-black to-blue-900 h-screen">
      <AdminHeader />
      <div className="lg:mt-7 container mx-auto p-4 flex items-center justify-center mt-8">
        <div className="form-main border border-yellow-500 p-6 rounded-md bg-gradient-to-tr from-yellow-900 to-blue-950 w-96">
          <h1 className="text-2xl text-center font-bold text-white">
            Welcome to{" "}
            <span className="text-orange-500 font-serif">CourseHaven</span>
          </h1>
          <p className="text-sm text-gray-300 mt-2 text-center font-serif tracking-wide">
            Sign up to manage the dashboard.
          </p>
          <form onSubmit={handleSignupData} className="flex flex-col mt-4">
            <label
              htmlFor="firstname"
              className="text-gray-100 text-md mt-2 ml-1"
            >
              Admin Firstname
            </label>
            <input
              type="text"
              id="firstname"
              placeholder="First Name"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              className="w-full rounded-sm p-2 text-black text-lg outline-none"
            />
            <label
              htmlFor="lastname"
              className="text-gray-100 text-md mt-2 ml-1"
            >
              Admin Lastname
            </label>
            <input
              type="text"
              id="lastname"
              placeholder="Last Name"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              className="w-full rounded-sm p-2 text-black text-lg outline-none"
            />
            <label htmlFor="email" className="text-gray-100 text-md mt-2 ml-1">
              Admin Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-sm p-2 text-black text-lg outline-none"
            />
            <label
              htmlFor="password"
              className="text-gray-100 text-md mt-2 ml-1"
            >
              Admin Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-sm p-2 text-black text-lg outline-none"
            />
            {error && (
              <p className="text-red-300 mt-2 text-center">{error}</p>
            )}
            <input
              type="submit"
              value="Sign Up"
              className="w-full rounded-md bg-orange-600 text-md mt-4 p-2 font-medium tracking-wide cursor-pointer hover:bg-orange-700 transition duration-200"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminSignup;
