"use client"
import { useState, useEffect } from "react";
import Link from "next/link";
import HomeIcon from "@mui/icons-material/Home";
import BlogIcon from "@mui/icons-material/Article";
import EventIcon from '@mui/icons-material/Event';
import ContactIcon from "@mui/icons-material/ContactSupport";
import LoginIcon from "@mui/icons-material/AccountCircle";
import PeopleIcon from '@mui/icons-material/People';
import Image from "next/image";

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
    <nav className=" text-white flex top-0 left-0 w-full bg-cover bg-center  items-center space-between z-10">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          {/* Navbar Brand */}
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 w-10 mr-5">
              <Link href="/">
                <Image
                    src={"/noavatar.png"}
                    alt="User Photo"
                    width="40"
                    height="40"
                    className="rounded-full cursor-pointer"
                    priority
                />
              </Link>
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                {/* Nav Links */}
                <Link
                  href="/"
                  className="flex items-center px-3 py-2 text-white"
                >
                  <HomeIcon className="mr-2" />
                  Home
                </Link>
                <Link
                  href="/Membres"
                  className="flex items-center px-3 py-2 text-white"
                >
                  <PeopleIcon className="mr-2" />
                  Membres
                </Link>
                <Link
                  href="/Event"
                  className="flex items-center px-3 py-2 text-white"
                >
                  <EventIcon className="mr-2" />
                  Events
                </Link>
                <Link
                  href="/blog"
                  className="flex items-center px-3 py-2 text-white"
                >
                  <BlogIcon className="mr-2" />
                  Blog
                </Link>
                <Link
                  href="/Contact"
                  className="flex items-center px-3 py-2 text-white"
                >
                  <ContactIcon className="mr-2" />
                  Contact
                </Link>
              </div>
            </div>
          </div>

          {/* Conditional Render for Login or User Dropdown */}
          <div className="absolute inset-y-0 right-0 flex items-center sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {authenticated ? (
              <div className="relative">
                <button className="bg-transparent text-white px-4 py-2 rounded-md ml-20">
                  <Image
                    src={ "/noavatar.png"}
                    alt="User Photo"
                    width="40"
                    height="40"
                    className="rounded-full cursor-pointer"
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
                <button className="bg-transparent hover:bg-blue-700 text-white px-4 py-2 rounded-md ml-20">
                  <LoginIcon className="mr-2" /> Login
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
