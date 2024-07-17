import React from "react";
import { MdLockOutline } from "react-icons/md";
import { useRouter } from "next/navigation";
import { FaFacebookF, FaLinkedinIn, FaGoogle, FaRegEnvelope } from 'react-icons/fa';

import CircularProgress from "@mui/material/CircularProgress";
import useSignInStore from "@/stores/signInStore";

const SignInForm = ({ setIsSignIn }) => {
  const router = useRouter();
  const {
    handleChangeEmail,
    handleChangePassword,
    handleClickSignIn,
    handleClickForgetPass,
    loading,
  } = useSignInStore();

  const handleSignIn = () => {
    handleClickSignIn(router);
  };

  return (
    <div className="bg-gray-100">
      <div className="bg-[var(--bgSoft)] rounded-2xl shadow-2xl flex w-3/3 max-w-4xl justify-center">
        <div className="w-3/5 p-5">
          <div className="py-10">
            <h2 className="text-3xl font-bold text-green-500 mb-2">
              Sign in to Account
            </h2>
            <div className="border-2 w-10 border-green-500 inline-block mb-2"></div>
            <div className="flex justify-center my-2">
              {/* Social media icons */}
              <a href="#" className="border-2 border-gray-300 rounded-full p-3 mx-1">
                <FaFacebookF className="text-sm" />
              </a>
              <a href="#" className="border-2 border-gray-300 rounded-full p-3 mx-1">
                <FaLinkedinIn className="text-sm" />
              </a>
              <a href="#" className="border-2 border-gray-300 rounded-full p-3 mx-1">
                <FaGoogle className="text-sm" />
              </a>
            </div>
            <p className="text-gray-400 my-3">or use your email account</p>
            <div className="flex flex-col items-center">
              <div className="bg-gray-100 w-64 p-2 flex items-center mb-2">
                <FaRegEnvelope className="text-gray-400 m-2" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="bg-gray-100 outline-none text-sm flex-1"
                  onChange={(e) => handleChangeEmail(e.target.value)}
                />
              </div>
              <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                <MdLockOutline className="text-gray-400 m-2" />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="bg-gray-100 outline-none text-sm flex-1"
                  onChange={(e) => handleChangePassword(e.target.value)}
                />
              </div>
              <div className="flex justify-between w-64 mb-5">
                <label className="flex items-center text-xs">
                  <input type="checkbox" name="remember" className="mr-1" />{" "}
                  Remember Me
                </label>
                <a
                  className="text-xs hover:to-blue-500 hover:text-blue-500"
                  onClick={handleClickForgetPass}
                  disabled={loading}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Forget password"
                  )}
                </a>
              </div>
              <button
                className="border-2 border-green-500 text-green-500 rounded-full px-12 py-2 inline-block font-semibold hover:bg-green-500 hover:text-white"
                onClick={handleSignIn}
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Sign In"
                )}
              </button>
            </div>
          </div>
        </div>
        <div className="w-2/5 bg-green-500 text-white rounded-tr-2xl rounded-br-2xl py-36 px-12">
          <h2 className="text-3xl font-bold mb-2">Hello, Friend!</h2>
          <div className="border-2 w-10 border-white inline-block mb-2"></div>
          <p className="mb-10">
            Fill up personal information and start journey with us.
          </p>
          <button
            className="border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-green-500"
            onClick={() => setIsSignIn(false)}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
