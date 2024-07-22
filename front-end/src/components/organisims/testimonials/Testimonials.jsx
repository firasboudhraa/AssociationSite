"use client"
import { useEffect, useState } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import Quote from 'public/blockquote.svg';
import axios from 'axios';
import '../../../styles/testimonials.module.css'

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
    <section className="max-w-4xl mx-auto flex flex-col justify-center h-screen">
      <div className="text-center mb-8">
        <h2 className="capitalize font-bold text-2xl leading-tight">Testimonial</h2>
        <p>What members are saying.</p>
      </div>

      <div className="relative user-select-none px-4">
        <blockquote>
          <img className="absolute -top-4 -left-4 z-[-1]" src={Quote} alt="quote" />
          <img className="absolute -bottom-12 -right-2 transform rotate-180 z-[-1]" src={Quote} alt="quote" />
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
            <SplideSlide key={review.id} className="flex items-center bg-white p-12 rounded-xl gap-4">
              {review.image && (
                <img className="w-36 h-36 rounded-full object-cover mb-4 mx-auto" src={review.image} alt={review.name} />
              )}
              <div className="content">
                <p className="text-gray-700 mb-4 text-lg">{review.text}</p>
                <div className="inline-block leading-none">
                  {[...Array(review.review_rating)].map((_, i) => (
                    <span key={i} className="text-[#ff6f59] text-lg">&#9733;</span>
                  ))}
                  {[...Array(5 - review.review_rating)].map((_, i) => (
                    <span key={i} className="text-[#ff6f59] text-lg">&#9734;</span>
                  ))}
                </div>
                <p className="font-semibold">{review.name}</p>
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </section>
  );
};

export default Testimonials;
