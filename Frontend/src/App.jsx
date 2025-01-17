import React from 'react'
import {Routes , Route} from "react-router-dom";
import Home from "./Components/Home";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import {ToastContainer} from "react-toastify";

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
