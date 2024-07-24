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
        const publishedReviews = response.data.filter(review => review.published);
        setReviews(publishedReviews);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <section className={styles['testimonial-container']}>
      <div className={styles.title}>
        {reviews.length > 0 ? (
          <>
            <h2 className={`${styles['title-text']} text-center text-4xl font-bold mb-6`}>
              What Our Members Are Saying
            </h2>
            <p className="text-center text-lg text-white mb-8">
              Here’s how we’ve made a difference in their lives. Dive into their stories!
            </p>
          </>
        ) : (
          <div className={styles['no-reviews']}>
            <h2 className="text-3xl font-semibold mb-4">We’re Excited to Hear from You!</h2>
            <p className="text-lg text-gray-300">
              No reviews yet? Be the first to share your experience and help others learn about our amazing association!
            </p>
          </div>
        )}
      </div>

      {reviews.length > 0 && (
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
      )}
    </section>
  );
};

export default Testimonials;
