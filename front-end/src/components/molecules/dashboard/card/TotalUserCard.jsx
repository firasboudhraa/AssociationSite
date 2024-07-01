"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdSupervisedUserCircle } from 'react-icons/md';
import styles from '@/styles/card.module.css'; 

const TotalUsersCard = () => {
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/users/counts`);
      setTotalUsers(response.data.total_users || 0);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className={styles.container}>
      <MdSupervisedUserCircle size={24} />
      <div className={styles.texts}>
        <span className={styles.title}>Total Users</span>
        <span className={styles.number}>{totalUsers}</span>
      </div>
    </div>
  );
};

export default TotalUsersCard;
