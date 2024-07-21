import React from "react";
import Navbar from "../components/molecules/nav";
import 'bootstrap/dist/css/bootstrap.min.css';
import "@/styles/globals.css";
import Footer from "@/components/molecules/Footer";
import Hero from '@/components/organisims/hero/Hero'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar/>
      <Hero/>
      <Footer />
    </div>
  );
}
