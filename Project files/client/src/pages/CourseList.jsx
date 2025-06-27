import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CommentSection from '../components/CommentSection';

function CourseList() {
  const [courses, setCourses] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [category, setCategory] = useState('');
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get('https://learnhub-backend-qtw7.onrender.com/api/courses/all');
        setCourses(res.data);
        setFiltered(res.data);
      } catch (err) {
        console.error('Error fetching courses:', err);
      }
    };
    fetchCourses();
  }, []);

  const handleFilter = () => {
    if (!category.trim()) return setFiltered(courses);
    const match = courses.filter(c =>
      c.category.toLowerCase().includes(category.toLowerCase())
    );
    setFiltered(match);
  };

  const handleEnroll = async (course) => {
    if (course.isPaid && course.price > 0) {
      const confirm = window.confirm(`This course costs ₹${course.price}. Proceed to payment?`);
      if (!confirm) return;

      // Simulate payment
      alert("✅ Payment successful!");
    }

    try {
      await axios.post('https://learnhub-backend-qtw7.onrender.com/api/enroll/enroll', {
        userId: user.id,
        courseId: course._id
      });
      alert("🎉 Enrolled successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Enrollment failed");
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-course/${id}`);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      await axios.delete(`https://learnhub-backend-qtw7.onrender.com/api/courses/${id}`);
      setCourses(prev => prev.filter(c => c._id !== id));
      setFiltered(prev => prev.filter(c => c._id !== id));
    } catch (err) {
      console.error("Failed to delete course", err);
    }
  };

  return (
    <div className="min-h-screen px-6 py-10 bg-gray-100">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">📚 All Courses</h2>

      <div className="mb-6 flex items-center space-x-4">
        <input
          type="text"
          placeholder="Filter by category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2 rounded-md border focus:ring focus:ring-indigo-300"
        />
        <button
          onClick={handleFilter}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
        >
          Filter
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {filtered.length > 0 ? (
          filtered.map((course) => (
            <div
              key={course._id}
              className="bg-white p-6 rounded-lg shadow hover:shadow-md transition"
            >
              <h3 className="text-lg font-semibold text-indigo-700">{course.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{course.description}</p>
              <p className="text-sm mt-2">
                <strong className="text-gray-700">Category:</strong> {course.category}
              </p>

              {course.isPaid && (
                <p className="text-sm mt-1 text-red-500 font-medium">💰 Price: ₹{course.price}</p>
              )}

              {course.file && (
                <div className="mt-4">
                  {course.file.endsWith('.pdf') ? (
                    <>
                      <iframe
                        src={`https://learnhub-backend-qtw7.onrender.com/uploads/${course.file}`}
                        title="PDF Preview"
                        width="100%"
                        height="300"
                        className="rounded-md border"
                      />
                      <a
                        href={`https://learnhub-backend-qtw7.onrender.com/uploads/${course.file}`}
                        target="_blank"
                        rel="noreferrer"
                        className="block text-blue-500 mt-2 hover:underline text-sm"
                      >
                        📎 View File
                      </a>
                    </>
                  ) : course.file.endsWith('.mp4') ? (
                    <>
                      <video
                        src={`https://learnhub-backend-qtw7.onrender.com/uploads/${course.file}`}
                        controls
                        className="rounded-md w-full mt-2"
                      />
                      <a
                        href={`https://learnhub-backend-qtw7.onrender.com/uploads/${course.file}`}
                        target="_blank"
                        rel="noreferrer"
                        className="block text-blue-500 mt-2 hover:underline text-sm"
                      >
                        📎 View File
                      </a>
                    </>
                  ) : (
                    <a
                      href={`https://learnhub-backend-qtw7.onrender.com/uploads/${course.file}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block text-sm text-blue-500 hover:underline"
                    >
                      📎 View File
                    </a>
                  )}
                </div>
              )}

              {user && (
                <button
                  onClick={() => handleEnroll(course)}
                  className="mt-4 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
                >
                  {course.isPaid ? `Buy ₹${course.price}` : 'Enroll'}
                </button>
              )}

              {user?.role === 'admin' && (
                <div className="mt-4 flex justify-between text-sm">
                  <button
                    onClick={() => handleEdit(course._id)}
                    className="text-yellow-500 hover:underline"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(course._id)}
                    className="text-red-500 hover:underline"
                  >
                    ❌ Delete
                  </button>
                </div>
              )}

              <div className="mt-6">
                <CommentSection courseId={course._id} />
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No courses found.</p>
        )}
      </div>
    </div>
  );
}

export default CourseList;
