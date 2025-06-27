import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MyCourses() {
  const [courses, setCourses] = useState([]);
  const [activeComments, setActiveComments] = useState(null); // Track active comment section
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        const res = await axios.get(`https://learnhub-backend-qtw7.onrender.com/api/users/${user.id}/courses`);
        setCourses(res.data);
      } catch (err) {
        console.error('Failed to load courses:', err);
      }
    };

    fetchEnrolledCourses();
  }, [user.id]);

  return (
    <div className="min-h-screen px-6 py-10 bg-gray-100">
      <h2 className="text-3xl font-bold text-indigo-700 mb-6">🎓 My Enrolled Courses</h2>

      {courses.length === 0 ? (
        <p className="text-gray-600">You have not enrolled in any courses yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {courses.map((course) => (
            <div
              key={course._id}
              className="bg-white p-6 rounded-lg shadow hover:shadow-md transition"
            >
              <h3 className="text-xl font-semibold text-indigo-700">{course.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{course.description}</p>
              <p className="text-sm mt-2">
                <strong className="text-gray-700">Category:</strong> {course.category}
              </p>

              {course.file && (
                <div className="mt-4">
                  {course.file.endsWith('.pdf') ? (
                    <iframe
                      src={`https://learnhub-backend-qtw7.onrender.com/uploads/${course.file}`}
                      title="PDF"
                      width="100%"
                      height="200"
                      className="rounded-md border"
                    />
                  ) : course.file.endsWith('.mp4') ? (
                    <video
                      src={`https://learnhub-backend-qtw7.onrender.com/uploads/${course.file}`}
                      controls
                      className="w-full rounded-md"
                    />
                  ) : (
                    <a
                      href={`https://learnhub-backend-qtw7.onrender.com/uploads/${course.file}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-500 hover:underline text-sm"
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
                  Comments will appear here (backend integration next).
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyCourses;
