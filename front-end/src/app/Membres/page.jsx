import React from "react";
import ProfileCard from "../../components/molecules/profile-cards/ProfileCard";
import Navbar from "@/components/molecules/nav";
import Footer from "@/components/molecules/Footer";
import styles from '../../styles/profileCard.module.css'; 

const MembersPage = () => {
  return (
    <div>
      <Navbar />
      <div className={styles.profileGridWrapper}>
        <ProfileCard />
      </div>
      <Footer />
    </div>
  );
};

export default MembersPage;
