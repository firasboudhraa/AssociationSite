"use client";

import React from 'react';
import Link from 'next/link'; // Import Link from next/link


const Hero = () => {
  return (
    <div className="hero relative bg-cover bg-center h-screen flex items-center justify-center " style={{ backgroundImage: "linear-gradient(rgba(8,0,5,0.7), rgba(0,0,58,0.7)), url('/hero.jpg')" }}>
      <div className="overlay absolute inset-0 bg-black opacity-50"></div>
      <div className="container relative text-center text-white z-10">
        <div className="content">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Change the way you build websites With our Association</h1>
          <p className="text-lg md:text-2xl mb-8">Build a Beautiful, Clean & Modern Design website.</p>
          <div className="buttons flex justify-center space-x-4">
          <Link href="/" className="learn-more bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
              <span className="text-lg md:text-2xl font-bold">Learn More</span>
            </Link>
            <Link href="/Connexion" className="get-started bg-white text-blue-600 py-2 px-4 rounded-md hover:bg-gray-200">
            <span className="text-lg md:text-2xl font-bold">Get Started</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
