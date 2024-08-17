"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/styles/sidebar.module.css';
import Image from 'next/image';
import MenuLink from '@/components/molecules/dashboard/sidebar/menuLink/menuLink';
import {
  MdDashboard,
  MdSupervisedUserCircle,
  MdShoppingBag,
  MdAccountCircle,
  MdStar,
  MdAnalytics,
  MdPeople,
  MdLogout,
} from 'react-icons/md';

const menuItems = [
  {
    title: "Pages",
    list: [
      {
        title: "Dashboard",
        path: "/Dashboard",
        icon: <MdDashboard className={styles.menuLinkIcon} />,
      },
      {
        title: "Users",
        path: "/Dashboard/users",
        icon: <MdSupervisedUserCircle className={styles.menuLinkIcon} />,
      },
      {
        title: "Events",
        path: "/Dashboard/events",
        icon: <MdShoppingBag className={styles.menuLinkIcon} />,
      },
    ],
  },
  {
    title: "Analytics",
    list: [
      {
        title: "Reviews",
        path: "/Dashboard/reviews",
        icon: <MdStar className={styles.menuLinkIcon} />,
      },
      {
        title: "Gallery",
        path: "/Dashboard/gallery",
        icon: <MdAnalytics className={styles.menuLinkIcon} />,
      },
      {
        title: "Teams",
        path: "/Dashboard/teams",
        icon: <MdPeople className={styles.menuLinkIcon} />,
      },
    ],
  },
  {
    title: "User",
    list: [
      {
        title: "Account",
        path: "/Dashboard/account",
        icon: <MdAccountCircle className={styles.menuLinkIcon} />,
      },
    ],
  },
  {
    title: "Event Management",
    list: [
      {
        title: "Participants",
        path: "/Dashboard/participants",
        icon: <MdPeople className={styles.menuLinkIcon} />,
      },
    ],
  },
];

const Sidebar = () => {
  const [user, setUser] = useState({ name: '', role: '', photo: '/noavatar.png' });
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    router.push('/');
  };

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser({
        name: parsedUser.name || 'Unknown User',
        photo: parsedUser.photo || '/noavatar.png',
      });
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <Image className={styles.userImage} src={user.photo} alt='' width='50' height='50'/>
        <div className={styles.userDetail}>
          <span className={styles.username}>{user.name}</span>
          <span className={styles.userTitle}>Administrator</span>
        </div>
      </div>
      <ul className={styles.list}>
        {menuItems.map(cat => (
          <li key={cat.title}>
            <span className={styles.cat}>{cat.title}</span>
            {cat.list.map(item => (
              <MenuLink item={item} key={item.title} />
            ))}
          </li>
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
