"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdSupervisedUserCircle } from 'react-icons/md';
import styles from '@/styles/card.module.css'; 

const UsersThisWeekCard = () => {
  const [thisWeekUsers, setThisWeekUsers] = useState(0);
  const [lastWeekUsers, setLastWeekUsers] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/users/counts`);
      setThisWeekUsers(response.data.this_week_users || 0);
      setLastWeekUsers(response.data.last_week_users || 0);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const calculatePercentageChange = (currentValue, previousValue) => {
    if (previousValue === 0) return 'N/A'; // Handle division by zero
    return (((currentValue - previousValue) / previousValue) * 100).toFixed(2);
  };

  return (
    <div className={styles.container}>
    <MdSupervisedUserCircle size={24} />
    <div className={styles.texts}>
      <span className={styles.title}>Users This Week</span>
      <span className={styles.number}>{thisWeekUsers}</span>
      <span className={styles.detail}>
        {lastWeekUsers !== 0 ? (
          <>
            <span className={styles.positive}>
              +{calculatePercentageChange(thisWeekUsers, lastWeekUsers)}
              %
            </span> than previous week
          </>
        ) : ''}
      </span>
    </div>
  </div>
  );
};

export default UsersThisWeekCard;
