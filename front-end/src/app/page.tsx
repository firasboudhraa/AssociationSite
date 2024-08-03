import React from "react";
import Navbar from "../components/molecules/nav";
import 'bootstrap/dist/css/bootstrap.min.css';
import "@/styles/globals.css";
import Footer from "@/components/molecules/Footer";
import Hero from '@/components/organisims/hero/Hero'
import Testimonials from '@/components/organisims/testimonials/Testimonials'
import Review from '@/components/organisims/review/Review'
import Presentaion from '@/components/organisims/presentation/Presentation'
import SuccessSection from '@/components/organisims/success/Success'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar/>
      <Hero/>
      <Presentaion/>
      <Testimonials />
      <SuccessSection />
      <Review />
      <Footer />
    </div>
  );
}
