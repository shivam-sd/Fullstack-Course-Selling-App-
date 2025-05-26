import React, { useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import { Link, Route } from "react-router-dom";
import { useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomeHeroSection = () => {
  const [AllCourses, setAllCoureses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_SIGNUP_API}/courses/allcourses`
      );
      const courses = response.data.courses;
      // console.log(courses);
      setAllCoureses(courses);
    };
    fetchCourses();
  }, []);

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay:true,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="main container mx-auto">
      <div className="first text-center lg:p-3 mt-14 mb-6">
        <h1 className="lg:text-5xl font-bold font-serif duration-300 mb-6 text-4xl">
          CourseHaven
        </h1>
        <p className="text-base font-serif tracking-wide text-gray-300">
          Sharpen your skills with courses crafted by experts.
        </p>
        <div className="flex items-center justify-center gap-5 mt-3">
          <Link to="/courses" className="border border-white p-2 rounded-sm mt-3 bg-green-700 text-white hover:bg-white hover:text-black duration-300 text-lg font-serif">
            Explore Courses
          </Link>
          <Link to="/admin/dashboard" className="border-2 border-black p-2 rounded-sm mt-3 bg-white text-black hover:bg-green-700 hover:text-white  duration-300 text-lg font-serif">
            Admin Dashboard
          </Link>
        </div>
      </div>

      <div className="second container mx-auto p-10">
        <Slider className="" {...settings}>
          {AllCourses.map((course) => (
            <div key={course._id} className="p-4">
              <div className="relative flex-shrink-0 w-92 transition-transform duration-300 transform hover:scale-105">
                <div className="bg-gray-900 rounded-lg overflow-hidden">
                  <img
                    className="h-32 w-full object-contain"
                    src={course.image.url}
                    alt=""
                  />
                  <div className="p-6 text-center">
                    <h2 className="text-xl mb-4 font-bold text-white">
                      {course.title}
                    </h2>
                    <Link
                      to={`/buy/${course._id}`}
                      className="mt-8 bg-orange-500 text-white py-2 px-4 rounded-full hover:bg-blue-500 duration-300"
                    >
                      Enroll Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default HomeHeroSection;

{
  /* <div className="relative">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdr2ifMgKeSovysPNITLTZaDGDCdRLVUcrlg&s"
                className="w-80"
                alt=""
              />
              <h1 className="absolute top-36 left-32 text-xl font-serif ">
                Name
              </h1>
              <button className="absolute top-44 left-24 font-serif text-xl bg-green-600 p-1 cursor-pointer rounded-sm">
                Enroll Now
              </button>
            </div> */
}
