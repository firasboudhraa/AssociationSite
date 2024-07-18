import React from "react";
import ProfileCard from "../../components/molecules/profile-cards/ProfileCard";
import Navbar from "@/components/molecules/nav";
import Footer from "@/components/molecules/Footer";

const MembersPage = () => {
  return (
    <div>
      <Navbar />

      <ProfileCard />
      <Footer />
    </div>
  );
};

export default MembersPage;
