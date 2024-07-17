import React from "react";
import Navbar from "../components/molecules/nav";
import 'bootstrap/dist/css/bootstrap.min.css';
import "@/styles/globals.css";
import Footer from "@/components/molecules/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <Footer />
    </div>
  );
}
