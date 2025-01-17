import React from 'react';
import HomeHeader from './HomeHeader';
import HomeHeroSection from './HomeHeroSection';
import HomeFooter from './HomeFooter';

const Home = () => {
  return (
    <div className='h-auto text-white bg-gradient-to-r from-black to-blue-950  '>
      <HomeHeader />
      <HomeHeroSection />
      <hr className='text-white mb-5 mt-5 container mx-auto' />
      <HomeFooter />
    </div>
  )
}

export default Home
