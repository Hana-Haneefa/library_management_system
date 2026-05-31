import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
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
import StudentLogin from "./components/studentManage/studentLogin.jsx";
//librarian management
import AddLibrarianForm from "./components/librarianManage/AddLibrarian.jsx";
import LibrarianLogin from "./components/librarianManage/LibrarianLogin.jsx";

//admin management
import AddAdminForm from "./components/adminManage/AddAdmin.jsx";
import AdminLogin from "./components/adminManage/AdminLogin.jsx";

function App() {
  return (
    <div>
      <HomePage />
    </div>
  );
}

export default App;
