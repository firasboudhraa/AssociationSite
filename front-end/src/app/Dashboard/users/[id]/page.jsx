"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from "next/image";
import { useParams, useRouter } from 'next/navigation';
import styles from '../../../../styles/singleUser.module.css';

const SingleUserPage = () => {
  const { id } = useParams();
  const router = useRouter(); // Initialize useRouter
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
        password: "", 
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
    
    const payload = {
      name: username,
      email: email,
      phone: phone,
      address: address,
      is_admin: isAdmin,
      password: password || undefined,
    };

    try {
      await axios.put(`http://localhost:8000/api/usersupdate/${id}/update-fields`, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return true;
    } catch (err) {
      console.log("Error updating user fields:", err.response ? err.response.data : err.message);
      return false;
    }
  };

  const updateUserPhoto = async () => {
    const formData = new FormData();
    if (selectedPhoto) {
      formData.append('photo', selectedPhoto);
    }

    try {
      await axios.post(`http://localhost:8000/api/usersupdate/${id}/update-photo`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return true;
    } catch (err) {
      console.log("Error updating user photo:", err.response ? err.response.data : err.message);
      return false;
    }
  };

  const onSubmitChange = async (e) => {
    e.preventDefault();
    const fieldsUpdated = await updateUserFields();
    const photoUpdated = selectedPhoto ? await updateUserPhoto() : true;

    if (fieldsUpdated || photoUpdated) {
      alert("User updated successfully!");
      router.push('/Dashboard/users'); 
    } else {
      alert("Failed to update user.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src={userField.photo} alt="User Photo" fill />
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={changeUserFieldHandler}
            className={styles.fileInput}
          />
        </div>
      </div>
      <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={onSubmitChange}>
          <input type="hidden" name="id" value={id} />
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={userField.username}
            onChange={changeUserFieldHandler}
          />
          <label>Email</label>
          <input
            type="email"
            name="email"
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
            value={userField.phone}
            onChange={changeUserFieldHandler}
          />
          <label>Address</label>
          <textarea
            name="address"
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
