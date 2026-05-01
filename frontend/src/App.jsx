import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/authContext.jsx";
import { Navigation } from "./components/navbar.jsx";
import "./App.css";

function App() {
  return <Navigation />;
}

export default App;
