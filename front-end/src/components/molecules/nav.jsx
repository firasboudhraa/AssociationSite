import Link from "next/link";
import HomeIcon from "@mui/icons-material/Home";
import BlogIcon from "@mui/icons-material/Article";
import AboutIcon from "@mui/icons-material/Info";
import ContactIcon from "@mui/icons-material/ContactSupport";
import LoginIcon from "@mui/icons-material/AccountCircle";
import PeopleIcon from '@mui/icons-material/People';
import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          {/* Navbar Brand */}
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 w-10 mr-5">
              <Link href="/">
                <Image
                  src={"/noavatar.png"}
                  alt="Logo"
                  width="100"
                  height="50"
                  className="cursor-pointer rounded-circle "
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
                  href="/membres"
                  className="flex items-center px-3 py-2 text-white"
                >
                  <PeopleIcon className="mr-2" />
                  Membres
                </Link>
                <Link
                  href="/blog"
                  className="flex items-center px-3 py-2 text-white"
                >
                  <BlogIcon className="mr-2" />
                  Blog
                </Link>
                <Link
                  href="/about"
                  className="flex items-center px-3 py-2 text-white"
                >
                  <AboutIcon className="mr-2" />
                  About Us
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

          {/* Login Button */}
          <div className="absolute inset-y-0 right-0 flex items-center sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button className="bg-transparent hover:bg-blue-700 text-white px-4 py-2 rounded-md ml-20">
              <LoginIcon className="mr-2" /> Login
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
