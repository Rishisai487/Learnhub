import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar'; 
import CourseUpload from './pages/CourseUpload';
import CourseList from './pages/CourseList';
import MyCourses from './pages/MyCourses';
import EditCourse from './pages/EditCourse';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

// inside your <Routes> element at the bottom:



// Inside <Routes>






function App() {
  return (
    <Router>
      <Navbar /> {/* ✅ Always visible on top */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload" element={<CourseUpload />} />
        <Route path="/courses" element={<CourseList />} />
        <Route path="/my-courses" element={<MyCourses />} />
        <Route path="/edit-course/:id" element={<EditCourse />} />
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
export default App;
