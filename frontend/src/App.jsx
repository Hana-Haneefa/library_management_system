import { Routes, Route } from "react-router-dom";
import { useAuth } from "./context/authContext.jsx";
import "./index.css";
import { Navigation } from "./components/Navbar.jsx";
import { Footer } from "./components/Footer.jsx";
import HeroSec from "./components/HeroSection.jsx";
import HomePage from "./pages/HomePage.jsx";
import BookCard from "./components/Card.jsx";
//book management
import AddBookForm from "./components/bookManage/AddBookForm.jsx";
//student management
import AddStudentForm from "./components/studentManage/addStudentForm.jsx";
import StudentLogin from "./components/studentManage/StudentLogin.jsx";
//librarian management
import AddLibrarianForm from "./components/librarianManage/AddLibrarian.jsx";
import LibrarianLogin from "./components/librarianManage/LibrarianLogin.jsx";

//admin management
import AddAdminForm from "./components/adminManage/AddAdmin.jsx";
import AdminLogin from "./components/adminManage/AdminLogin.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      {/* student management */}
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/add-student" element={<AddStudentForm />} />

      {/* librarian management */}
      <Route path="/add-librarian" element={<AddLibrarianForm />} />
    </Routes>
  );
}

export default App;
