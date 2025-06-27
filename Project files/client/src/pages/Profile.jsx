import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Profile() {
  const [profile, setProfile] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`https://learnhub-backend-qtw7.onrender.com/api/users/${user.id}/profile`);
        setProfile(res.data);
      } catch (err) {
        console.error('Failed to fetch profile', err);
      }
    };
    fetchProfile();
  }, [user.id]);

  if (!profile) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 bg-white shadow rounded-md max-w-lg mx-auto mt-10">
      <h2 className="text-2xl font-bold text-indigo-700 mb-4">👤 User Profile</h2>
      <p><strong>Name:</strong> {profile.name}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>Role:</strong> {profile.role}</p>
      <p><strong>Enrolled Courses:</strong> {profile.enrolledCount}</p>
    </div>
  );
}

export default Profile;
