import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/authContext.jsx";
import "./index.css";
import { Navigation } from "./components/navbar.jsx";
import { Footer } from "./components/footer.jsx";
import HeroSec from "./components/heroSection.jsx";
// import { Button } from "flowbite-react";

function App() {
  return (
    <div>
      <HeroSec />
    </div>
  );
}

export default App;
