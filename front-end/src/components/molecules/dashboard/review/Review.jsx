"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { Button, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Rating } from "@mui/material";
import styles from "../../../../styles/reviews.module.css"; // Ensure you have your CSS module for custom styles

const ReviewsRow = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/reviews");
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/deleteReview/${id}`);
      setReviews(reviews.filter((review) => review.id !== id));
      toast.success("Review deleted successfully!");
    } catch (error) {
      toast.error("Error deleting review!");
      console.error("Error deleting review:", error);
    }
  };

  const handleAccept = async (id) => {
    try {
      await axios.post(`http://localhost:8000/api/acceptReview/${id}`);
      setReviews(reviews.map((review) =>
        review.id === id ? { ...review, published: true } : review
      ));
      toast.success("Review accepted and published successfully!");
    } catch (error) {
      toast.error("Error accepting review!");
      console.error("Error accepting review:", error);
    }
  };

  return (
    <div className="p-6 bg-[var(--bgSoft)] from-blue-50 via-purple-50 to-blue-100">
      <ToastContainer position="bottom-center" />
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => (
          <motion.div
            key={review.id}
            className="flex flex-col"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-gradient-to-r from-purple-400 to-blue-500 text-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl">
              {review.image && (
                <CardMedia
                  component="img"
                  height="200"
                  image={review.image}
                  alt={review.name}
                  className="object-cover"
                />
              )}
              <CardContent>
                <Typography variant="h6" component="div" className="font-bold mb-2">
                  {review.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" className="mb-4">
                  {review.text}
                </Typography>
                <div className="flex items-center mb-4">
                  <Rating
                    value={review.review_rating}
                    readOnly
                    precision={0.5}
                    size="large"
                    emptyIcon={<span className="text-gray-300">&#9734;</span>}
                    className="text-yellow-400"
                  />
                </div>
                <div className="flex gap-4">
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(review.id)}
                    className="w-full hover:bg-red-600 hover:text-white transition-transform transform hover:scale-105"
                  >
                    Delete
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleAccept(review.id)}
                    disabled={review.published}
                    className={`w-full transition-transform transform hover:scale-105 ${review.published ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}`}
                  >
                    {review.published ? "Accepted" : "Accept"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsRow;
