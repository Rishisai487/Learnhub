import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [courses, setCourses] = useState([]);
  const [activeComments, setActiveComments] = useState(null); // Toggle state

  useEffect(() => {
    if (!user) return;

    const fetchEnrolled = async () => {
      try {
        const res = await axios.get(`https://learnhub-backend-qtw7.onrender.com/api/users/${user.id}/courses`);
        setCourses(res.data);
      } catch (err) {
        console.error("Failed to fetch enrolled courses", err);
      }
    };

    fetchEnrolled();
  }, [user?.id]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg">
        You must be logged in to view this page.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white px-4 sm:px-8 py-10">
      <div className="max-w-5xl mx-auto">
        {/* Welcome Banner */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-indigo-700">Welcome, {user?.name || "Learner"}!</h1>
          <p className="text-gray-600 mt-2">Here’s your personalized dashboard on LearnHub.</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          <Link to="/courses">
            <div className="bg-white hover:bg-indigo-50 p-6 rounded-xl shadow transition">
              <h3 className="text-xl font-semibold text-indigo-700">📚 Browse Courses</h3>
              <p className="text-gray-600 mt-2 text-sm">Find and enroll in curated learning resources.</p>
            </div>
          </Link>

          {user?.role === 'admin' && (
            <Link to="/upload">
              <div className="bg-white hover:bg-blue-50 p-6 rounded-xl shadow transition">
                <h3 className="text-xl font-semibold text-blue-700">📤 Upload Course</h3>
                <p className="text-gray-600 mt-2 text-sm">Contribute new material to the platform.</p>
              </div>
            </Link>
          )}
        </div>

        {/* Enrolled Courses */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">🎓 Enrolled Courses ({courses.length})</h2>

          {courses.length === 0 ? (
            <p className="text-gray-500">You haven't enrolled in any courses yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {courses.map((course) => (
                <div key={course._id} className="bg-white p-5 rounded-lg shadow hover:shadow-md transition">
                  <h4 className="text-lg font-semibold text-indigo-700">{course.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{course.description}</p>
                  <p className="text-sm mt-2">
                    <span className="font-medium text-gray-700">Category:</span> {course.category}
                  </p>

                  {course.file && (
                    <div className="mt-3">
                      {course.file.endsWith('.pdf') ? (
                        <iframe
                          src={`https://learnhub-backend-qtw7.onrender.com/uploads/${course.file}`}
                          title="PDF"
                          width="100%"
                          height="200"
                          className="rounded border"
                        />
                      ) : course.file.endsWith('.mp4') ? (
                        <video
                          src={`https://learnhub-backend-qtw7.onrender.com/uploads/${course.file}`}
                          controls
                          className="w-full rounded"
                        />
                      ) : (
                        <a
                          href={`https://learnhub-backend-qtw7.onrender.com/uploads/${course.file}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-block mt-2 text-blue-500 hover:underline text-sm"
                        >
                          📎 View File
                        </a>
                      )}
                    </div>
                  )}

                  <button
                    onClick={() =>
                      setActiveComments(activeComments === course._id ? null : course._id)
                    }
                    className="mt-4 text-sm text-indigo-600 hover:underline"
                  >
                    {activeComments === course._id ? 'Hide Comments' : '💬 View Comments'}
                  </button>

                  {activeComments === course._id && (
                    <div className="mt-3 border-t pt-3 text-sm text-gray-600">
                      Comments will go here (backend integration soon).
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
