"use client";

import React  from 'react';
import Image from "next/image";
import styles from '../../../../styles/singleMember.module.css';

const SingleMemberPage = () => {
  return (
    <div className={styles.container}>
    <div className={styles.infoContainer}>
      <div className={styles.imgContainer}>
        <Image src={"/noavatar.png"} alt="" fill />
      </div>
    </div>
    <div className={styles.formContainer}>
      <form className={styles.form} >
        <input type="hidden" name="id" value={""} />
        <label>Username</label>
        <input
          type="text"
          name="username"
          placeholder=""
        />
        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder=""
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
        />
        <label>Phone</label>
        <input
          type="text"
          name="phone"
          placeholder=""
        />
        <label>Address</label>
        <textarea
          name="address"
          placeholder=""
        />
        <label>Function?</label>
        <select
          name="Function"
          value={""}
        >
          <option value={""}>Designer</option>
          <option value={""}>Developer</option>
          <option value={""}>Devops</option>
          <option value={""}>Manager</option>
        </select>
        <label>Photo</label>
        <input
          type="file"
          name="photo"
          accept="image/*"
        />
        <button type="submit">Update</button>
      </form>
    </div>
  </div>
  )
}

export default SingleMemberPage
