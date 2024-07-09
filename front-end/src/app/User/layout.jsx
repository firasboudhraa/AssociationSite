import React from 'react';
import Navbar from '../../components/molecules/nav';
import Sidebar from '../../components/molecules/user/sidebar/Sidebar';
import Footer from '../../components/molecules/Footer';
import styles from '@/styles/layoutUser.module.css'; 

const Layout = ({ children }) => {
  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.main}>
        <Sidebar />
        <div className={styles.content}>
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
