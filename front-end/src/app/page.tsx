import React from "react";
import Navb from "../components/molecules/nav";
import 'bootstrap/dist/css/bootstrap.min.css';
import "@/styles/globals.css";
import Footer from "@/components/molecules/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navb />
      
      <div className="flex-1">
        {/* Your main content goes here */}
        <h1>Welcome to My Website</h1>
        <p>This is the main content area.</p>
      </div>
      
      <Footer />
    </div>
  );
}
