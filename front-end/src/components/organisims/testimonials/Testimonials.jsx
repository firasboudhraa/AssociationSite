"use client";
import { useEffect, useState } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import axios from 'axios';
import styles from '../../../styles/testimonials.module.css'; 

const QuoteTop = '/blockquote.svg'; 
const QuoteBottom = '/blockquote.svg'; 

const Testimonials = () => {
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

  return (
    <section className={styles['testimonial-container']}>
      <div className={styles.title}>
        <h2>Testimonial</h2>
        <p>What members are saying.</p>
      </div>

      <div className={styles['slider-container']}>
        <blockquote>
          <img className={`${styles['quote']} ${styles['top-quote']}`} src={QuoteTop} alt="Top quote" />
          <img className={`${styles['quote']} ${styles['bottom-quote']}`} src={QuoteBottom} alt="Bottom quote" />
        </blockquote>

        <Splide
          options={{
            perPage: 1,
            autoplay: true,
            speed: 1000,
            rewind: true,
            rewindByDrag: true,
          }}
        >
          {reviews.map((review) => (
            <SplideSlide key={review.id} className={styles['splide__slide']}>
              {review.image && (
                <img className={styles['review-img']} src={review.image} alt={review.name} />
              )}
              <div className={styles.content}>
                <p className={styles.text}>{review.text}</p>
                <div className={styles.rating}>
                  {[...Array(review.review_rating)].map((_, i) => (
                    <span key={i} className={styles.star}>&#9733;</span>
                  ))}
                  {[...Array(5 - review.review_rating)].map((_, i) => (
                    <span key={i} className={styles.star}>&#9734;</span>
                  ))}
                </div>
                <p className={styles.user}>{review.name}</p>
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </section>
  );
};

export default Testimonials;
