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
  });

  useEffect(() => {
    fetchUser();
  }, [id]);

  const fetchUser = async () => {
    try {
      const result = await axios.get(`http://localhost:8000/api/users/${id}`);
      console.log(result.data.user); // Log the fetched user data
      setUserField({
        username: result.data.user.name,
        email: result.data.user.email,
        password: "", // It's generally not a good idea to pre-fill passwords
        phone: result.data.user.phone || "", // Adjust according to your user data structure
        address: result.data.user.address || "", // Adjust according to your user data structure
        isAdmin: result.data.user.isAdmin,
      });
    } catch (err) {
      console.log("Something went wrong", err);
    }
  };

  const changeUserFieldHandler = (e) => {
    setUserField({
      ...userField,
      [e.target.name]: e.target.value
    });
  };

  const onSubmitChange = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/usersupdate/${id}`, userField);
      window.location.href = '/';
    } catch (err) {
      console.log("Something went wrong", err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src={"/noavatar.png"} alt="" fill />
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
            value={userField.isAdmin}
            onChange={changeUserFieldHandler}
          >
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default SingleUserPage;
