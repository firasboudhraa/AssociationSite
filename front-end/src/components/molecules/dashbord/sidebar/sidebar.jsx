import React from 'react'
import styles from '@/styles/sidebar.module.css'
import Image from 'next/image';
import MenuLink from '@/components/molecules/dashbord/sidebar/menuLink/menuLink'
import {
  MdDashboard,
  MdSupervisedUserCircle,
  MdShoppingBag,
  MdAttachMoney,
  MdWork,
  MdAnalytics,
  MdPeople,
  MdOutlineSettings,
  MdHelpCenter,
  MdLogout,
} from "react-icons/md";

const menuItems = [
  {
    title: "Pages",
    list: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: <MdDashboard />,
      },
      {
        title: "Users",
        path: "/dashboard/users",
        icon: <MdSupervisedUserCircle />,
      },
      {
        title: "Evenements",
        path: "/dashboard/events",
        icon: <MdShoppingBag />,
      },
      {
        title: "Transactions",
        path: "/dashboard/transactions",
        icon: <MdAttachMoney />,
      },
    ],
  },
  {
    title: "Analytics",
    list: [
      {
        title: "Revenue",
        path: "/dashboard/revenue",
        icon: <MdWork />,
      },
      {
        title: "Reports",
        path: "/dashboard/reports",
        icon: <MdAnalytics />,
      },
      {
        title: "Teams",
        path: "/dashboard/teams",
        icon: <MdPeople />,
      },
    ],
  },
  {
    title: "User",
    list: [
      {
        title: "Settings",
        path: "/dashboard/settings",
        icon: <MdOutlineSettings />,
      },
      {
        title: "Help",
        path: "/dashboard/help",
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
