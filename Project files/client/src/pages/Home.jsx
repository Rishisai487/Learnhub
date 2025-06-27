import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-white flex flex-col items-center justify-center px-4 text-center">
      <motion.h1
        className="text-4xl sm:text-5xl font-bold text-indigo-700 mb-4"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        LearnHub: Level Up Your Skills
      </motion.h1>

      <motion.p
        className="text-gray-600 text-lg max-w-xl mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        Discover and enroll in curated skill-based courses. Upload, manage, and track your progress.
      </motion.p>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <Link
          to="/login"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full font-semibold shadow-md transition"
        >
          Get Started
        </Link>
      </motion.div>
    </div>
  );
}

export default Home;
