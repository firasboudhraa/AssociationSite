'use client'

import React, { useState } from 'react';
import styles from '../../../../styles/addUser.module.css';
import axios from '@/api/axios';

const AddUserPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    is_admin: '',
    photo: null,
  });

  const handleChange = (event) => {
    if (event.target.name === 'photo') {
      setFormData({ ...formData, [event.target.name]: event.target.files[0] });
    } else {
      setFormData({ ...formData, [event.target.name]: event.target.value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const postData = new FormData();
    postData.append('name', formData.name);
    postData.append('email', formData.email);
    postData.append('password', formData.password);
    postData.append('phone', formData.phone);
    postData.append('address', formData.address);
    postData.append('is_admin', formData.is_admin);
    postData.append('photo', formData.photo);

    try {
      const response = await axios.post('http://localhost:8000/api/create', postData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('User created successfully:', response.data);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" name="name" value={formData.name} onChange={handleChange} required />
        <input type="email" placeholder="Email" name="email" value={formData.email} onChange={handleChange} required />
        <input type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} required />
        <input type="phone" placeholder="Phone" name="phone" value={formData.phone} onChange={handleChange} />
        <textarea name="address" placeholder="Address" value={formData.address} onChange={handleChange} rows="6" required></textarea>
        <select name="is_admin" id="is_admin" value={formData.is_admin} onChange={handleChange}>
          <option value="">Is Admin?</option>
          <option value={true}>true</option>
          <option value={false}>false</option>
        </select>
        <input type="file" name="photo" accept="image/*" onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddUserPage;
