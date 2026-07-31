import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext.jsx";
import logo from "../images/logo.png";
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
  const [navSearch, setNavSearch] = useState("");
  const navigate = useNavigate();
  const { user, logout } = useAuth(); //get user from the context

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter" && navSearch.trim()) {
      navigate(`/all-books?query=${encodeURIComponent(navSearch.trim())}`);
      setNavSearch("");
      setMenuOpen(false);
    }
  };

  return (
    <div>
      <nav className="sticky top-0 bg-white/80 backdrop-blur-xl m-4 overflow-hidden shadow-md rounded-xl z-50 border border-white/60">
        <div className="nav max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="logo flex items-center h-10 gap-10">
            <img
              src={logo}
              alt="myLogo"
              className="h-10 w-20 object-cover rounded"
            />
            <ul className="nav-links hidden md:flex space-x-8 items-center text-white">
              <li
                onClick={() => navigate("/all-books")}
                className="hover:text-purple-500 text-black font-semibold transition-colors duration-300 cursor-pointer"
              >
                All books
              </li>
              <li className="hover:text-purple-500 text-black font-semibold transition-colors duration-300 cursor-pointer">
                <a href="#">New Arrivals</a>
              </li>
              <li className="hover:text-purple-500 text-black font-semibold transition-colors duration-300 cursor-pointer">
                <a href="#">About</a>
              </li>
            </ul>
          </div>

          <div className="flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-2 text-md">
                <input
                  type="button"
                  value="Profile"
                  name="login"
                  onClick={() => navigate("/profile")}
                  className="px-4 py-1.5 rounded-lg bg-purple-800 hover:bg-purple-900 text-white font-semibold transition-colors duration-300 hidden sm:block cursor-pointer text-sm"
                />
                <DarkMode />
                <button
                  className="md:hidden text-gray-600 focus:outline-none p-1"
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  <span className="block w-6 h-0.5 bg-gray-600 mb-1"></span>
                  <span className="block w-6 h-0.5 bg-gray-600 mb-1"></span>
                  <span className="block w-6 h-0.5 bg-gray-600"></span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-md">
                <input
                  type="button"
                  value="Login/SignUp"
                  name="login"
                  onClick={() => navigate("/student-login")}
                  className="px-4 py-1.5 rounded-lg bg-purple-800 hover:bg-purple-900 text-white font-semibold transition-colors duration-300 hidden sm:block cursor-pointer text-sm"
                />
                <DarkMode />
                <button
                  className="md:hidden text-gray-600 focus:outline-none p-1"
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  <span className="block w-6 h-0.5 bg-gray-600 mb-1"></span>
                  <span className="block w-6 h-0.5 bg-gray-600 mb-1"></span>
                  <span className="block w-6 h-0.5 bg-gray-600"></span>
                </button>
              </div>
            )}
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-gray-100 px-4 py-4 border-t border-gray-200">
            {/* Mobile Search Bar */}
            <div className="relative mb-3">
              <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-gray-400 text-sm">
                🔍
              </span>
              <input
                type="search"
                placeholder="Search catalog..."
                value={navSearch}
                onChange={(e) => setNavSearch(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                className="w-full py-2 pl-8 pr-3 rounded-lg bg-white text-black text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all border border-gray-200"
              />
            </div>

            <div className="flex items-center justify-between mb-4">
              {user ? (
                <input
                  type="button"
                  value="Profile"
                  name="login"
                  onClick={() => {
                    navigate("/profile");
                    setMenuOpen(false);
                  }}
                  className="px-4 py-2 rounded-lg bg-purple-800 hover:bg-purple-900 text-white font-semibold transition-colors duration-300 cursor-pointer text-sm"
                />
              ) : (
                <input
                  type="button"
                  value="Login/SignUp"
                  name="login"
                  onClick={() => {
                    navigate("/student-login");
                    setMenuOpen(false);
                  }}
                  className="px-4 py-2 rounded-lg bg-purple-800 hover:bg-purple-900 text-white font-semibold transition-colors duration-300 cursor-pointer text-sm"
                />
              )}
            </div>

            <ul className="space-y-2">
              <li>
                <span
                  onClick={() => {
                    navigate("/all-books");
                    setMenuOpen(false);
                  }}
                  className="block py-2 text-purple-600 hover:text-black font-semibold transition-colors duration-300 cursor-pointer"
                >
                  All Books
                </span>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 text-purple-600 hover:text-black font-semibold transition-colors duration-300"
                >
                  New Arrivals
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 text-purple-600 hover:text-black font-semibold transition-colors duration-300"
                >
                  About
                </a>
              </li>
            </ul>
          </div>
        )}

        {user && (
          <div className="w-full bg-violet-50 border-t border-violet-100">
            <p className="font-semibold font-sans text-center text-violet-700 text-sm p-1 pb-1.5">
              Welcome back,{" "}
              <span className="font-bold">
                {user.name ?? user.email ?? "Member"}
              </span>
              ! 👋
            </p>
          </div>
        )}
      </nav>
    </div>
  );
}

export default Navigation;
