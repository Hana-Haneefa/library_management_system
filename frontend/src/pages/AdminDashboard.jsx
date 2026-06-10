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
import exportIcon from "../images/icons/export.png";
import plusIcon from "../images/icons/plus.png";
import editIcon from "../images/icons/edit.png";
import deleteIcon from "../images/icons/delete.png";
import filterIcon from "../images/icons/filter.png";
import sortIcon from "../images/icons/sort.png";
import bgimg from "../images/adminBg.jpg";

// content component import
import DashboardSec from "../components/adminManage/DashboardSec";

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

          {/* {activeSection === "dashboard" && <DashboardSec />} */}
          <div className="booksMng">
            {/* ⁡⁣⁣⁢𝘰𝘱𝘵𝘪𝘰𝘯𝘴 𝘴𝘦𝘤⁡ */}
            <div className="options flex gap-2 justify-end">
              <button className="px-4 py-2 border-2 border-white/60 text-white font-semibold rounded-lg flex gap-2 items-center justify-center ">
                <span>
                  <img src={exportIcon} alt="" className="w-5 h-5" />
                </span>
                <p>Import</p>
              </button>
              <button className="px-4 py-2 border-2 border-white/60 text-white font-semibold rounded-lg flex gap-2 items-center justify-center">
                <span>
                  <img src={plusIcon} alt="" className="w-5 h-5" />
                </span>
                <p>Add Book</p>
              </button>
            </div>

            {/* 𝘤𝘢𝘳𝘥𝘴 */}
            <div className="cards w-full h-60 grid grid-cols-4 gap-4 mt-2">
              {[
                "Total Titles",
                "Available",
                "Borrowed",
                "Overdue",
                "QR generated",
              ].map((title, i) => (
                <div
                  key={i}
                  className="h-full w-auto bg-white/20 border-t-2 border-r-2 border-r-white/20 border-t-white/30 shadow-lg hover:scale-105 transition-all duration-300 rounded-2xl relative flex justify-start items-center group"
                >
                  <div className="icon w-10 h-10 rounded-full absolute top-4 right-4">
                    <img
                      src={icon}
                      alt={title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="content p-4">
                    <h2 className="text-xl font-semibold text-white">
                      {title}
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
              ))}
            </div>
            <div className="searchSec flex flex-col mt-4 mb-4">
              <input
                type="search"
                placeholder="Search books by Title, Author, Genre..."
                className="w-full h-10 bg-white/20 rounded-md px-4 pb-1 text-white border-t-2 border-r-2 border-white/40 mb-2 focus:outline-none"
              />
              <div className="flex gap-2">
                <select
                  name="category"
                  id="category"
                  className="w-full h-10 bg-white/20 rounded-md px-4 pb-1 text-white border-t-2 border-r-2 border-white/40 focus:outline-none"
                >
                  <option
                    value="allCategories"
                    className="bg-black backdrop:blur-2xl focus:outline-none"
                  >
                    All Categories
                  </option>

                  <optgroup label="Sciences" className="bg-purple-950">
                    <option value="computerScience">Computer Science</option>
                    <option value="mathematics">Mathematics</option>
                    <option value="physics">Physics</option>
                    <option value="chemistry">Chemistry</option>
                    <option value="biology">Biology</option>
                    <option value="engineering">Engineering</option>
                  </optgroup>

                  <optgroup
                    label="Humanities & Social Sciences"
                    className="bg-purple-900"
                  >
                    <option value="history">History</option>
                    <option value="geography">Geography</option>
                    <option value="philosophy">Philosophy</option>
                    <option value="psychology">Psychology</option>
                    <option value="sociology">Sociology</option>
                    <option value="politicalScience">Political Science</option>
                    <option value="economics">Economics</option>
                  </optgroup>

                  <optgroup
                    label="Language & Literature"
                    className="bg-purple-950"
                  >
                    <option value="sinhalaLiterature">
                      Sinhala Literature
                    </option>
                    <option value="englisLliterature">
                      English Literature
                    </option>
                    <option value="tamilLiterature">Tamil Literature</option>
                    <option value="poetry">Poetry</option>
                    <option value="drama">Drama</option>
                  </optgroup>

                  <optgroup
                    label="Religion & Culture"
                    className="bg-purple-900"
                  >
                    <option value="buddhism">Buddhism</option>
                    <option value="hinduism">Hinduism</option>
                    <option value="islam">Islam</option>
                    <option value="christianity">Christianity</option>
                  </optgroup>

                  <optgroup label="Arts & Media" className="bg-purple-950">
                    <option value="artDesign">Art & Design</option>
                    <option value="music">Music</option>
                    <option value="filmMedia">Film & Media</option>
                  </optgroup>

                  <optgroup
                    label="General / Reference"
                    className="bg-purple-900"
                  >
                    <option value="encyclopedia">
                      Encyclopedia & Reference
                    </option>
                    <option value="dictionary">Dictionary & Language</option>
                    <option value="magazines">Magazines & Journals</option>
                    <option value="biography">Biography & Autobiography</option>
                    <option value="childrens">Children's Books</option>
                  </optgroup>
                </select>

                <select
                  name="status"
                  id="status"
                  className="w-full h-10 bg-white/20 rounded-md px-4 pb-1 text-white border-t-2 border-r-2 border-white/40"
                >
                  <option value="allStatus" className="bg-purple-950 ">
                    All Statuses
                  </option>
                  <option value="borrowed" className="bg-purple-950 ">
                    Borrowed
                  </option>
                  <option value="available" className="bg-purple-950 ">
                    Available
                  </option>
                  <option value="lost" className="bg-purple-950 ">
                    Lost
                  </option>
                </select>
              </div>
            </div>
            <div className="filterSec flex gap-2 justify-start">
              <button className="px-4 py-2 border-2 border-white/60 text-white font-semibold rounded-lg flex gap-2 items-center justify-center">
                <p>Filter</p>
                <span>
                  <img src={filterIcon} alt="filter icon" className="w-5 h-5" />
                </span>
              </button>
              <button className="px-4 py-2 border-2 border-white/60 text-white font-semibold rounded-lg flex gap-2 items-center justify-center">
                <p>Sort</p>
                <span>
                  <img src={sortIcon} alt="sort icon" className="w-5 h-5" />
                </span>
              </button>
            </div>
            <div className="table w-full mt-5 border-2 border-white/40 rounded-2xl">
              <table className="w-full text-white text-center table-fixed">
                <thead>
                  <tr>
                    <th className="w-3 overflow-hidden"></th>
                    <th className="py-4">ISBN</th>
                    <th>Cover</th>
                    <th className="w-36">Title</th>
                    <th className="w-32">Author</th>
                    <th>Copies</th>
                    <th>Status</th>
                    <th>QR</th>
                    <th className="w-32" colSpan={2}>
                      Operations
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr className="border-t-2 border-white/50">
                    <td className="bg-blue-400"></td>
                    <td>0012</td>
                    <td className="py-2 h-20">
                      <img
                        src={img}
                        alt=""
                        className="rounded-md h-full object-contain mx-auto hover:scale-200 transform-all duration-500 cursor-pointer"
                      />
                    </td>
                    <td>TITLE</td>
                    <td>Mony</td>
                    <td>3</td>
                    <td>
                      <p className="border py-1 pb-1.5 text-sm rounded-2xl border-green-600 text-green-500">
                        Available
                      </p>
                    </td>
                    <td></td>
                    <td>
                      <img
                        src={editIcon}
                        alt="edit icon"
                        className="w-5 mx-auto"
                      />
                    </td>
                    <td>
                      <img
                        src={deleteIcon}
                        alt="delete icon"
                        className="w-5 mx-auto"
                      />
                    </td>
                  </tr>
                  <tr className="border-t-2 border-white/50">
                    <td className="bg-green-400 rounded-bl-2xl"></td>
                    <td>0012</td>
                    <td className="py-2 h-20">
                      <img
                        src={img}
                        alt=""
                        className="rounded-md h-full object-contain mx-auto hover:scale-200 transform-all duration-500 cursor-pointer"
                      />
                    </td>
                    <td>TITLE</td>
                    <td>Mony</td>
                    <td>3</td>
                    <td>
                      <p className="border py-1 pb-1.5 text-sm rounded-2xl border-orange-600 text-orange-500">
                        Borrowed
                      </p>
                    </td>
                    <td></td>
                    <td>
                      <img
                        src={editIcon}
                        alt="edit icon"
                        className="w-5 h-auto mx-auto"
                      />
                    </td>
                    <td>
                      <img
                        src={deleteIcon}
                        alt="delete"
                        className="w-5 h-auto mx-auto"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
