import React from "react";
import Navb from "../components/molecules/nav";
import 'bootstrap/dist/css/bootstrap.min.css';
import "@/styles/globals.css";

export default function Home() {
  return (
    <>
      <Navb />
      <br /><br />
      <div className='bg-gray-100 min-h-screen w-full flex items-center justify-center'>
        <div className='bg-white rounded-2xl shadow-2xl flex w-4/5 max-w-4xl h-full'>
          {/* Left Section - Video */}
          <div className='w-3/5 relative'>
          <iframe src="https://assets.pinterest.com/ext/embed.html?id=259379259782315480" height="888" width="450" frameBorder="0" scrolling="no" ></iframe>
            <video
              className="w-full h-full object-cover rounded-tl-2xl rounded-bl-2xl"
              src="/assets/images/GrowUp.mp4"
              autoPlay
              loop
              muted
            />
          </div>
          {/* Right Section - Description */}
          <div className='w-2/5 bg-black text-white rounded-tr-2xl rounded-br-2xl py-10 px-8'>
            <h2 className="text-3xl font-bold mb-2 mt-12">About Our Agency</h2>
            <div className="border-2 w-10 border-white inline-block mb-2"></div>
            <p className="mb-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget interdum nisi. Mauris semper eros et ligula ultricies, vitae suscipit nunc sollicitudin. Proin tincidunt risus nec dolor vestibulum eleifend. Nullam ac sodales odio.</p>
            <p className="mb-6">Nulla facilisi. Duis eget felis ac libero imperdiet blandit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec at ante arcu.</p>
            <a href="#" className="border-2 border-white rounded-full px-8 py-2 inline-block font-semibold hover:bg-white hover:text-green-500">
              Discover More
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
