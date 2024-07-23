"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import styles from "@/styles/navbar.module.css";
import { MdNotifications, MdOutlineChat, MdPublic, MdSearch } from "react-icons/md";
import axios from 'axios';

const Navbar = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/notifications');
        setNotifications(response.data);

        const unreadNotifications = response.data.filter(notification => !notification.is_read);
        setUnreadCount(unreadNotifications.length);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>{pathname.split("/").pop()}</div>
      <div className={styles.menu}>
        <div className={styles.search}>
          <MdSearch />
          <input type="text" placeholder="Search..." className={styles.input} />
        </div>
        <div className={styles.icons}>
          <MdOutlineChat size={20} />
          <div className={styles.notification} onClick={toggleDropdown}>
            <MdNotifications size={24} className={styles.bell} />
            {unreadCount > 0 && (
              <span className={styles.notificationBadge}>{unreadCount}</span>
            )}
            {dropdownVisible && (
              <div className={styles.dropdown}>
                {notifications.map(notification => (
                  <div key={notification.id} className={styles.notificationItem}>
                    <img src={notification.image || '/noavatar.png'} alt="Notification Icon" className={styles.notificationIcon} />
                    <div className={styles.notificationText}>
                      <p className={styles.notificationTitle}>{notification.type}</p>
                      <p className={styles.notificationBody}>{notification.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <MdPublic size={20} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
