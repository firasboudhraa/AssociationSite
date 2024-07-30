"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { MdNotifications, MdOutlineChat, MdPublic, MdSearch } from "react-icons/md";
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';
import styles from "@/styles/navbar.module.css";

const Navbar = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/notifications');
        const sortedNotifications = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); // Sort notifications with the newest first
        setNotifications(sortedNotifications);

        const unreadNotifications = sortedNotifications.filter(notification => !notification.is_read);
        setUnreadCount(unreadNotifications.length);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  const handleNotificationClick = async (id) => {
    try {
      await axios.patch(`http://localhost:8000/api/notifications/${id}/read`);

      setNotifications(prevNotifications =>
        prevNotifications.map(notification =>
          notification.id === id ? { ...notification, is_read: true } : notification
        )
      );

      setUnreadCount(prevCount => prevCount - 1);
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await axios.patch('http://localhost:8000/api/notifications/mark-all-as-read');

      setNotifications(prevNotifications =>
        prevNotifications.map(notification => ({ ...notification, is_read: true }))
      );

      setUnreadCount(0);
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  const toggleDropdown = () => {
    if (!dropdownVisible) {
      markAllAsRead();
    }
    setDropdownVisible(!dropdownVisible);
  };

  const navigateHome = () => {
    router.push('/');
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>{pathname.split("/").pop()}</div>
      <div className={styles.menu}>
        <div className={styles.search}>
          <MdSearch size={20} />
          <input type="text" placeholder="Search..." className={styles.input} />
        </div>
        <div className={styles.icons}>
          <div className={styles.iconWrapper}>
            <MdOutlineChat size={24} className={styles.icon} />
            <div className={styles.tooltip}>Messages</div>
          </div>
          <div className={styles.notification} onClick={toggleDropdown}>
            <MdNotifications size={24} className={styles.bell} />
            {unreadCount > 0 && (
              <span className={styles.notificationBadge}>{unreadCount}</span>
            )}
            {dropdownVisible && (
              <div className={styles.dropdown}>
                <button className={styles.dropdownButton} onClick={markAllAsRead}>Mark all as read</button>
                {notifications.map(notification => (
                  <div key={notification.id} className={styles.notificationItem} onClick={() => handleNotificationClick(notification.id)}>
                    <img src={notification.image || '/noavatar.png'} alt="Notification Icon" className={styles.notificationIcon} />
                    <div className={styles.notificationText}>
                      <p className={styles.notificationBody}>{notification.message}</p>
                      <p className={styles.notificationTime}>
                        {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className={styles.iconWrapper} onClick={navigateHome}>
            <MdPublic size={24} className={styles.icon} />
            <div className={styles.tooltip}>Home</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
