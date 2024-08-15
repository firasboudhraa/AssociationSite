"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'; 
import { useRouter, useSearchParams } from 'next/navigation'; 
import styles from '../../../../styles/addEvent.module.css';

const AddEventpage = () => {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    start: '',
    allDay: false,
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const initialStartDate = searchParams.get('date') || ''; 

  useEffect(() => {
    if (initialStartDate) {
      setFormData((prevData) => ({
        ...prevData,
        start: initialStartDate, 
      }));
    }
  }, [initialStartDate]);
  

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/createEvent', formData);
      console.log('Event added:', response.data);
      toast.success('Event added successfully!');

      router.push('/Dashboard/events');
    } catch (error) {
      console.error('Error adding event:', error);
      toast.error('Failed to add event.'); 
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          placeholder="Price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <input
          type="datetime-local"
          name="start"
          value={formData.start}
          onChange={handleChange}
          required
        />
        <textarea
          placeholder="Description"
          name="description"
          rows="4"
          value={formData.description}
          onChange={handleChange}
          required
        ></textarea>
        <label>
          All Day
          <input
            type="checkbox"
            name="allDay"
            checked={formData.allDay}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddEventpage;
