import React from 'react';
import Navbar from "@/components/molecules/dashboard/navbar/navbar";
import Sidebar from "@/components/molecules/dashboard/sidebar/sidebar";
import Footer from "@/components/molecules/dashboard/footer/Footer";
import styles from "../../styles/dashbord.module.css";

const Layout = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <Sidebar />
      </div>
      <div className={styles.content}>
        <Navbar />
        <div className={styles.childrenWrapper}>
          {children}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
