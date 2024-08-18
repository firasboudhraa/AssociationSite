"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from "next/image";
import { useParams, useRouter } from 'next/navigation';
import styles from '../../../../styles/singleMember.module.css';

const SingleMemberPage = () => {
  const { id } = useParams();
  const router = useRouter(); // Initialize useRouter

  const [memberField, setMemberField] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    function: "",
    photo: "/noavatar.png",
  });

  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    if (id) {
      fetchMember();
    }
  }, [id]);

  const fetchMember = async () => {
    try {
      const result = await axios.get(`http://localhost:8000/api/teams/${id}`);
      const member = result.data.member;

      setMemberField({
        username: member.name || "",
        email: member.email || "",
        password: "", // Avoid pre-filling passwords
        phone: member.phone || "",
        address: member.address || "",
        function: member.function || "",
        photo: member.photo ? member.photo : "/noavatar.png",
      });
    } catch (err) {
      console.error("Error fetching member:", err);
    }
  };

  const changeMemberFieldHandler = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photo' && files.length > 0) {
      setSelectedPhoto(files[0]);
      setMemberField({
        ...memberField,
        [name]: URL.createObjectURL(files[0]),
      });
    } else {
      setMemberField({
        ...memberField,
        [name]: value,
      });
    }
  };

  const updateMemberFields = async () => {
    const payload = {
      name: memberField.username,
      email: memberField.email,
      phone: memberField.phone,
      address: memberField.address,
      function: memberField.function,
      password: memberField.password || undefined,
    };

    try {
      await axios.put(`http://localhost:8000/api/teamssupdate/${id}/update-fields`, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return true;
    } catch (err) {
      console.error("Error updating member fields:", err.response ? err.response.data : err.message);
      return false;
    }
  };

  const updateMemberPhoto = async () => {
    const formData = new FormData();
    if (selectedPhoto) {
      formData.append('photo', selectedPhoto);
    }

    try {
      await axios.post(`http://localhost:8000/api/teamsupdate/${id}/update-photo`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return true;
    } catch (err) {
      console.error("Error updating member photo:", err.response ? err.response.data : err.message);
      return false;
    }
  };

  const onSubmitChange = async (e) => {
    e.preventDefault();
    const fieldsUpdated = await updateMemberFields();
    const photoUpdated = selectedPhoto ? await updateMemberPhoto() : true;

    if (fieldsUpdated || photoUpdated) {
      alert("Member updated successfully!");
      router.push('/Dashboard/teams'); 
    } else {
      alert("Failed to update member.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src={memberField.photo} alt="" fill />
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
            value={memberField.username}
            onChange={changeMemberFieldHandler}
          />
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder=""
            value={memberField.email}
            onChange={changeMemberFieldHandler}
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={memberField.password}
            onChange={changeMemberFieldHandler}
          />
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            placeholder=""
            value={memberField.phone}
            onChange={changeMemberFieldHandler}
          />
          <label>Address</label>
          <textarea
            name="address"
            placeholder=""
            value={memberField.address}
            onChange={changeMemberFieldHandler}
          />
          <label>Function</label>
          <select
            name="function"
            value={memberField.function}
            onChange={changeMemberFieldHandler}
          >
            <option value="Designer">Designer</option>
            <option value="Developer">Developer</option>
            <option value="Devops">Devops</option>
            <option value="Manager">Manager</option>
          </select>
          <label>Photo</label>
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={changeMemberFieldHandler}
          />
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default SingleMemberPage;
