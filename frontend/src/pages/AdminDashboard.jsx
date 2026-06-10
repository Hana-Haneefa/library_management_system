import { useState, useRef, useEffect } from "react";
import img from "../images/testimg.jpg";
import icon from "../images/icons/heart.png";
import dashboardIcon from "../images/icons/dashboard.png";
import booksIcon from "../images/icons/book.png";
import membersIcon from "../images/icons/member.png";
import borrowingsIcon from "../images/icons/borrow.png";
import finesIcon from "../images/icons/bill.png";
import reportsIcon from "../images/icons/doc.png";
import settingsIcon from "../images/icons/setting.png";

import bgimg from "../images/adminBg.jpg";

// content component import
import DashboardSec from "../components/adminManage/DashboardSec";
import BookManageSec from "../components/adminManage/BookManageSec";
import MemberManage from "../components/adminManage/MemberManage";

function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("dashboard");

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
    <div className="admin-dashboard">
      <div
        ref={containerRef}
        className="container w-full min-h-screen flex p-2 gap-2"
        style={{
          backgroundImage: `url(${bgimg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          id="dashSideMenu"
          ref={leftRef}
          className="w-1/6 h-screen left hidden md:block md:w-96 relative pb-5 md:pb-0 rounded-2xl border-b-2 border-white bg-white/20"
          style={{
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)", //help in safari
            borderColor: "rgba(167, 139, 250, 0.4)",
            borderTop: "1px solid rgba(255, 255, 255, 0.3)",
            borderRight: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow:
              "0 8px 32px rgba(80, 40, 160, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
          }}
        >
          <button
            id="dashClose"
            className="md:hidden flex justify-end w-full text-lg mt-5 mr-8 text-gray-400"
          >
            <i class="fa-solid fa-xmark"></i>
          </button>

          <div className="img w-24 h-24 rounded-full mx-auto mt-14 md:mt-10 border-4 border-white shadow-md shadow-gray-800 overflow-hidden">
            <img
              src={img}
              alt="profile picture"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-gray-500 font-semibold text-sm text-center mt-4">
            ID:12345
          </p>

          <div className="tabs pb-5 flex flex-col items-start gap-4 mt-12 font-semibold text-lg px-5 w-full text-white">
            <p
              onClick={() => setActiveSection("dashboard")}
              className={` ${activeSection == "dashboard" ? "bg-violet-400" : "bg-violet-400/40"} w-full px-4 py-2 rounded-lg shadow-sm border-t-2 border-right-2 border-white/40 hover:scale-105 transition-all duration-300 shadow-gray-800 flex items-center gap-4`}
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
              onClick={() => setActiveSection("books")}
              className={`${activeSection === "books" ? "bg-violet-400" : "bg-violet-400/40"} w-full px-4 py-2 rounded-lg shadow-sm border-t-2 border-right-2 border-white/40 hover:scale-105 transition-all duration-300 shadow-gray-800 flex items-center gap-4`}
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
              onClick={() => setActiveSection("members")}
              className={`bg-violet-400/40 hover:bg-violet-500 ${activeSection == "members" ? "bg-violet-400" : "bg-violet-400/40"} w-full px-4 py-2 rounded-lg shadow-sm border-t-2 border-right-2 border-white/40 hover:scale-105 transition-all duration-300 shadow-gray-800 flex items-center gap-4`}
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
              onClick={() => setActiveSection("borrows")}
              className={`bg-violet-400/40 hover:bg-violet-500 ${activeSection == "dashboard" ? "bg-violet-400" : "bg-violet-400/40"} w-full px-4 py-2 rounded-lg shadow-sm border-t-2 border-right-2 border-white/40 hover:scale-105 transition-all duration-300 shadow-gray-800 flex items-center gap-4`}
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
              onClick={() => setActiveSection("fines")}
              className={`bg-violet-400/40 hover:bg-violet-500 ${activeSection == "dashboard" ? "bg-violet-400" : "bg-violet-400/40"} w-full px-4 py-2 rounded-lg shadow-sm border-t-2 border-right-2 border-white/40 hover:scale-105 transition-all duration-300 shadow-gray-800 flex items-center gap-4`}
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
              onClick={() => setActiveSection("reports")}
              className={`bg-violet-400/40 hover:bg-violet-500 ${activeSection == "dashboard" ? "bg-violet-400" : "bg-violet-400/40"} w-full px-4 py-2 rounded-lg shadow-sm border-t-2 border-right-2 border-white/40 hover:scale-105 transition-all duration-300 shadow-gray-800 flex items-center gap-4`}
            >
              <span>
                <img src={reportsIcon} alt="Reports icon" className="w-7 h-7" />
              </span>
              Reports
            </p>

            <p
              onClick={() => setActiveSection("settings")}
              className={`bg-violet-400/40 hover:bg-violet-500 ${activeSection == "dashboard" ? "bg-violet-400" : "bg-violet-400/40"}transition-colors duration-300 w-full px-4 py-2 rounded-lg shadow-sm shadow-gray-800 flex items-center gap-4`}
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
          </div>
        </div>
        {/*⁡⁣⁣⁢ 𝘮𝘢𝘪𝘯 𝘤𝘰𝘯𝘵𝘦𝘯𝘵⁡ */}
        <div className="main-content w-5/6 h-full flex flex-col gap-2">
          <div
            ref={rightRef}
            className="topNav w-full h-32 bg-white/20 border-t-2 border-r-2 border-r-white/20 border-t-white/30 rounded-2xl py-4 px-6 flex flex-col items-start justify-center "
          >
            <h1 className="text-3xl font-bold font-serif text-white">
              Hello, Admin!
            </h1>
            <span className="text-white/70">Admin Account</span>
          </div>

          {/* ⁡⁢⁢⁣𝙘𝙝𝙖𝙣𝙜𝙞𝙣𝙜 𝙘𝙤𝙣𝙩𝙚𝙣𝙩⁡ */}

          {activeSection === "dashboard" && <DashboardSec />}
          {activeSection === "books" && <BookManageSec />}
          {activeSection === "members" && <MemberManage />}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
