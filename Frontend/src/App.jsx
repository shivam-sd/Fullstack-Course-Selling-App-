import React from 'react'
import {Routes , Route} from "react-router-dom";
import Home from "./Components/Home";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import {ToastContainer} from "react-toastify";
import Courses from './Components/Courses';
import BuyCourse from './Components/BuyCourse';
import Purchases from './Components/Purchases';

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/courses' element={<Courses />} />
        <Route path='/buy/:courseId' element={<BuyCourse />} />
        <Route path='/purchases' element={<Purchases />} />
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
