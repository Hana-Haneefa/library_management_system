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
import QRScannerPage from "./pages/QRscannerPage.jsx";

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

import BookView from "./components/BookView.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";

import Profile from "./components/Profile.jsx";
import AllBooksPage from "./pages/AllBooksPage.jsx";
import LibrarianDashboard from "./pages/LibrarianDashboard.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      {/*  dynamic route for book details : BOOK RELATED */}
      <Route path="/book/:bookId" element={<BookView />} />
      <Route path="/verify-return/:bookId" element={<QRScannerPage />} />
      <Route path="/all-books" element={<AllBooksPage />} />

      <Route path="/category" element={<CategoryPage />} />
      <Route path="/profile" element={<Profile />} />
      {/* STUDENT management */}
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/add-student" element={<AddStudentForm />} />
      {/* LIBRARIAN management */}
      <Route path="/add-librarian" element={<AddLibrarianForm />} />
      <Route path="/librarian-dashboard" element={<LibrarianDashboard />} />

      {/* login routes */}
      <Route path="/student-login" element={<StudentLogin />} />
      <Route path="/librarian-login" element={<LibrarianLogin />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      {/* register routes */}
      <Route path="/admin-register" element={<AddAdminForm />} />
    </Routes>
  );
}

export default App;
