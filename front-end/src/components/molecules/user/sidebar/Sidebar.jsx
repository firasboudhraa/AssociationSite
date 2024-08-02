"use client"
import React from "react";
import { useRouter } from "next/navigation";
import styles from "@/styles/sidebar.module.css";
import MenuLink from "@/components/molecules/dashboard/sidebar/menuLink/menuLink";
import {
  MdDashboard,
  MdAccountBox,
  MdDescription,
  MdAccountBalance,
  MdAttachMoney,
  MdLock,
  MdLogout,
} from "react-icons/md";

const menuItems = [
  {
    title: "Tableau de bord",
    path: "/User",
    icon: <MdDashboard className={styles.icon} />,
  },
  {
    title: "Mes informations",
    path: "/User/mes-informations",
    icon: <MdAccountBox className={styles.icon} />,
  },
  {
    title: "Mes documents",
    path: "/User/mes-documents",
    icon: <MdDescription className={styles.icon} />,
  },
  {
    title: "Coordonnées bancaires",
    path: "/User/coordonnees-bancaires",
    icon: <MdAccountBalance className={styles.icon} />,
  },
  {
    title: "Mes participations",
    path: "/User/mes-participations",
    icon: <MdAttachMoney className={styles.icon} />,
  },
  {
    title: "Mot de passe",
    path: "/User/mot-de-passe",
    icon: <MdLock className={styles.icon} />,
  },
];

const Sidebar = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    router.push('/');
  };

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {menuItems.map((item) => (
          <MenuLink item={item} key={item.title} />
        ))}
      </ul>
      <button className={styles.logout} onClick={handleLogout}>
        <MdLogout />
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
