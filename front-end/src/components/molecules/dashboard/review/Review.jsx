"use client"

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../../../../styles/reviews.module.css'; 

const ReviewsRow = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/reviews'); 
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/deleteReview/${id}`); 
      setReviews(reviews.filter((review) => review.id !== id));
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  return (
    <div className={styles.reviewsContainer}>
      {reviews.map((review) => (
        <div key={review.id} className={styles.reviewItem}>
          {review.image && (
            <img
              className={styles.reviewImg}
              src={review.image}
              alt={review.name}
            />
          )}
          <div className={styles.reviewContent}>
            <p className={styles.reviewText}>{review.text}</p>
            <div className={styles.reviewRating}>
              {[...Array(review.review_rating)].map((_, i) => (
                <span key={i} className={styles.star}>&#9733;</span>
              ))}
              {[...Array(5 - review.review_rating)].map((_, i) => (
                <span key={i} className={styles.star}>&#9734;</span>
              ))}
            </div>
            <p className={styles.reviewUser}>{review.name}</p>
          </div>
          <button
            className={styles.deleteButton}
            onClick={() => handleDelete(review.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default ReviewsRow;
