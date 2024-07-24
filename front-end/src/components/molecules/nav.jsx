"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import HomeIcon from "@mui/icons-material/Home";
import BlogIcon from "@mui/icons-material/Article";
import EventIcon from '@mui/icons-material/Event';
import ContactIcon from "@mui/icons-material/ContactSupport";
import PeopleIcon from '@mui/icons-material/People';
import Image from "next/image";
import MyBtn from '@/components/molecules/button/MyButton';

const Navbar = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setAuthenticated(true);
    } else {
      setUser(null);
      setAuthenticated(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    setAuthenticated(false);
  };

  return (
    <nav className="text-white  flex items-center w-full px-4 py-2 z-10">
      <div className="max-w-7xl mx-auto flex w-full items-center justify-between">
        {/* Navbar Brand */}
        <div className="flex items-center">
          <Link href="/">
            <Image
              src={'/logo.jpg'}
              alt="Logo"
              width="50"
              height="80"
              className="rounded-full cursor-pointer"
              priority
            />
          </Link>
        </div>
        
        {/* Nav Links */}
        <div className="hidden sm:flex space-x-4">
          {/* Nav Item */}
          <div className="relative group">
            <Link
              href="/"
              className="flex items-center px-3 py-2 text-white hover:text-yellow-400 relative"
            >
              <HomeIcon className="mr-2" />
              Home
            </Link>
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></div>
          </div>
          
          <div className="relative group">
            <Link
              href="/Membres"
              className="flex items-center px-3 py-2 text-white hover:text-yellow-400 relative"
            >
              <PeopleIcon className="mr-2" />
              Membres
            </Link>
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></div>
          </div>
          
          <div className="relative group">
            <Link
              href="/Event"
              className="flex items-center px-3 py-2 text-white hover:text-yellow-400 relative"
            >
              <EventIcon className="mr-2" />
              Events
            </Link>
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></div>
          </div>
          
          <div className="relative group">
            <Link
              href="/blog"
              className="flex items-center px-3 py-2 text-white hover:text-yellow-400 relative"
            >
              <BlogIcon className="mr-2" />
              Blog
            </Link>
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></div>
          </div>
          
          <div className="relative group">
            <Link
              href="/Contact"
              className="flex items-center px-3 py-2 text-white hover:text-yellow-400 relative"
            >
              <ContactIcon className="mr-2" />
              Contact
            </Link>
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></div>
          </div>
        </div>

        {/* Conditional Render for Login or User Dropdown */}
        <div className="flex items-center">
          {authenticated ? (
            <div className="relative">
              <button className="bg-transparent text-white px-4 py-2 rounded-md">
                <Image
                  src={"/noavatar.png"}
                  alt="User Photo"
                  width="40"
                  height="40"
                  className="rounded-full cursor-pointer filter grayscale hover:grayscale-0"
                  priority
                />
              </button>
              <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                {/* Dropdown content */}
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                  <Link href="/Profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    role="menuitem"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Link href="/Connexion">
              <MyBtn textContent="Connexion" />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
