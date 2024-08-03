"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from "next/image";
import { useParams } from 'next/navigation';
import styles from '../../../../styles/singleUser.module.css';

const SingleUserPage = () => {
  const { id } = useParams();
  const [userField, setUserField] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    isAdmin: false,
    photo: "/noavatar.png",
  });

  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    fetchUser();
  }, [id]);

  const fetchUser = async () => {
    try {
      const result = await axios.get(`http://localhost:8000/api/users/${id}`);
      const user = result.data.user;
    
      setUserField({
        username: user.name,
        email: user.email,
        password: "", // Avoid pre-filling passwords
        phone: user.phone || "",
        address: user.address || "",
        isAdmin: user.is_admin,
        photo: user.photo,
      });
    } catch (err) {
      console.log("Error fetching user:", err);
    }
  };

  const changeUserFieldHandler = (e) => {
    const { name, value, files, type, checked } = e.target;
    if (name === 'photo' && files.length > 0) {
      setSelectedPhoto(files[0]);
      setUserField({
        ...userField,
        [name]: URL.createObjectURL(files[0]),
      });
    } else if (type === 'checkbox') {
      setUserField({
        ...userField,
        [name]: checked,
      });
    } else {
      setUserField({
        ...userField,
        [name]: value,
      });
    }
  };

  const updateUserFields = async () => {
    const { username, email, password, phone, address, isAdmin } = userField;
    
    // Construct the JSON payload
    const payload = {
      name: username,
      email: email,
      phone: phone,
      address: address,
      is_admin: isAdmin,
      password: password || undefined, 
    };

    // Log the payload for debugging
    console.log("Updating user fields with data:", payload);

    try {
      await axios.put(`http://localhost:8000/api/usersupdate/${id}/update-fields`, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (err) {
      console.log("Error updating user fields:", err.response ? err.response.data : err.message);
    }
  };

  const updateUserPhoto = async () => {
    const formData = new FormData();
    if (selectedPhoto) {
      formData.append('photo', selectedPhoto);
    }

    console.log("Updating user photo with data:", formData);

    try {
      await axios.put(`http://localhost:8000/api/usersupdate/${id}/update-photo`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (err) {
      console.log("Error updating user photo:", err.response ? err.response.data : err.message);
    }
  };

  const onSubmitChange = async (e) => {
    e.preventDefault();
    await updateUserFields();
    if (selectedPhoto) {
      await updateUserPhoto();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src={userField.photo} alt="User Photo" fill />
        </div>
      </div>
      <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={onSubmitChange}>
          <input type="hidden" name="id" value={id} />
          <label>Username</label>
          <input
            type="text"
            name="username"
            placeholder=""
            value={userField.username}
            onChange={changeUserFieldHandler}
          />
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder=""
            value={userField.email}
            onChange={changeUserFieldHandler}
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={userField.password}
            onChange={changeUserFieldHandler}
          />
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            placeholder=""
            value={userField.phone}
            onChange={changeUserFieldHandler}
          />
          <label>Address</label>
          <textarea
            name="address"
            placeholder=""
            value={userField.address}
            onChange={changeUserFieldHandler}
          />
          <label>Is Admin?</label>
          <select
            name="isAdmin"
            value={userField.isAdmin ? "true" : "false"}
            onChange={changeUserFieldHandler}
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          <label>Photo</label>
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={changeUserFieldHandler}
          />
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default SingleUserPage;
