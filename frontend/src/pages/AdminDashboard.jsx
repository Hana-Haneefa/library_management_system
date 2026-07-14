import { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import img from "../images/testimg.jpg";
import icon from "../images/icons/heart.png";
import dashboardIcon from "../images/icons/dashboard.png";
import booksIcon from "../images/icons/book.png";
import membersIcon from "../images/icons/member.png";
import borrowingsIcon from "../images/icons/borrow.png";
import finesIcon from "../images/icons/bill.png";
import reportsIcon from "../images/icons/doc.png";
import settingsIcon from "../images/icons/setting.png";
import arrowRight from "../images/icons/arrowRight.png";

import bgimg from "../images/adminBg.jpg";

// content component import
import DashboardSec from "../components/adminManage/DashboardSec";
import BookManageSec from "../components/adminManage/BookManageSec";
import MemberManage from "../components/adminManage/MemberManage";
import BorrowManageSec from "../components/adminManage/BorrowManageSec";

function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile sidebar control

  const handleLogout = () => {
    logout();
    navigate("/admin-login");
  };
  const containerRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const left = leftRef.current;
    const right = rightRef.current;

    container.style.opacity = "0";
    left.style.opacity = "0";
    left.style.transform = "translateX(-50px)";
    right.style.opacity = "0";
    right.style.transform = "translateX(50px)";

    requestAnimationFrame(() => {
      container.style.transition = "opacity 0.5s ease";
      container.style.opacity = "1";

      setTimeout(() => {
        left.style.transition = "opacity 0.5s ease, transform 0.5s ease";
        left.style.opacity = "1";
        left.style.transform = "translateX(0)";
        setTimeout(() => {
          right.style.transition = "opacity 0.5s ease, transform 0.5s ease";
          right.style.opacity = "1";
          right.style.transform = "translateX(0)";
        }, 500);
      }, 600);
    });
  }, []);

  return (
    <div className="admin-dashboard relative overflow-x-hidden">
      {/* overlay blur */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm transition-opacity duration-300"
        />
      )}

      <div
        ref={containerRef}
        className="con w-full min-h-screen flex p-2 gap-2"
        style={{
          backgroundImage: `url(${bgimg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Side Navigation Menu */}
        <div
          id="dashSideMenu"
          ref={leftRef}
          className={`fixed inset-y-0 left-0 z-40 w-72 h-screen pb-5 md:pb-0 border-b-2 border-white bg-purple-950/90 md:bg-white/20 transition-transform duration-300 md:translate-x-0 md:static md:block md:w-96 md:rounded-2xl
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          `}
          style={{
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)", // safari support
            borderColor: "rgba(167, 139, 250, 0.4)",
            borderTop: "1px solid rgba(255, 255, 255, 0.3)",
            borderRight: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow:
              "0 8px 32px rgba(80, 40, 160, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
          }}
        >
          {/* Close Button for Mobile */}
          <button
            id="dashClose"
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden flex justify-end w-full text-lg mt-5 pr-8 text-white hover:text-purple-400 cursor-pointer"
          >
            X
          </button>

          <div className="img w-24 h-24 rounded-full mx-auto mt-10 border-4 border-white shadow-md shadow-gray-800 overflow-hidden">
            <img
              src={img}
              alt="profile picture"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-gray-200 md:text-gray-500 font-semibold text-sm text-center mt-4">
            ID:{user?.hId}
          </p>

          <div className="tabs pb-5 flex flex-col items-start gap-4 mt-12 font-semibold text-lg px-5 w-full text-white">
            <p
              onClick={() => {
                setActiveSection("dashboard");
                setIsSidebarOpen(false);
              }}
              className={` ${activeSection == "dashboard" ? "bg-violet-400" : "bg-violet-400/40"} w-full px-4 py-2 rounded-lg shadow-sm border-t-2 border-right-2 border-white/40 hover:scale-105 transition-all duration-300 shadow-gray-800 flex items-center gap-4 cursor-pointer`}
            >
              <span>
                <img
                  src={dashboardIcon}
                  alt="dashboard icon"
                  className="w-7 h-7"
                />
              </span>
              Dashboard
            </p>

            <p
              onClick={() => {
                setActiveSection("books");
                setIsSidebarOpen(false);
              }}
              className={`${activeSection === "books" ? "bg-violet-400" : "bg-violet-400/40"} w-full px-4 py-2 rounded-lg shadow-sm border-t-2 border-right-2 border-white/40 hover:scale-105 transition-all duration-300 shadow-gray-800 flex items-center gap-4 cursor-pointer`}
            >
              <span>
                <img
                  src={booksIcon}
                  alt="Manage book icon"
                  className="w-7 h-7"
                />
              </span>
              Manage Books
            </p>

            <p
              onClick={() => {
                setActiveSection("members");
                setIsSidebarOpen(false);
              }}
              className={` ${activeSection == "members" ? "bg-violet-400" : "bg-violet-400/40"} w-full px-4 py-2 rounded-lg shadow-sm border-t-2 border-right-2 border-white/40 hover:scale-105 transition-all duration-300 shadow-gray-800 flex items-center gap-4 cursor-pointer`}
            >
              <span>
                <img
                  src={membersIcon}
                  alt="Manage members icon"
                  className="w-7 h-7"
                />
              </span>
              Manage Members
            </p>

            <p
              onClick={() => {
                setActiveSection("borrows");
                setIsSidebarOpen(false);
              }}
              className={` ${activeSection == "borrows" ? "bg-violet-400" : "bg-violet-400/40"} w-full px-4 py-2 rounded-lg shadow-sm border-t-2 border-right-2 border-white/40 hover:scale-105 transition-all duration-300 shadow-gray-800 flex items-center gap-4 cursor-pointer`}
            >
              <span>
                <img
                  src={borrowingsIcon}
                  alt="Manage borrowings icon"
                  className="w-7 h-7"
                />
              </span>
              Manage Borrowings
            </p>

            <p
              onClick={() => {
                setActiveSection("fines");
                setIsSidebarOpen(false);
              }}
              className={` ${activeSection == "fines" ? "bg-violet-400" : "bg-violet-400/40"} w-full px-4 py-2 rounded-lg shadow-sm border-t-2 border-right-2 border-white/40 hover:scale-105 transition-all duration-300 shadow-gray-800 flex items-center gap-4 cursor-pointer`}
            >
              <span>
                <img
                  src={finesIcon}
                  alt="Manage fines icon"
                  className="w-7 h-7"
                />
              </span>
              Manage Fines
            </p>

            <p
              onClick={() => {
                setActiveSection("reports");
                setIsSidebarOpen(false);
              }}
              className={` ${activeSection == "reports" ? "bg-violet-400" : "bg-violet-400/40"} w-full px-4 py-2 rounded-lg shadow-sm border-t-2 border-right-2 border-white/40 hover:scale-105 transition-all duration-300 shadow-gray-800 flex items-center gap-4 cursor-pointer`}
            >
              <span>
                <img src={reportsIcon} alt="Reports icon" className="w-7 h-7" />
              </span>
              Reports
            </p>

            <p
              onClick={() => {
                setActiveSection("settings");
                setIsSidebarOpen(false);
              }}
              className={` ${activeSection == "settings" ? "bg-violet-400" : "bg-violet-400/40"} transition-colors duration-300 w-full px-4 py-2 rounded-lg shadow-sm shadow-gray-800 flex items-center gap-4 cursor-pointer`}
            >
              <span>
                <img
                  src={settingsIcon}
                  alt="Settings icon"
                  className="w-7 h-7"
                />
              </span>
              Settings
            </p>
            <div
              onClick={handleLogout}
              className="flex text-left w-full mt-6 pr-1 justify-end items-center gap-4 hover:text-purple-400 transition-colors duration-300 cursor-pointer"
            >
              <p>Logout</p>
              <span>
                <img
                  src={arrowRight}
                  alt="arrow to right"
                  className="w-5 h-5"
                />
              </span>
            </div>
          </div>
        </div>

        {/* 💻 Main Dashboard Content Area */}
        <div className="main-content w-full md:w-5/6 h-full flex flex-col gap-2">
          {/* Top Navbar */}
          <div
            ref={rightRef}
            className="topNav w-full h-32 bg-white/20 border-t-2 border-r-2 border-r-white/20 border-t-white/30 rounded-2xl py-4 px-6 flex items-center justify-between"
          >
            <div className="flex flex-col items-start justify-center">
              <h1 className="text-2xl md:text-3xl font-bold font-serif text-white">
                Hello, {user?.hName || "Admin"}!
              </h1>
              <span className="text-white/70">Admin Account</span>
            </div>

            {/* Hamburger Button for Mobile */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden p-2 text-white bg-white/10 rounded-lg border border-white/20 cursor-pointer hover:bg-white/20"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>

          {/* Changing Content Panels */}
          <div className="w-full flex-1">
            {activeSection === "dashboard" && <DashboardSec />}
            {activeSection === "books" && <BookManageSec />}
            {activeSection === "members" && <MemberManage />}
            {activeSection === "borrows" && <BorrowManageSec />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
