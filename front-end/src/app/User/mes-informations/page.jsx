"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../../../styles/user.module.css";
import axios from "axios";

const UserPage = () => {
  const [user, setUser] = useState({
    id: '', 
    username: '',
    email: '',
    phone: '',
    password: '',
    address: '',
    isAdmin: '',
    photo: '/noavatar.png'
  });
  const [photoFile, setPhotoFile] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser({
        id: parsedUser.id || '', 
        username: parsedUser.name || '',
        email: parsedUser.email || '',
        phone: parsedUser.phone || '',
        password: parsedUser.password || '',
        address: parsedUser.address || '',
        isAdmin: parsedUser.isAdmin || 'No',
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
      setPhotoFile(file);
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/usersupdate/${user.id}/update-fields`, user);

      if (photoFile) {
        const formData = new FormData();
        formData.append('photo', photoFile);

        await axios.post(`http://localhost:8000/api/usersupdate/${user.id}/update-photo`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      }
      const updatedUser = {
        ...user,
        photo: photoFile ? URL.createObjectURL(photoFile) : user.photo 
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));
  
      alert('User information updated successfully!');
    } catch (error) {
      console.error('Failed to update user information:', error);
      alert('Failed to update information.');
    }
  
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
          <input type="hidden" name="id" value={user.id} />
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
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleInputChange}
            placeholder="Enter password"
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
