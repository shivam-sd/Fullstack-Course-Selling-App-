import React from "react";
import { Link } from "react-router-dom";

const SignupHead = () => {
  return (
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
      <div>
        <Link
          to="/"
          className="lg:text-xl lg:border lg:border-white lg:rounded-sm lg:p-1 lg:cursor-pointer lg:font-serif lg:w-24 hover:bg-slate-200 hover:text-black duration-300 hover:border-black hover:border-2   text-xl border border-white rounded-sm p-1 cursor-pointer font-serif w-20 text-center text-white"
        >
          Home
        </Link>
      </div>
    </div>
  );
};

export default SignupHead;
