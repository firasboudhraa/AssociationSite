"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../../../styles/user.module.css";

const UserPage = () => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    phone: '',
    address: '',
    isAdmin: '',
    photo: '/noavatar.png'
  });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser({
        username: parsedUser.name || '',
        email: parsedUser.email || '',
        phone: parsedUser.phone || '',
        address: parsedUser.address || '',
        isAdmin: parsedUser.isAdmin || 'No', // assuming boolean values are represented as 'Yes' or 'No'
        photo: parsedUser.photo || '/noavatar.png'
      });
    }
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser((prevUser) => ({
          ...prevUser,
          photo: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem('user', JSON.stringify(user));
    // Add additional form submission logic here if necessary
  };

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src={user.photo} alt="User Avatar" layout="fill" className={styles.userImage} />
          <button
            className={styles.editButton}
            onClick={() => document.getElementById('fileInput').click()}
          >
            Modifier
          </button>
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        </div>
      </div>
      <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input type="hidden" name="id" value={""} />
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={handleInputChange}
            placeholder="Enter username"
          />
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
            placeholder="Enter email"
          />
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={user.phone}
            onChange={handleInputChange}
            placeholder="Enter phone number"
          />
          <label>Address</label>
          <textarea
            name="address"
            value={user.address}
            onChange={handleInputChange}
            placeholder="Enter address"
          />
          <label>Is Admin?</label>
          <input
            type="text"
            name="isAdmin"
            value={user.isAdmin}
            readOnly
          />
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default UserPage;
