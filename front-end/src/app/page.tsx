import React from "react";
import Navbar from "../components/molecules/nav";
import 'bootstrap/dist/css/bootstrap.min.css';
import "@/styles/globals.css";
import Footer from "@/components/molecules/Footer";
import Hero from '@/components/organisims/hero/Hero'
import Testimonials from '@/components/organisims/testimonials/Testimonials'
import Review from '@/components/organisims/review/Review'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar/>
      <Hero/>
      <Testimonials />
      <Review />
      <Footer />
    </div>
  );
}
