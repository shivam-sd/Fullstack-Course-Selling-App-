import React, { useState } from "react";
import HomeHeader from "../Components/HomeHeader";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";

const Signup = () => {
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [signupData, setsignupData] = useState([]);
  const [error , seterror] = useState();

  const handleSignupData = async (e) => {
    e.preventDefault();

    try {
      setsignupData({
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
      });

      console.log(signupData);

      const response = await axios.post(
        `http://localhost:3000/users/signup`,
        signupData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;
      console.log(response);
      localStorage.setItem("user", JSON.stringify(response.data.token))
      toast.success(`${response.data.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } catch (error) {
      console.log(error);
      if (error.response.data.errors) {
        seterror(error.response.data.errors);
      }
      if (error.response.data.errors[0].msg) {
        seterror(error.response.data.errors[0].msg);
      }
    }
  };

  return (
    <div className="bg-gradient-to-r from-black to-blue-900 h-screen">
      <HomeHeader />
      <div className="lg:mt-7 container mx-auto p-1 flex items-center justify-center mt-8 ">
        <div className="form-main border border-yellow-500 p-4 w-auto rounded-md bg-gradient-to-tr from-yellow-900 to-blue-950">
          <h1 className="text-xl text-center font-bold duration-300 text-white">
            Welcome to{" "}
            <span className="text-orange-500 font-serif">CourseHaven</span>
          </h1>
          <p className="text-sm text-gray-300 mt-1 text-center font-serif tracking-wide">
            just signup to join us.
          </p>
          <form onSubmit={handleSignupData} className="flex flex-col">
            <label
              htmlFor="firstname"
              className="text-gray-100 text-md mt-2 ml-1"
            >
              Firstname
            </label>
            <input
              type="text"
              id="firstname"
              placeholder="FirstName"
              value={firstname}
              onChange={(e) => setfirstname(e.target.value)}
              className="w-72 rounded-sm p-1 text-black text-lg outline-none"
            />
            <label
              htmlFor="lastname"
              className="text-gray-100 text-md mt-2 ml-1"
            >
              Lastname
            </label>
            <input
              type="text"
              id="lastname"
              placeholder="LastName"
              value={lastname}
              onChange={(e) => setlastname(e.target.value)}
              className="w-72 rounded-sm p-1 text-black text-lg outline-none"
            />
            <label htmlFor="email" className="text-gray-100 text-md mt-2 ml-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              className="w-72 rounded-sm p-1 text-black text-lg outline-none"
            />
            <label
              htmlFor="password"
              className="text-gray-100 text-md mt-2 ml-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="********"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              className="w-72 rounded-sm p-1 text-black text-lg outline-none"
            />
            <p className="text-red-300 mt-1 text-center">{error}</p>
            <input
              type="submit"
              value="Signup"
              className="w-72 rounded-md bg-orange-600 text-md mt-2 p-1 font-medium tracking-wide cursor-pointer"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
