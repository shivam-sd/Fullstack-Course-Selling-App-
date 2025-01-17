import React from "react";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

const HomeFooter = () => {
  return (
    <>
      <div className="main grid lg:grid-cols-3 sm:grid-cols-1 container mx-auto text-center p-3 pb-14">
        <div className="first">
          <div className="lg:flex lg:items-center lg:justify-center lg:gap-3 flex items-center justify-center gap-3">
            <img
              src="https://courseapp-xi.vercel.app/assets/logo-uOA_Ly3C.webp"
              className="lg:w-10 lg:rounded-full w-9 rounded-full"
              alt="Logo"
            />
            <h1 className="lg:text-4xl lg:text-orange-500 lg:font-serif text-4xl text-orange-500 font-serif">
              CourseHaven
            </h1>
          </div>

          <div className="follow-social">
            <h1 className="font-bold font-serif text-lg mt-2">Follow us</h1>
            <div className="icon flex items-center justify-center gap-6 mt-3 mb-4">
              <FaLinkedin className="text-2xl hover:text-blue-600 duration-300" />
              <FaGithub className="text-2xl hover:text-gray-500" />
              <FaInstagram className="text-2xl hover:text-pink-600" />
              <FaFacebook className="text-2xl hover:text-blue-500" />
            </div>
          </div>
        </div>

        <div className="second p-2 lg:mt-0 mt-3">
            <h1 className="lg:text-2xl text-white font-serif text-4xl">Connects</h1>
            <p className="text-gray-400 font-serif hover:text-white duration-300 cursor-pointer underline mt-1">Youtube- shivamthefunvlogs</p>
            <p className="text-gray-400 font-serif hover:text-white duration-300 cursor-pointer underline mt-1">Github- shivam-sd</p>
            <p className="text-gray-400 font-serif hover:text-white duration-300 cursor-pointer underline mt-1">Instagram- mr.shivam__06</p>
        </div>
        <div className="third p-2 lg:mt-0 mt-3">

        <h1 className="lg:text-2xl text-white font-serif text-4xl">copyrights © 2024</h1>
            <p className="text-gray-400 font-serif hover:text-white duration-300 cursor-pointer underline mt-1">Terms & Conditions</p>
            <p className="text-gray-400 font-serif hover:text-white duration-300 cursor-pointer underline mt-1">Privacy Policy</p>
            <p className="text-gray-400 font-serif hover:text-white duration-300 cursor-pointer underline mt-1">Refund & Cancellation</p>

        </div>
      </div>
    </>
  );
};

export default HomeFooter;
