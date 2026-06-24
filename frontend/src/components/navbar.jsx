import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext.jsx";
import logo from "../images/testimg.jpg";
import DarkMode from "./darkmode.jsx";

// Add this component
// function DarkMode() {
//   const [dark, setDark] = useState(false);

//   const toggleDark = () => {
//     setDark(!dark);
//     document.documentElement.classList.toggle("dark");
//   };

//   return (
//     <button
//       onClick={toggleDark}
//       className="px-2 py-1 rounded bg-gray-700 hover:bg-gray-600 text-white text-sm transition-colors duration-300"
//     >
//       {dark ? "☀️" : "🌙"}
//     </button>
//   );
// }

export function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth(); //get user from the context

  return (
    <div>
      <nav className="sticky top-0 bg-white/20 backdrop:blur-2xl m-4 overflow-hidden shadow-md rounded-xl z-50">
        <div className="nav max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="logo flex items-center h-10 gap-10">
            <img src={logo} alt="myLogo" className="h-10 w-20 object-cover" />
            <ul className="nav-links hidden md:flex space-x-8 items-center text-white">
              <li className="hover:text-purple-500 text-black font-semibold transition-colors duration-300 cursor-pointer">
                <a href="./modal.html">All books</a>
              </li>
              <li className="hover:text-purple-500 text-black font-semibold transition-colors duration-300 cursor-pointer">
                <a href="#">New Arrivals</a>
              </li>
              <li className="hover:text-purple-500 text-black font-semibold transition-colors duration-300 cursor-pointer">
                <a href="#">About</a>
              </li>
            </ul>
          </div>

          {user ? (
            <div className="flex items-center gap-1 text-gray-300 text-md">
              <input
                type="search"
                placeholder="   Search here"
                className="py-1 rounded bg-gray-200 text-black hidden sm:block"
              />
              <input
                type="button"
                value="Profile"
                name="login"
                onClick={() => navigate("/profile")}
                className="px-3 py-1 rounded bg-purple-800 hover:bg-purple-900 transition-colors duration-300 hidden sm:block cursor-pointer"
              />
              <DarkMode />
              <button
                className="md:hidden text-gray-300 focus:outline-none ml-2"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <span className="block w-6 h-0.5 bg-gray-300 mb-1"></span>
                <span className="block w-6 h-0.5 bg-gray-300 mb-1"></span>
                <span className="block w-6 h-0.5 bg-gray-300"></span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1 text-gray-300 text-md">
              <input
                type="search"
                placeholder="   Search here"
                className="py-1 rounded bg-gray-200 text-black hidden sm:block"
              />
              <input
                type="button"
                value="Login/SignUp"
                name="login"
                onClick={() => navigate("/student-login")}
                className="px-3 py-1 rounded bg-purple-800 hover:bg-purple-900 transition-colors duration-300 hidden sm:block cursor-pointer"
              />
              <DarkMode />
              <button
                className="md:hidden text-gray-300 focus:outline-none ml-2"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <span className="block w-6 h-0.5 bg-gray-300 mb-1"></span>
                <span className="block w-6 h-0.5 bg-gray-300 mb-1"></span>
                <span className="block w-6 h-0.5 bg-gray-300"></span>
              </button>
            </div>
          )}
        </div>

        {menuOpen && (
          <div className="md:hidden bg-gray-200 px-4 py-4">
            {user ? (
              <div className="flex items-center gap-1 text-gray-300 text-md">
                <input
                  type="search"
                  placeholder="   Search here"
                  className="py-1 rounded bg-gray-200 text-black hidden sm:block"
                />
                <input
                  type="button"
                  value="Profile"
                  name="login"
                  onClick={() => navigate("/profile")}
                  className="px-3 py-1 rounded bg-purple-800 hover:bg-purple-900 transition-colors duration-300 hidden sm:block cursor-pointer"
                />
                <DarkMode />
                <button
                  className="md:hidden text-gray-300 focus:outline-none ml-2"
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  <span className="block w-6 h-0.5 bg-gray-300 mb-1"></span>
                  <span className="block w-6 h-0.5 bg-gray-300 mb-1"></span>
                  <span className="block w-6 h-0.5 bg-gray-300"></span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1 text-gray-300 text-md">
                <input
                  type="search"
                  placeholder="   Search here"
                  className="py-1 rounded bg-gray-200 text-black hidden sm:block"
                />
                <input
                  type="button"
                  value="Login/SignUp"
                  name="login"
                  onClick={() => navigate("/student-login")}
                  className="px-3 py-1 rounded bg-purple-800 hover:bg-purple-900 transition-colors duration-300 hidden sm:block cursor-pointer"
                />
                <DarkMode />
                <button
                  className="md:hidden text-gray-300 focus:outline-none ml-2"
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  <span className="block w-6 h-0.5 bg-gray-300 mb-1"></span>
                  <span className="block w-6 h-0.5 bg-gray-300 mb-1"></span>
                  <span className="block w-6 h-0.5 bg-gray-300"></span>
                </button>
              </div>
            )}
            <ul>
              <li>
                <a
                  href="./modal.html"
                  className="block py-2 text-purple-500 hover:text-black transition-colors duration-300"
                >
                  All Books
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 text-purple-500 hover:text-black transition-colors duration-300"
                >
                  New Arrivals
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 text-purple-500 hover:text-black transition-colors duration-300"
                >
                  About
                </a>
              </li>
            </ul>
          </div>
        )}

        <div className="w-full bg-purple-100">
          <h2 className="font-bold font-sans text-center p-1 pb-2">
            Welcome Guest!
          </h2>
        </div>
      </nav>
    </div>
  );
}

export default Navigation;
