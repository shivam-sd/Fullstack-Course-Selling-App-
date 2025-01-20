import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, Bounce } from "react-toastify";
// import { Link } from "react-router-dom";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [LoginData, setLoginData] = useState([]);
  const [error, seterror] = useState();
  const [isLoggedin, setisLoggedin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("user");
    if (token) {
      // console.log(token)
      setisLoggedin(true);
    } else {
      setisLoggedin(false);
    }
  }, []);

  const handleSignupData = async (e) => {
    e.preventDefault();

    try {
      setLoginData({
        email: email,
        password: password,
      });

      console.log(LoginData);

      const response = await axios.post(
        `http://localhost:3000/users/login`,
        LoginData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;
      console.log(response);
     localStorage.setItem("user", JSON.stringify(response.data.token));
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

  const handleLogout = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/users/logout`);
      console.log(response);
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
      setisLoggedin(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-gradient-to-r from-black to-blue-900 h-screen">
      {/* navbar */}

      <div className="main lg:flex lg:items-center lg:justify-between lg:container lg:mx-auto lg:p-5 flex items-center justify-between p-3 pt-5">
        <div className="left lg:flex lg:items-center lg:justify-center lg:gap-3 flex items-center justify-center gap-3">
          <img
            src="https://courseapp-xi.vercel.app/assets/logo-uOA_Ly3C.webp"
            className="lg:w-12 lg:rounded-full w-9 rounded-full"
            alt="Logo"
          />
          <h1 className="lg:text-3xl lg:text-orange-500 lg:font-serif text-2xl text-orange-500 font-serif">
            CourseHaven
          </h1>
        </div>

        <div className="right lg:flex lg:items-center lg:justify-center lg:gap-6 flex justify-center items-center gap-5">
          {isLoggedin ? (
            <>
              <button
                onClick={handleLogout}
                className="lg:text-xl lg:border lg:border-white lg:rounded-sm lg:p-1 lg:cursor-pointer lg:font-serif lg:w-24 hover:bg-slate-200 duration-300 hover:text-black duration-300 hover:border-black hover:border-2 duration-500  text-xl border border-white rounded-sm p-1 cursor-pointer font-serif w-20 text-center text-white"
              >
                Logout
              </button>

              <button className="lg:text-md md:text-sm lg:border lg:border-white lg:rounded-sm lg:p-1 lg:cursor-pointer lg:font-serif lg:w-auto hover:bg-slate-200 duration-300 hover:text-black duration-300 hover:border-black hover:border-2 duration-300 text-xl border border-white rounded-sm p-1 cursor-pointer font-serif w-16 text-center text-white bg-orange-500">
                Join now
              </button>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>

      {/* end navbar */}

      <div className="lg:mt-16 container mx-auto p-1 flex items-center justify-center mt-14 ">
        <div className="form-main border border-yellow-500 p-4 w-auto rounded-md bg-gradient-to-tr from-yellow-900 to-blue-950">
          <h1 className="text-xl text-center font-bold duration-300 text-white">
            Welcome to{" "}
            <span className="text-orange-500 font-serif">CourseHaven</span>
          </h1>
          <p className="text-sm text-gray-300 mt-1 text-center font-serif tracking-wide">
            Login to access paid courses.
          </p>
          <form onSubmit={handleSignupData} className="flex flex-col">
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
              value="Login"
              className="w-72 rounded-md bg-orange-600 text-md mt-2 p-1 font-medium tracking-wide cursor-pointer"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
