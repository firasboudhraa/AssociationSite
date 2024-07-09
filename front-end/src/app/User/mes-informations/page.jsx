"use client";

import React from "react";
import Image from "next/image";
import styles from "../../../styles/user.module.css";

const UserPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src={"/noavatar.png"} alt="" fill />
          <button className={styles.editButton} >
            Modifier
          </button>
          <input
            type="file"
            style={{ display: 'none' }}
          />
        </div>
      </div>
      <div className={styles.formContainer}>
        <form className={styles.form}>
          <input type="hidden" name="id" value={""} />
          <label>Username</label>
          <input type="text" name="username" placeholder="" />
          <label>Email</label>
          <input type="email" name="email" placeholder="" />
          <label>Phone</label>
          <input type="text" name="phone" placeholder="" />
          <label>Address</label>
          <textarea name="address" placeholder="" />
          <label>Is Admin?</label>
          <input
            type="text"
            name="isAdmin"
            readOnly
          />
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default UserPage;
