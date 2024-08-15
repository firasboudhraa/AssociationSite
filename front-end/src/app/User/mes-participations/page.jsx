"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ParticipationsPage = () => {
  const [participations, setParticipations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchParticipations = async () => {
      setLoading(true);
      try {
        const userToken = localStorage.getItem("token");
        const userData = localStorage.getItem('user');
        if (!userToken || !userData) {
          setError("User not authenticated");
          return;
        }

        const user = JSON.parse(userData);
        const result = await axios.get('http://localhost:8000/api/user-participations', {
          params: { user_id: user.id },
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        setParticipations(result.data);
      } catch (err) {
        setError("Failed to fetch participations");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchParticipations();
  }, []);

  function formatPrice(price) {
    // Convert price to a number if it's not already and handle undefined/null
    const numericPrice = parseFloat(price);
    if (isNaN(numericPrice)) {
      return "0.00"; // Fallback if price is not a number
    }
    return numericPrice.toFixed(2); // Format price to 2 decimal places
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex w-full flex-col">
      <div className="card bg-[var(--bgSoft)] text-white rounded-box grid h-max place-items-center mb-2">
        <h2 className="text-3xl font-bold mb-2 text-gradient">Mes Participations</h2>
        <div className="border-2 w-20 border-green-500 mb-3"></div>
      </div>

      {participations.length > 0 ? (
        <div className="flex flex-col items-center">
          {participations.map((event) => (
            <div key={event.id} className="bg-white text-black rounded-lg shadow-lg p-4 mb-4 w-full max-w-md">
              <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
              <p className="text-gray-700 mb-2">Date: {new Date(event.start).toLocaleDateString()}</p>
              <p className="text-gray-700">Description: {event.description || "No description available."}</p>
              <p className="text-gray-700">Price: ${formatPrice(event.price)}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No participations found.</p>
      )}
    </div>
  );
}

export default ParticipationsPage;
