import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/authContext.jsx";
import "./index.css";
import { Navigation } from "./components/navbar.jsx";
import { Footer } from "./components/footer.jsx";
import HeroSec from "./components/heroSection.jsx";
import HomePage from "./pages/homePage.jsx";
//book management
import AddBookForm from "./components/bookManage/addBookForm.jsx";
//student management
import AddStudentForm from "./components/studentManage/addStudentForm.jsx";
import StudentLogin from "./components/studentManage/studentLogin.jsx";
function App() {
  return (
    <div>
      <AddStudentForm />
      <StudentLogin />
    </div>
  );
}

export default App;
