import React from 'react';
import { FaFacebookF, FaGoogle , FaRegEnvelope  } from 'react-icons/fa';
import { MdLockOutline, MdPersonOutline } from 'react-icons/md';
import CircularProgress from "@mui/material/CircularProgress"; 
import useSignUpStore from "@/stores/signUpStore"; 
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const SignUpForm = ({ setIsSignIn }) => {
  const router = useRouter();
  const { handleChange, handleClickSignUp, loading } = useSignUpStore();

  const handleSignUp = () => {
    handleClickSignUp(router);
  };

  const handleGoogleSignUp = () => {
    signIn("google", { callbackUrl: "/" });
  };

  const handleFacebookSignUp = () => {
    signIn("facebook", { callbackUrl: "/" });
  };

  return (
    <div className='bg-gray-100'>
      <div className='bg-[var(--bgSoft)] rounded-2xl shadow-2xl flex w-full max-w-4xl justify-center'>
        <div className='w-2/5 bg-green-500 text-gray-700 rounded-tl-2xl rounded-bl-2xl py-36 px-12'>
          <h2 className="text-3xl font-bold mb-2">Welcome Back!</h2>
          <div className="border-2 w-10 border-white inline-block mb-2"></div>
          <p className="mb-10">To keep connected with us please login with your personal info.</p>
          <a href="#" className="border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-green-500" onClick={() => setIsSignIn(true)}>
            Sign In
          </a>
        </div>
        <div className='w-3/5 p-5'>
          <div className="py-10">
            <h2 className="text-3xl font-bold text-green-500 mb-2">Create Account</h2>
            <div className="border-2 w-10 border-green-500 inline-block mb-2"></div>
            <div className="flex justify-center my-2">
              <button
                className="border-2 border-gray-300 rounded-full p-3 mx-1"
                onClick={handleFacebookSignUp}
              >
                <FaFacebookF className="text-sm" />
              </button>
              <button
                className="border-2 border-gray-300 rounded-full p-3 mx-1"
                onClick={handleGoogleSignUp}
              >
                <FaGoogle className="text-sm" />
              </button>
            </div>
            <p className="text-gray-400 my-3">or use your email for registration</p>
            <div className="flex flex-col items-center">
              <div className="bg-gray-100 w-64 p-2 flex items-center mb-2">
                <MdPersonOutline className="text-gray-400 m-2" />
                <input type="text" name="name" placeholder="Name" className="bg-gray-100 outline-none text-sm flex-1" onChange={(e) => handleChange("name", e.target.value)} />
              </div>
              <div className="bg-gray-100 w-64 p-2 flex items-center mb-2">
                <FaRegEnvelope className="text-gray-400 m-2" />
                <input type="email" name="email" placeholder="Email" className="bg-gray-100 outline-none text-sm flex-1" onChange={(e) => handleChange("email", e.target.value)} />
              </div>
              <div className="bg-gray-100 w-64 p-2 flex items-center mb-2">
                <MdLockOutline className="text-gray-400 m-2" />
                <input type="password" name="password" placeholder="Password" className="bg-gray-100 outline-none text-sm flex-1" onChange={(e) => handleChange("password", e.target.value)} />
              </div>
              <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                <MdLockOutline className="text-gray-400 m-2" />
                <input type="password" name="Confirmpassword" placeholder="Confirm Password" className="bg-gray-100 outline-none text-sm flex-1" />
              </div>
              <button
                className="border-2 border-green-500 text-green-500 rounded-full px-12 py-2 inline-block font-semibold hover:bg-green-500 hover:text-white"
                onClick={handleSignUp}
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Sign Up"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
