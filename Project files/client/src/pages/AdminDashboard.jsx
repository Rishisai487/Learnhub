import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminDashboard() {
  const [stats, setStats] = useState({ totalUsers: 0, totalCourses: 0 });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      const res = await axios.get('https://learnhub-backend-qtw7.onrender.com/api/users/admin/stats');
      setStats(res.data);
    };

    const fetchUsers = async () => {
      const res = await axios.get('https://learnhub-backend-qtw7.onrender.com/api/users/admin/users');
      setUsers(res.data);
    };



    fetchStats();
    fetchUsers();
  }, []);

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-indigo-700">Admin Dashboard</h2>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-sm text-gray-500">Total Users</p>
          <p className="text-xl font-semibold">{stats.totalUsers}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-sm text-gray-500">Total Courses</p>
          <p className="text-xl font-semibold">{stats.totalCourses}</p>
        </div>
      </div>

      <h3 className="text-xl font-semibold mb-4 text-gray-800">All Users</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border shadow-sm">
          <thead>
            <tr className="bg-gray-100 text-left text-sm text-gray-600">
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="text-sm">
                <td className="py-2 px-4 border-b">{user.name}</td>
                <td className="py-2 px-4 border-b">{user.email}</td>
                <td className="py-2 px-4 border-b">{user.role || 'student'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;
