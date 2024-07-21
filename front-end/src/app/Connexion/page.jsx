import React from 'react';
import Navbar from '@/components/molecules/nav';
import Auth from '@/components/organisims/signUpIn/auth';
import 'bootstrap/dist/css/bootstrap.min.css';
import "@/styles/globals.css";
import Footer from "@/components/molecules/Footer";



const Connexion = () => {
  return (
    <div>
      <Navbar/>
      <br /><br /><br />
      <Auth/>
      <Footer/>
    </div>
  );
};

export default Connexion;