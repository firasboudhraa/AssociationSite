"use client"
import React from 'react';
import CountUp from 'react-countup';
import { FaProjectDiagram, FaDonate, FaUsers, FaHandsHelping } from 'react-icons/fa';
import { motion } from 'framer-motion';

const SuccessSection = () => {
  return (
    <section className="success-section py-16 bg-gradient-to-r from-purple-200 to-indigo-700">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-5xl font-bold mb-8 text-white">Our Milestones</h2>
        <p className="text-lg mb-12 text-gray-200">See how our efforts have grown and the milestones we've reached.</p>
        
        <div className="metrics grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <motion.div
            className="metric bg-gradient-to-r from-indigo-400 to-purple-600 p-8 rounded-lg shadow-lg transform transition-transform duration-500 hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaProjectDiagram className="text-6xl text-white mb-4 mx-auto" />
            <h3 className="text-2xl font-semibold mb-2 text-white">Projects Completed</h3>
            <p className="text-4xl font-bold text-yellow-200">
              <CountUp end={120} duration={3} />
            </p>
          </motion.div>
          <motion.div
            className="metric bg-gradient-to-r from-blue-400 to-teal-500 p-8 rounded-lg shadow-lg transform transition-transform duration-500 hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaDonate className="text-6xl text-white mb-4 mx-auto" />
            <h3 className="text-2xl font-semibold mb-2 text-white">Donations Received</h3>
            <p className="text-4xl font-bold text-white">
              <CountUp end={50000} duration={3} prefix="$" />
            </p>
          </motion.div>
          <motion.div
            className="metric bg-gradient-to-r from-teal-400 to-blue-600 p-8 rounded-lg shadow-lg transform transition-transform duration-500 hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaUsers className="text-6xl text-white mb-4 mx-auto" />
            <h3 className="text-2xl font-semibold mb-2 text-white">Beneficiaries Served</h3>
            <p className="text-4xl font-bold text-yellow-200">
              <CountUp end={10000} duration={3} />
            </p>
          </motion.div>
          <motion.div
            className="metric bg-gradient-to-r from-purple-500 to-indigo-600 p-8 rounded-lg shadow-lg transform transition-transform duration-500 hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaHandsHelping className="text-6xl text-white mb-4 mx-auto" />
            <h3 className="text-2xl font-semibold mb-2 text-white">Volunteers Joined</h3>
            <p className="text-4xl font-bold text-yellow-200">
              <CountUp end={800} duration={3} />
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SuccessSection;
