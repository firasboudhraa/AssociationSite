"use client";
import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';
import styles from '../../../../styles/singleEvent.module.css';

const SingleEventPage = () => {
  const router = useRouter();
  const { id } = useParams(); // Get the event ID from URL query
  const [event, setEvent] = useState(null);

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8000/api/events/${id}`)
        .then(response => {
          setEvent(response.data);
        })
        .catch(error => {
          console.error('Error fetching event:', error);
        });
    }
  }, [id]);

  if (!event) return <p className={styles.loading}>Loading...</p>;

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.put(`http://localhost:8000/api/updateEvent/${event.id}`, event)
      .then(response => {
        console.log('Event updated:', response.data);
        router.push('/Dashboard/events'); 
      })
      .catch(error => {
        console.error('Error updating event:', error);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <h1 className={styles.title}>{event.title}</h1>
        <p>{event.description}</p>
      </div>
      <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input type="hidden" name="id" value={event.id} />
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={event.title}
            onChange={(e) => setEvent({ ...event, title: e.target.value })}
            placeholder="Event Title"
            required
          />
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={event.price}
            onChange={(e) => setEvent({ ...event, price: parseFloat(e.target.value) })}
            placeholder="Event Price"
            required
          />
          <label htmlFor="desc">Description</label>
          <textarea
            id="desc"
            name="desc"
            rows="10"
            value={event.description}
            onChange={(e) => setEvent({ ...event, description: e.target.value })}
            placeholder="Event Description"
            required
          ></textarea>
          <label htmlFor="start">Start Date</label>
          <input
            type="datetime-local"
            id="start"
            name="start"
            value={new Date(event.start).toISOString().slice(0, 16)} // Format to match input
            onChange={(e) => setEvent({ ...event, start: new Date(e.target.value).toISOString() })}
            required
          />
          <label htmlFor="allDay">All Day</label>
          <input
            type="checkbox"
            id="allDay"
            name="allDay"
            checked={event.allDay || false}
            onChange={(e) => setEvent({ ...event, allDay: e.target.checked })}
          />
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default SingleEventPage;
