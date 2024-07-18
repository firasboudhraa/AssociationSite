'use client'

import React, { useState } from 'react';
import styles from '../../../../styles/addMember.module.css'; // Import your CSS module
import axios from '@/api/axios'; // Ensure axios is correctly imported

const AddMemberPage = () => {
  // State to hold form data and alerts
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    photo: null, // Initialize photo as null to handle file upload
  });

  const [alert, setAlert] = useState({ message: '', type: '' }); // State for displaying alerts

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    // If the input is a file, update formData directly with the file
    if (type === 'file') {
      setFormData({
        ...formData,
        [name]: e.target.files[0], // Store the selected file in the formData state
      });
    } else {
      // For other inputs, update formData with the input value
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('password', formData.password);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('address', formData.address);
      formDataToSend.append('photo', formData.photo); 

      const response = await axios.post('/api/createTeam', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data', 
        },
      });

      // If successful, log the response data and show a success message
      console.log('Team created successfully:', response.data);
      setAlert({ message: 'Team created successfully!', type: 'success' });
    } catch (error) {
      // If there's an error, log the error and show an error message
      console.error('Error creating team:', error);
      setAlert({ message: 'Error creating team. Please try again.', type: 'error' });
    }
  };

  return (
    <div className={styles.container}>
      {/* Display an alert message if there's any */}
      {alert.message && (
        <div role="alert" className={alert.type === 'success' ? 'alert alert-success' : 'alert alert-error'}>
          {/* Display success or error icon based on alert type */}
          {alert.type === 'success' ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
          <span>{alert.message}</span>
        </div>
      )}

      {/* Form for adding a new member */}
      <form className={styles.form} onSubmit={handleSubmit}>
        {/* Input fields for member details */}
        <input type="text" placeholder="Name" name="name" value={formData.name} onChange={handleInputChange} required />
        <input type="email" placeholder="Email" name="email" value={formData.email} onChange={handleInputChange} required />
        <input type="password" placeholder="Password" name="password" value={formData.password} onChange={handleInputChange} required />
        <input type="phone" placeholder="Phone" name="phone" value={formData.phone} onChange={handleInputChange} />
        <textarea name="address" placeholder="Address" value={formData.address} onChange={handleInputChange} rows="6" required></textarea>
        <select name="is_admin" id="is_admin" value={formData.is_admin} onChange={handleInputChange}>
          <option value="">Function</option>
          <option value="Designer">Designer</option>
          <option value="Developer">Developer</option>
          <option value="Devops">Devops</option>
          <option value="Manager">Manager</option>
        </select>
        {/* Input field for uploading member photo */}
        <input type="file" name="photo" accept="image/*" onChange={handleInputChange} />

        {/* Submit button */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddMemberPage;
