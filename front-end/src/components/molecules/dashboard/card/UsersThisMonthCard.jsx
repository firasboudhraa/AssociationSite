"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdSupervisedUserCircle } from 'react-icons/md';
import styles from '@/styles/card.module.css'; 

const UsersThisMonthCard = () => {
  const [thisMonthUsers, setThisMonthUsers] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/users/counts`);
      setThisMonthUsers(response.data.this_month_users || 0);
      setLastMonthUsers(response.data.last_month_users || 0);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const calculatePercentageChange = (currentValue, previousValue) => {
    if (previousValue === 0) return 'N/A'; 
    return (((currentValue - previousValue) / previousValue) * 100).toFixed(2);
  };

  return (
    <div className={styles.container}>
      <MdSupervisedUserCircle size={24} />
      <div className={styles.texts}>
        <span className={styles.title}>Users This Month</span>
        <span className={styles.number}>{thisMonthUsers}</span>
        <span className={styles.detail}>
          {lastMonthUsers !== 0 ? (
            <>
              <span className={styles.positive}>
                +{calculatePercentageChange(thisMonthUsers, lastMonthUsers)}
                %
              </span> than previous month
            </>
          ) : ''}
        </span>
      </div>
    </div>
  );
};

export default UsersThisMonthCard;
