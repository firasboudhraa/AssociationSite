"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  MdNotifications,
  MdOutlineChat,
  MdPublic,
  MdSearch,
} from "react-icons/md";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import styles from "@/styles/navbar.module.css";

const Navbar = () => {
  const [notifications, setNotifications] = useState([]);
  const [contactMessages, setContactMessages] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [messagesDropdownVisible, setMessagesDropdownVisible] = useState(false); 
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/notifications"
        );
        const sortedNotifications = response.data.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setNotifications(sortedNotifications);

        const unreadNotifications = sortedNotifications.filter(
          (notification) => !notification.is_read
        );
        setUnreadCount(unreadNotifications.length);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    const fetchContactMessages = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/contacts");
        const sortedMessages = response.data.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setContactMessages(sortedMessages);
      } catch (error) {
        console.error("Error fetching contact messages:", error);
      }
    };

    fetchNotifications();
    fetchContactMessages();
  }, []);

  const handleNotificationClick = async (id) => {
    try {
      await axios.patch(`http://localhost:8000/api/notifications/${id}/read`);

      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification.id === id
            ? { ...notification, is_read: true }
            : notification
        )
      );

      setUnreadCount((prevCount) => prevCount - 1);
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const deleteContactMessage = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/deleteContact/${id}`);
  
      setContactMessages((prevMessages) =>
        prevMessages.filter((message) => message.id !== id)
      );
    } catch (error) {
      console.error("Error deleting contact message:", error);
    }
  };
  

  const markAllNotificationsAsRead = async () => {
    try {
      await axios.patch(
        "http://localhost:8000/api/notifications/mark-all-as-read"
      );

      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) => ({
          ...notification,
          is_read: true,
        }))
      );

      setUnreadCount(0);
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
    }
  };

  const toggleDropdown = () => {
    if (!dropdownVisible) {
      markAllNotificationsAsRead();
    }
    setDropdownVisible(!dropdownVisible);
  };

  const toggleMessagesDropdown = () => {
    setMessagesDropdownVisible(!messagesDropdownVisible);
  };

  const navigateHome = () => {
    router.push("/");
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
          <div className={styles.iconWrapper} onClick={toggleMessagesDropdown}>
            <MdOutlineChat size={24} className={styles.icon} />
            <div className={styles.tooltip}>Messages</div>
            {messagesDropdownVisible && (
              <div
                className={`${styles.messagesDropdown} ${
                  messagesDropdownVisible ? styles.show : ""
                }`}
              >
                {contactMessages.length > 0 ? (
                  contactMessages.map((message) => (
                    <div
                      key={message.id}
                      className={styles.messageItem}
                      onClick={() => handleContactMessageClick(message.id)}
                    >
                      <div className={styles.messageSender}>
                        {message.fullname}
                      </div>
                      <div className={styles.messageContent}>
                        {message.message}
                      </div>
                      <div className={styles.messageTime}>
                        {formatDistanceToNow(new Date(message.created_at), {
                          addSuffix: true,
                        })}
                      </div>
                      <button
                        className={styles.deleteButton}
                        onClick={() => deleteContactMessage(message.id)}
                      >
                        Delete
                      </button>
                    </div>
                  ))
                ) : (
                  <p className={styles.messageContent}>No messages</p>
                )}
              </div>
            )}
          </div>
          <div className={styles.notification} onClick={toggleDropdown}>
            <MdNotifications size={24} className={styles.bell} />
            {unreadCount > 0 && (
              <span className={styles.notificationBadge}>{unreadCount}</span>
            )}
            {dropdownVisible && (
              <div
                className={`${styles.dropdown} ${
                  dropdownVisible ? styles.show : ""
                }`}
              >
                <button
                  className={styles.dropdownButton}
                  onClick={markAllNotificationsAsRead}
                >
                  Mark all as read
                </button>
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={styles.notificationItem}
                  >
                    <img
                      src={notification.image || "/noavatar.png"}
                      alt="Notification Icon"
                      className={styles.notificationIcon}
                    />
                    <div className={styles.notificationText}>
                      <p className={styles.notificationBody}>
                        {notification.message}
                      </p>
                      <p className={styles.notificationTime}>
                        {formatDistanceToNow(
                          new Date(notification.created_at),
                          { addSuffix: true }
                        )}
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
