'use client'

import React, { useState } from 'react';
import styles from '../../../../styles/addMember.module.css';
import axios from '@/api/axios';

const AddMemberPage = () => {
  return (
    <div className={styles.container}>
      <form className={styles.form} >
        <input type="text" placeholder="Name" name="name" value={""}  required />
        <input type="email" placeholder="Email" name="email" value={""}  required />
        <input type="password" placeholder="Password" name="password" value={""} required />
        <input type="phone" placeholder="Phone" name="phone" value={""} />
        <textarea name="address" placeholder="Address" value={""}  rows="6" required></textarea>
        <select name="is_admin" id="is_admin" value={""} >
          <option value="">Function</option>
          <option value={""}>Designer</option>
          <option value={""}>Developer</option>
          <option value={""}>Devops</option>
          <option value={""}>Manager</option>
        </select>
        <input type="file" name="photo" accept="image/*"  />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default AddMemberPage
