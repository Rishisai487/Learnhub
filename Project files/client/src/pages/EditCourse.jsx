import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditCourse() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState({
    title: '',
    description: '',
    category: '',
    file: null,
  });

  // Fetch course on load
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`https://learnhub-backend-qtw7.onrender.com/api/courses/all`);
        const found = res.data.find(c => c._id === id);
        if (found) {
          setCourse({
            title: found.title,
            description: found.description,
            category: found.category,
            file: null, // reset file field
          });
        }
      } catch (err) {
        console.error('Error fetching course:', err);
      }
    };
    fetchCourse();
  }, [id]);

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setCourse({ ...course, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', course.title);
    formData.append('description', course.description);
    formData.append('category', course.category);
    formData.append('userId', JSON.parse(localStorage.getItem('user')).id);

    if (course.file instanceof File) {
      formData.append('file', course.file);
    }

    try {
      await axios.put(`https://learnhub-backend-qtw7.onrender.com/api/courses/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Course updated successfully!');
      navigate('/courses');
    } catch (err) {
      alert('Failed to update course');
      console.error(err);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-12 px-4">
      <h2 className="text-2xl font-bold text-indigo-700 mb-6">✏️ Edit Course</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 space-y-4"
        encType="multipart/form-data"
      >
        <input
          type="text"
          name="title"
          value={course.title}
          onChange={handleChange}
          placeholder="Course Title"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          required
        />
        <textarea
          name="description"
          value={course.description}
          onChange={handleChange}
          placeholder="Course Description"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          required
        ></textarea>
        <input
          type="text"
          name="category"
          value={course.category}
          onChange={handleChange}
          placeholder="Category"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          required
        />
        <input
          type="file"
          name="file"
          onChange={handleFileChange}
          className="w-full px-4 py-2 border rounded-md"
        />

        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition w-full"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditCourse;
