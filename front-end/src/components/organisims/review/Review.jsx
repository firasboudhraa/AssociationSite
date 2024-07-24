"use client";
import React, { useState } from "react";
import MyBtn from '@/components/molecules/button/MyButton'; 
import axios from 'axios';
import { toast } from 'react-toastify';

const Review = () => {
  const [rating, setRating] = useState(0); 
  const [hoverRating, setHoverRating] = useState(0); 
  const [name, setName] = useState(""); 
  const [text, setText] = useState(""); 
  const [image, setImage] = useState(null); 

  const handleRating = (value) => {
    setRating(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('text', text);
    formData.append('review_rating', rating);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await axios.post('http://localhost:8000/api/createReview', formData);
      toast.success('Review submitted successfully!');
      setName('');
      setText('');
      setRating(0);
      setImage(null);
    } catch (error) {
      toast.error('Error submitting review. Please try again.');
      console.error('Error submitting review:', error);
    }
  };

  return (
    <div id="contact" className="flex flex-col items-center py-12 bg-gradient-to-r from-blue-50 via-white to-blue-50">
      <div className="max-w-4xl w-full px-6 md:px-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-8 md:mb-12 transition-transform transform hover:scale-105">
          We Value Your Feedback!
        </h1>
        <p className="text-lg md:text-xl text-gray-600 text-center mb-12">
          Share your thoughts and let us know how we can improve.
        </p>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg border border-gray-200 transition-transform transform hover:scale-105">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label htmlFor="Name" className="text-sm font-medium text-gray-700 mb-2">Your Name</label>
              <input
                type="text"
                name="Name"
                id="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="given-name"
                placeholder="What's your name?"
                required
                className="p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out text-black"
              />
            </div>
          </div>

          <div className="mt-10 flex flex-col">
            <label htmlFor="Message" className="text-sm font-medium text-gray-700 mb-2">Tell Us About Your Experience 🌟</label>
            <textarea
              id="Message"
              name="Message"
              rows={6}
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="p-4 border  border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out text-black"
              placeholder="Describe your request and provide any additional details here."
              required
            />
            <p className="mt-2 text-xs italic text-gray-500">Brief message for your request*</p>
          </div>

          <div className="mt-10 flex flex-col">
            <label htmlFor="image" className="text-sm font-medium text-gray-700 mb-2">Upload an Image (Optional)</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="p-2 border border-gray-300 rounded-lg shadow-sm text-black"
            />
          </div>

          <div className="mt-10 flex flex-col items-center">
            <label htmlFor="Rating" className="text-sm font-medium text-gray-700 mb-2">Your Rating</label>
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  onClick={() => handleRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-8 w-8 cursor-pointer transition-transform transform ${
                    star <= (hoverRating || rating) ? "text-yellow-400 scale-110" : "text-gray-400"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-label={`${star} star rating`}
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
            </div>
            <p className="mt-4 text-lg text-gray-700">
              {rating > 0 ? `You rated ${rating} star${rating > 1 ? 's' : ''}` : 'Click on a star to rate'}
            </p>
          </div>
          <div className="mt-8 flex justify-center">
            <MyBtn textContent="Submit Feedback" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Review;
