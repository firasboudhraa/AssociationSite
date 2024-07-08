import Link from 'next/link';
import HomeIcon from '@mui/icons-material/Home';
import BlogIcon from '@mui/icons-material/Article';
import AboutIcon from '@mui/icons-material/Info';
import ContactIcon from '@mui/icons-material/ContactSupport';
import LoginIcon from '@mui/icons-material/AccountCircle'; // Import Login icon

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          {/* Navbar Brand */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          {/* Navbar Brand */}
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0">
              <span className="font-bold text-xl">Your Logo</span>
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                {/* Nav Links */}
                <Link href="/" className="flex items-center px-3 py-2 text-white">
                  <HomeIcon className="mr-2" />
                  Home
                </Link>
                <Link href="/blog" className="flex items-center px-3 py-2 text-white">
                  <BlogIcon className="mr-2" />
                  Blog
                </Link>
                <Link href="/about" className="flex items-center px-3 py-2 text-white">
                  <AboutIcon className="mr-2" />
                  About Us
                </Link>
                <Link href="/contact" className="flex items-center px-3 py-2 text-white">
                  <ContactIcon className="mr-2" />
                  Contact
                </Link>
              </div>
            </div>
          </div>

          {/* Login Button */}
          <div className="absolute inset-y-0 right-0 flex items-center sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
            <LoginIcon className="mr-2" /> Login
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
