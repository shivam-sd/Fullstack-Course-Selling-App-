import React, { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { Link, useSubmit, useNavigate } from "react-router-dom";
import { SiDiscourse } from "react-icons/si";
import { BiSolidPurchaseTag } from "react-icons/bi";
import { IoSettings } from "react-icons/io5";
import { IoMdLogIn } from "react-icons/io";
import { FaCircleUser } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { MdAttachMoney } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";
import { IoMenuSharp } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import axios from "axios";
import { toast, Bounce } from "react-toastify";

const Purchases = () => {
  const icons = [
    {
      name: "Home",
      icon: <FaHome />,
      route: "/",
    },
    {
      name: "Courses",
      icon: <SiDiscourse />,
      route: "/courses",
    },
    {
      name: "Purchases",
      icon: <BiSolidPurchaseTag />,
      route: "/purchases",
    },
    {
      name: "Setting",
      icon: <IoSettings />,
      route: "#",
    },
    // {
    //   name: "Login",
    //   icon: <IoMdLogIn />,
    //   route: "/login",
    // },
  ];

  const [AllPurchases, setAllPurchases] = useState([]);
  const [loader, setloader] = useState(true);

  const token = JSON.parse(localStorage.getItem("token") || "{}");
  // console.log(token);

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_SIGNUP_API}/users/purchased`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const courses = response.data.courseData;
      // console.log(courses);
      setAllPurchases(courses);
      setloader(false);
    };
    fetchCourses();
  }, []);

  const [left, setleft] = useState(false);
  const [menu, setmenu] = useState(true);

  const handleLeftElm = () => {
    setleft(true);
    setmenu(false);
  };

  const handleLeftclose = () => {
    setleft(false);
    setmenu(true);
  };

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_SIGNUP_API}/users/logout`);
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
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="main h-screen flex container mx-auto overflow-y-auto bg-gradient-to-t from-yellow-300 to-blue-500 duration-300 relative">
      {left ? (
        <>
          <div
            className="flex items-center justify-center cursor-pointer lg:hidden block"
            onClick={handleLeftclose}
          >
            <IoCloseSharp className="text-2xl cursor-pointer absolute top-8 left-36 " />
          </div>

          {/* ye wala left chhote device ke liye hai */}

          <div className="left w-48 h-screen lg:bg-slate-500 bg-slate-200 p-5 lg:hidden block duration-300">
            <img
              src="https://courseapp-xi.vercel.app/assets/logo-uOA_Ly3C.webp"
              alt=""
              className="w-14 rounded-full mx-auto mb-5"
            />

            {icons.map((elm, index) => {
              return (
                <>
                  <div
                    className="icon flex items-center  gap-5 font-serif font-extralight text-xl mt-4 mb-3 duration-300"
                    key={index}
                  >
                    {elm.icon}
                    <Link to={elm.route}>
                      <p>{elm.name}</p>
                    </Link>
                  </div>

                  {/* http://localhost:3000/users/logout */}
                </>
              );
            })}
          </div>
        </>
      ) : (
        <>
          <></>
        </>
      )}

      {/* ye wala left large device ke liye hai */}

      <div className="left w-48 h-screen lg:bg-slate-300 p-5 hidden lg:block duration-300">
        <img
          src="https://courseapp-xi.vercel.app/assets/logo-uOA_Ly3C.webp"
          alt=""
          className="w-14 rounded-full mx-auto mb-5"
        />

        {icons.map((elm, index) => {
          return (
            <>
              <div
                className="icon flex items-center  gap-5 font-serif font-extralight text-xl mt-4 mb-3 duration-300"
                key={index}
              >
                {elm.icon}
                <Link to={elm.route}>
                  <p>{elm.name}</p>
                </Link>
              </div>
            </>
          );
        })}

        {/* Add Alag se Logout of user logout */}
        <div
          className="icon flex items-center  gap-5 font-serif font-extralight text-xl mt-4 mb-3 duration-300"
          // key={index}
        >
          {/* {elm.icon} */}
          <button className="flex items-center gap-4">
            <CiLogout />
            <p onClick={handleLogout}>Logout</p>
          </button>
        </div>
      </div>

      {/* right wala div hai jisme saare course hai.. */}

      <div className="right p-4 w-full h-screen duration-300">
        <div className="nav flex items-center justify-between w-full p-2 ">
          {menu ? (
            <>
              <div
                className="flex items-center justify-center cursor-pointer lg:hidden block"
                onClick={handleLeftElm}
              >
                <IoMenuSharp className="text-2xl" />
              </div>
            </>
          ) : (
            <></>
          )}
          <h1 className="text-2xl font-serif font-bold ">My Purchases :-</h1>
          <div className="flex items-center justify-center gap-3 w-auto"></div>
        </div>

        {/* courses */}

{}

        {loader ? (
          <>
            <div className="text-center text-4xl mt-10 font-bold font-serif ">
              Loading...
            </div>
          </>
        ) : (
          <>
            <div className="courses w-full h-auto mt-5 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 pb-20 duration-300">

{/* Agar user ke pass koi course nhi hai to ek message show kar rhe hai. */}

{
  AllPurchases.length > 0 ? (<>
   {AllPurchases.map((elm, index) => {
                return (
                  <>
                    <div
                      className="p-2 lg:w-64 md:w-64 w- border border-red-400 rounded-md mt-2 duration-300 hover:translate-x-1 hover:cursor-po"
                      key={elm.createrId}
                    >
                      <img
                        src={elm.image.url}
                        alt=""
                        className="lg:w-64 object-contain w-full"
                      />
                      <div className="mt-2">
                        <p className="title text-xl text-center font-serif font-bold">
                          "{elm.title}"
                        </p>
                        <span className="des text-sm font-serif text-wrap">
                          {elm.description}.
                        </span>
                        <div className="price-wala flex justify-between">
                          <div className="flex items-center gap-4 mb-4">
                            <p className="price flex items-center text-serif font-bold">
                              <MdAttachMoney />
                              {elm.price}
                            </p>
                            <p className="off text-xl line-through font-serif text-gray-500">
                              5999
                            </p>
                          </div>
                          <span className="text-green-800 font-serif text-lg">
                            20% off
                          </span>
                        </div>
                        <Link
                          to={`/buy/${elm._id}`}
                          className="w-full text-center p-2  bg-orange-500 text-white rounded-md text-lg font-bold cursor-pointer hover:bg-orange-400 duration-300"
                        >
                          Buy Now
                        </Link>
                      </div>
                    </div>
                  </>
                );
              })}
  </>) : (<>
  <h1 className="text-xl text-black text-center">You have no course.</h1>
  </>)
}
             
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Purchases;
