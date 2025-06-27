// src/pages/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-100 text-center">
      <h1 className="text-5xl font-bold text-indigo-600 mb-4">404</h1>
      <p className="text-lg text-gray-700 mb-6">Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition">
        Go Home
      </Link>
    </div>
  );
}

export default NotFound;
