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

function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <div
        className="container w-full h-screen flex p-2 bg-purple-900 gap-2"
        style={{
          backgroundImage: `url(${bgimg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          id="dashSideMenu"
          className="w-1/6 h-full left hidden md:block md:w-96 relative pb-5 md:pb-0 rounded-2xl border-b-2 border-white bg-white/20"
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

          <div className="tabs flex flex-col items-start gap-4 mt-12 font-semibold text-lg px-5 w-full text-white">
            <p
              onclick="loadSection('dashboard')"
              className="bg-violet-400 hover:bg-violet-500 w-full px-4 py-2 rounded-lg shadow-sm border-t-2 border-right-2 border-white/40 hover:scale-105 transition-all duration-300 shadow-gray-800 flex items-center gap-4"
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
              onclick="loadSection('books')"
              className="bg-violet-400/40 hover:bg-violet-500 w-full px-4 py-2 rounded-lg shadow-sm border-t-2 border-right-2 border-white/40 hover:scale-105 transition-all duration-300 shadow-gray-800 flex items-center gap-4"
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

            <p className="bg-violet-400/40 hover:bg-violet-500 w-full px-4 py-2 rounded-lg shadow-sm border-t-2 border-right-2 border-white/40 hover:scale-105 transition-all duration-300 shadow-gray-800 flex items-center gap-4">
              <span>
                <img
                  src={membersIcon}
                  alt="Manage members icon"
                  className="w-7 h-7"
                />
              </span>
              Manage Members
            </p>

            <p className="bg-violet-400/40 hover:bg-violet-500 w-full px-4 py-2 rounded-lg shadow-sm border-t-2 border-right-2 border-white/40 hover:scale-105 transition-all duration-300 shadow-gray-800 flex items-center gap-4">
              <span>
                <img
                  src={borrowingsIcon}
                  alt="Manage borrowings icon"
                  className="w-7 h-7"
                />
              </span>
              Manage Borrowings
            </p>

            <p className="bg-violet-400/40 hover:bg-violet-500 w-full px-4 py-2 rounded-lg shadow-sm border-t-2 border-right-2 border-white/40 hover:scale-105 transition-all duration-300 shadow-gray-800 flex items-center gap-4">
              <span>
                <img
                  src={finesIcon}
                  alt="Manage fines icon"
                  className="w-7 h-7"
                />
              </span>
              Manage Fines
            </p>

            <p className="bg-violet-400/40 hover:bg-violet-500 w-full px-4 py-2 rounded-lg shadow-sm border-t-2 border-right-2 border-white/40 hover:scale-105 transition-all duration-300 shadow-gray-800 flex items-center gap-4">
              <span>
                <img src={reportsIcon} alt="Reports icon" className="w-7 h-7" />
              </span>
              Reports
            </p>

            <p className="bg-violet-400/40 hover:bg-violet-500 transition-colors duration-300 w-full px-4 py-2 rounded-lg shadow-sm shadow-gray-800 flex items-center gap-4">
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
          <div className="topNav w-full h-32 bg-white/20 border-t-2 border-r-2 border-r-white/20 border-t-white/30 rounded-2xl py-4 px-6 flex flex-col items-start justify-center ">
            <h1 className="text-3xl font-bold font-serif text-white">
              Hello, Admin!
            </h1>
            <span className="text-white/70">Admin Account</span>
          </div>
          {/* ⁡⁣⁣⁢𝘴𝘦𝘵 𝘰𝘧 𝘧𝘪𝘭𝘵𝘦𝘳𝘴⁡ */}
          <div className="settings w-full h-auto flex px-4 py-2 text-white/70 justify-between">
            {/* ⁡⁣⁣⁢𝘭𝘦𝘧𝘵 𝘴𝘪𝘥𝘦 𝘰𝘧 𝘵𝘩𝘦 𝘴𝘦𝘵𝘵𝘪𝘯𝘨 𝘰𝘱𝘵𝘪𝘰𝘯 𝘥𝘪𝘷⁡ */}
            <div className="setLeft flex gap-8">
              <button className="border-t-2 border-r-2 border-white/20 px-2 py-1 rounded-md cursor-pointer hover:text-white transition-colors duration-300 bg-white/10">
                Table
              </button>
              <button className="border-t-2 border-r-2 border-white/20 px-2 py-1 rounded-md cursor-pointer hover:text-white transition-colors duration-300 bg-white/10">
                Graph
              </button>
              <button className="border-t-2 border-r-2 border-white/20 px-2 py-1 rounded-md cursor-pointer hover:text-white transition-colors duration-300 bg-white/10">
                Charts
              </button>
            </div>
            {/* ⁡⁣⁣⁢⁡⁣⁣⁢𝘳𝘪𝘨𝘩𝘵 𝘴𝘪𝘥𝘦 𝘰𝘧 𝘵𝘩𝘦 𝘴𝘦𝘵𝘵𝘪𝘯𝘨 𝘰𝘱𝘵𝘪𝘰𝘯 𝘥𝘪𝘷⁡⁡ */}
            <div className="setRight flex gap-8">
              <button className="border-t-2 border-r-2 border-white/20 px-2 py-1 rounded-md cursor-pointer hover:text-white transition-colors duration-300 bg-white/10">
                Filter
              </button>
              <button className="border-t-2 border-r-2 border-white/20 px-2 py-1 rounded-md cursor-pointer hover:text-white transition-colors duration-300 bg-white/10">
                <input
                  type="search"
                  placeholder="Search..."
                  className="bg-transparent focus:outline-none pb-1 pl-2"
                />
                Search
              </button>
            </div>
          </div>

          {/* ⁡⁣⁣⁢𝘤𝘢𝘳𝘥 𝘴𝘦𝘤𝘵𝘪𝘰𝘯⁡ */}
          <div className="cards w-full h-50 grid grid-cols-4 gap-4">
            <div className="h-full w-auto bg-white/20 border-t-2 border-r-2 border-r-white/20 border-t-white/30 shadow-lg hover:scale-105 transition-all duration-300 rounded-2xl relative flex justify-start items-center group ">
              <div className="icon w-15 h-15 rounded-full absolute top-4 right-4 bg-white/30 border-2 border-white shadow-md shadow-gray-800">
                <img
                  src={icon}
                  alt="Total books icon"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="content p-4 ">
                <h2 className="text-xl font-semibold text-white">
                  Total Books
                </h2>
                <p className="text-3xl font-bold text-white">1,234</p>
              </div>
              <span className="absolute bottom-2 right-4 text-xs text-white/70">
                +5% from last month
              </span>
              <span className="absolute bottom-2 left-4 text-xs text-white/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Read more
              </span>
            </div>
            <div className="h-full w-auto bg-white/20 border-t-2 border-r-2 border-r-white/20 border-t-white/30 shadow-lg hover:scale-105 transition-all duration-300 rounded-2xl relative flex justify-start items-center group ">
              <div className="icon w-15 h-15 rounded-full absolute top-4 right-4 bg-white/30 border-2 border-white shadow-md shadow-gray-800">
                <img
                  src={icon}
                  alt="Total books icon"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="content p-4 ">
                <h2 className="text-xl font-semibold text-white">
                  Total Books
                </h2>
                <p className="text-3xl font-bold text-white">1,234</p>
              </div>
              <span className="absolute bottom-2 right-4 text-xs text-white/70">
                +5% from last month
              </span>
              <span className="absolute bottom-2 left-4 text-xs text-white/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Read more
              </span>
            </div>
            <div className="h-full w-auto bg-white/20 border-t-2 border-r-2 border-r-white/20 border-t-white/30 shadow-lg hover:scale-105 transition-all duration-300 rounded-2xl relative flex justify-start items-center group ">
              <div className="icon w-15 h-15 rounded-full absolute top-4 right-4 bg-white/30 border-2 border-white shadow-md shadow-gray-800">
                <img
                  src={icon}
                  alt="Total books icon"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="content p-4 ">
                <h2 className="text-xl font-semibold text-white">
                  Total Books
                </h2>
                <p className="text-3xl font-bold text-white">1,234</p>
              </div>
              <span className="absolute bottom-2 right-4 text-xs text-white/70">
                +5% from last month
              </span>
              <span className="absolute bottom-2 left-4 text-xs text-white/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Read more
              </span>
            </div>
            <div className="h-full w-auto bg-white/20 border-t-2 border-r-2 border-r-white/20 border-t-white/30 shadow-lg hover:scale-105 transition-all duration-300 rounded-2xl relative flex justify-start items-center group ">
              <div className="icon w-15 h-15 rounded-full absolute top-4 right-4 bg-white/30 border-2 border-white shadow-md shadow-gray-800">
                <img
                  src={icon}
                  alt="Total books icon"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="content p-4 ">
                <h2 className="text-xl font-semibold text-white">
                  Total Books
                </h2>
                <p className="text-3xl font-bold text-white">1,234</p>
              </div>
              <span className="absolute bottom-2 right-4 text-xs text-white/70">
                +5% from last month
              </span>
              <span className="absolute bottom-2 left-4 text-xs text-white/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Read more
              </span>
            </div>
          </div>

          <div className="graphs flex h-100  gap-4 mt-2">
            <div className="w-2/3 h-full bg-white/20 rounded-2xl border-t-2 border-r-2 border-r-white/20 border-t-white/30 shadow-lg"></div>
            <div className="w-1/3 h-full bg-white/20 rounded-2xl border-t-2 border-r-2 border-r-white/20 border-t-white/30 shadow-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
