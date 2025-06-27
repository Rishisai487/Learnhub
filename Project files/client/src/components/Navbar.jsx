import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const linkStyle = ({ isActive }) =>
    `block px-4 py-2 rounded ${
      isActive
        ? 'text-indigo-700 font-semibold'
        : 'text-gray-700 hover:text-indigo-600'
    }`;

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
        {/* Brand */}
        <div className="text-xl font-bold text-indigo-700">
          <NavLink to="/">LearnHub</NavLink>
        </div>

        {/* Hamburger for mobile */}
        <div className="sm:hidden">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-gray-600 focus:outline-none"
          >
            ☰
          </button>
        </div>

        {/* Desktop Nav links */}
        <div className="hidden sm:flex space-x-4 items-center">
          <NavLink to="/" className={linkStyle}>Home</NavLink>
          <NavLink to="/dashboard" className={linkStyle}>Dashboard</NavLink>

          {!user ? (
            <>
              <NavLink to="/login" className={linkStyle}>Login</NavLink>
              <NavLink to="/signup" className={linkStyle}>Signup</NavLink>
            </>
          ) : (
            <>
              {user.role === "admin" && (
                <NavLink to="/admin" className={linkStyle}>Admin</NavLink>
              )}
              {(user.role === "admin" || user.role === "instructor") && (
                <NavLink to="/upload" className={linkStyle}>Upload</NavLink>
              )}
              <NavLink to="/courses" className={linkStyle}>Courses</NavLink>
              <NavLink to="/my-courses" className={linkStyle}>My Courses</NavLink>
              <NavLink to="/profile" className={linkStyle}>Profile</NavLink>
              <button
                onClick={handleLogout}
                className="text-red-500 hover:text-red-700 font-medium ml-2"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>

      {/* Mobile Nav links */}
      {mobileOpen && (
        <div className="sm:hidden bg-white px-4 pb-4 space-y-2">
          <NavLink to="/" className={linkStyle} onClick={() => setMobileOpen(false)}>Home</NavLink>
          <NavLink to="/dashboard" className={linkStyle} onClick={() => setMobileOpen(false)}>Dashboard</NavLink>

          {!user ? (
            <>
              <NavLink to="/login" className={linkStyle} onClick={() => setMobileOpen(false)}>Login</NavLink>
              <NavLink to="/signup" className={linkStyle} onClick={() => setMobileOpen(false)}>Signup</NavLink>
            </>
          ) : (
            <>
              {user.role === "admin" && (
                <NavLink to="/admin" className={linkStyle} onClick={() => setMobileOpen(false)}>Admin</NavLink>
              )}
              {(user.role === "admin" || user.role === "instructor") && (
                <NavLink to="/upload" className={linkStyle} onClick={() => setMobileOpen(false)}>Upload</NavLink>
              )}
              <NavLink to="/courses" className={linkStyle} onClick={() => setMobileOpen(false)}>Courses</NavLink>
              <NavLink to="/my-courses" className={linkStyle} onClick={() => setMobileOpen(false)}>My Courses</NavLink>
              <NavLink to="/profile" className={linkStyle} onClick={() => setMobileOpen(false)}>Profile</NavLink>
              <button
                onClick={() => {
                  setMobileOpen(false);
                  handleLogout();
                }}
                className="text-red-500 hover:text-red-700 font-medium"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
