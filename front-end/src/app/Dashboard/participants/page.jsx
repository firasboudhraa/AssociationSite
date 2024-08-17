"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal'; 
import { motion } from 'framer-motion';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [participantsMap, setParticipantsMap] = useState({});
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const result = await axios.get('http://localhost:8000/api/events');
        setEvents(result.data);
      } catch (err) {
        setError("Failed to fetch events");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    const fetchParticipantsForEvents = async () => {
      const fetchParticipants = async (eventId) => {
        try {
          const result = await axios.get(`http://localhost:8000/api/events/${eventId}/participants`);
          return result.data;
        } catch (err) {
          console.error("Failed to fetch participants", err);
          return [];
        }
      };

      const newParticipantsMap = {};
      for (const event of events) {
        newParticipantsMap[event.id] = await fetchParticipants(event.id);
      }
      setParticipantsMap(newParticipantsMap);
    };

    if (events.length > 0) {
      fetchParticipantsForEvents();
    }
  }, [events]);

  const formatPrice = (price) => {
    if (price === undefined || price === null) {
      return "$0.00";
    }

    const numericPrice = parseFloat(price);

    if (isNaN(numericPrice)) {
      return "$0.00"; // Fallback if price is not a valid number
    }

    return `$${numericPrice.toFixed(2)}`;
  };

  const handleOpenModal = (event) => {
    setSelectedEvent(event);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  if (loading) return <p className="text-center text-xl">Loading...</p>;
  if (error) return <p className="text-center text-xl text-red-500">{error}</p>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-gradient bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-500">
        Upcoming Events
      </h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <motion.div
            key={event.id}
            className="bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 rounded-lg shadow-lg overflow-hidden border border-gray-200 transition-transform transform hover:scale-105 hover:shadow-xl relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative bg-gray-800 h-48 flex items-center justify-center">
              {event.image ? (
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-white text-xl font-bold"></div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50"></div>
              <div className="absolute bottom-0 left-0 p-4 text-white z-10">
                <h2 className="text-2xl font-semibold">{event.title}</h2>
                <p className="text-sm">{new Date(event.start).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-100 mb-4">{event.description || "No description available."}</p>
              <p className="text-gray-100 font-semibold text-lg">Price: {formatPrice(event.price)}</p>
            </div>

            {/* Participants List */}
            <div className="p-6 border-t border-gray-200 bg-gray-800 text-gray-100">
              <h3 className="text-xl font-semibold mb-2">Participants</h3>
              {participantsMap[event.id] && participantsMap[event.id].length > 0 ? (
                <ul className="list-disc pl-5">
                  {participantsMap[event.id].map((participant) => (
                    <li key={participant.id} className="mb-2">
                      {participant.name} ({participant.email})
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No participants yet.</p>
              )}
            </div>

            {/* Action Button */}
            <div className="absolute top-4 right-4">
              <button
                className="bg-teal-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-teal-600 transition-colors"
                onClick={() => handleOpenModal(event)}
              >
                View Details
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal for Event Details */}
      <Modal
        isOpen={!!selectedEvent}
        onRequestClose={handleCloseModal}
        className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-75"
        overlayClassName="fixed inset-0 bg-black bg-opacity-75"
        contentLabel="Event Details"
      >
        {selectedEvent && (
          <div className="relative p-6 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 rounded-lg max-w-lg w-full">
            <button
              className="absolute top-4 right-4 text-2xl font-bold text-gray-700 hover:text-gray-900"
              onClick={handleCloseModal}
            >
              &times;
            </button>
            <h2 className="text-3xl font-bold mb-4 text-gray-900">{selectedEvent.title}</h2>
            <img
              src={selectedEvent.image || "/noavatar.png"}
              alt={selectedEvent.title}
              className="w-full h-64 object-cover mb-4 border-4 border-gray-300"
            />
            <p className="text-lg mb-4 text-gray-800">{selectedEvent.description || "No description available."}</p>
            <p className="text-lg font-semibold mb-4 text-gray-800">Price: {formatPrice(selectedEvent.price)}</p>
            <p className="text-lg mb-4 text-gray-800">Date: {new Date(selectedEvent.start).toLocaleDateString()}</p>
            <h3 className="text-xl font-semibold mb-2 text-black">Participants</h3>
            {participantsMap[selectedEvent.id] && participantsMap[selectedEvent.id].length > 0 ? (
              <ul className="list-disc pl-5 text-gray-800">
                {participantsMap[selectedEvent.id].map((participant) => (
                  <li key={participant.id} className="mb-2">
                    {participant.name} ({participant.email})
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No participants yet.</p>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default EventsPage;
