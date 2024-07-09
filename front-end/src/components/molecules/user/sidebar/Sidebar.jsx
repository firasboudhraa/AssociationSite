import React from 'react';
import styles from '@/styles/sidebar.module.css';
import Image from 'next/image';
import MenuLink from '@/components/molecules/dashboard/sidebar/menuLink/menuLink';
import {
  MdDashboard,
  MdFormatListBulleted,
  MdAccountBox,
  MdDescription,
  MdAccountBalance,
  MdAttachMoney,
  MdGroup,
  MdLock,
  MdLogout,
} from 'react-icons/md';

const menuItems = [
  {
    title: 'Tableau de bord',
    path: '/User',
    icon: <MdDashboard className={styles.icon} />,
  },
  {
    title: 'Mes informations',
    path: '/User/mes-informations',
    icon: <MdAccountBox className={styles.icon} />,
  },
  {
    title: 'Mes documents',
    path: '/User/mes-documents',
    icon: <MdDescription className={styles.icon} />,
  },
  {
    title: 'Coordonnées bancaires',
    path: '/User/coordonnees-bancaires',
    icon: <MdAccountBalance className={styles.icon} />,
  },
  {
    title: 'Mes virements',
    path: '/User/mes-virements',
    icon: <MdAttachMoney className={styles.icon} />,
  },
  {
    title: 'Mes participations',
    path: '/User/mes-participations',
    icon: <MdGroup className={styles.icon} />,
  },
  {
    title: 'Mot de passe',
    path: '/User/mot-de-passe',
    icon: <MdLock className={styles.icon} />,
  },
];

const Sidebar = () => {
  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {menuItems.map(item => (
          <MenuLink item={item} key={item.title} />
        ))}
      </ul>
      <button className={styles.logout}>
        <MdLogout />
        Logout
      </button>
    </div>
  );
}

export default Sidebar;
