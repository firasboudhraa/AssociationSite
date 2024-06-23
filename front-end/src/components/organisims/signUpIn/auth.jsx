"use client";
import React, { useState } from 'react';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

const Auth = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <div className='flex flex-col items-center justify-center w-full flex-1 px-20 text-center'>
      {isSignIn ? (
        <SignInForm setIsSignIn={setIsSignIn} />
      ) : (
        <SignUpForm setIsSignIn={setIsSignIn} />
      )}
    </div>
  );
}

export default Auth;
