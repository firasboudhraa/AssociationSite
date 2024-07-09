import React from 'react'
import styles from '@/styles/sidebar.module.css'
import Image from 'next/image';
import MenuLink from '@/components/molecules/dashboard/sidebar/menuLink/menuLink'
import {
  MdDashboard,
  MdSupervisedUserCircle,
  MdShoppingBag,
  MdAccountCircle,
  MdWork,
  MdAnalytics,
  MdPeople,
  MdHelpCenter,
  MdLogout,
} from "react-icons/md";

const menuItems = [
  {
    title: "Pages",
    list: [
      {
        title: "Dashboard",
        path: "/Dashboard",
        icon: <MdDashboard />,
      },
      {
        title: "Users",
        path: "/Dashboard/users",
        icon: <MdSupervisedUserCircle />,
      },
      {
        title: "Evenements",
        path: "/Dashboard/events",
        icon: <MdShoppingBag />,
      },
    ],
  },
  {
    title: "Analytics",
    list: [
      {
        title: "Revenue",
        path: "/Dashboard/revenue",
        icon: <MdWork />,
      },
      {
        title: "Reports",
        path: "/Dashboard/reports",
        icon: <MdAnalytics />,
      },
      {
        title: "Teams",
        path: "/Dashboard/teams",
        icon: <MdPeople />,
      },
    ],
  },
  {
    title: "User",
    list: [
      {
        title: "Account",
        path: "/Dashboard/account",
        icon: <MdAccountCircle/>,
      },
      {
        title: "Help",
        path: "/Dashboard/help",
        icon: <MdHelpCenter />,
      },
    ],
  },
];

const Sidebar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <Image className={styles.userImage} src='/noavatar.png' alt='' width='50' height='50'/>
        <div className={styles.userDetail}>
          <span className={styles.username}>Firas Boudhraa</span>
          <span className={styles.userTitle}>Administrator</span>
        </div>
      </div>
      <ul className={styles.list}>
      {menuItems.map(cat=>
        <li key={cat.title}>
          <span className={styles.cat}>{cat.title}</span>
          {cat.list.map(item =>
            <MenuLink item={item} key={item.title}/>
          )}
        </li>
      )}
      </ul>
      <button className={styles.logout}>
        <MdLogout/>
      Logout
      </button>
    </div>
  )
}

export default Sidebar
