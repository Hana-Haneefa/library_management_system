import exportIcon from "../../images/icons/export.png";
import plusIcon from "../../images/icons/plus.png";
import editIcon from "../../images/icons/edit.png";
import deleteIcon from "../../images/icons/delete.png";
import filterIcon from "../../images/icons/filter.png";
import sortIcon from "../../images/icons/sort.png";
import icon from "../../images/icons/heart.png";
import img from "../../images/testimg.jpg";
import { useRef, useEffect, useState } from "react";
// import animation function
import { Animation } from "../../helpingFunctions/AnimateFunction.jsx";
//components
import StudentRegister from "../../components/studentManage/AddStudentForm.jsx";

function StudentManage() {
  const [showForm, setShowForm] = useState(false);
  const [animate, setAnimate] = useState(false);

  const openForm = () => {
    setShowForm(true);
    setTimeout(() => setAnimate(true), 10);
  };

  const closeForm = () => {
    setAnimate(false);
    setTimeout(() => setShowForm(false), 300);
  };
  const studentTab = Animation(500);

  return (
    <div className="studentTab" ref={studentTab}>
      {/* ⁡⁣⁣⁢𝘰𝘱𝘵𝘪𝘰𝘯𝘴 𝘴𝘦𝘤⁡ */}
      <div className="options flex gap-2 justify-end">
        <button className="px-4 py-2 border-2 border-white/60 text-white font-semibold rounded-lg flex gap-2 items-center justify-center cursor-pointer">
          <span>
            <img src={exportIcon} alt="" className="w-5 h-5" />
          </span>
          <p>Import</p>
        </button>
        <button
          onClick={openForm}
          className="px-4 py-2 border-2 border-white/60 text-white font-semibold rounded-lg flex gap-2 items-center justify-center cursor-pointer"
        >
          <span>
            <img src={plusIcon} alt="" className="w-5 h-5" />
          </span>
          <p>Add Student</p>
        </button>
      </div>

      {/* 𝘤𝘢𝘳𝘥𝘴 */}
      <div className="cards w-full h-60 grid grid-cols-4 gap-4 mt-2">
        {[
          "Total Registered Students",
          "Currently Active Students",
          "Total Book Borrowed Students",
          "Overdue Students",
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
              <h2 className="text-xl font-semibold text-white">{title}</h2>
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
            name="sort"
            id="sort"
            className="w-full h-10 bg-white/20 rounded-md px-4 pb-1 text-white border-t-2 border-r-2 border-white/40"
          >
            <option value="allStudents" className="bg-purple-950 ">
              All Students
            </option>
            <option value="borrowed" className="bg-purple-950 ">
              Book Borrowed Studnents
            </option>
            <option value="overdue" className="bg-purple-950 ">
              Overdue Students
            </option>
          </select>
        </div>
      </div>
      <div className="filterSec flex gap-2 justify-start">
        <button className="px-4 py-2 border-2 border-white/60 text-white font-semibold rounded-lg flex gap-2 items-center justify-center cursor-pointer">
          <p>Filter</p>
          <span>
            <img src={filterIcon} alt="filter icon" className="w-5 h-5" />
          </span>
        </button>
        <button className="px-4 py-2 border-2 border-white/60 text-white font-semibold rounded-lg flex gap-2 items-center justify-center cursor-pointer">
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
              <th className="py-4">StId</th>
              <th>Name</th>
              <th className="w-36">Email</th>
              <th className="w-32">Department</th>
              <th>Status</th>
              <th className="w-32" colSpan={2}>
                Operations
              </th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-t-2 border-white/50">
              <td className="bg-blue-400"></td>
              <td>0012</td>

              <td>Yuji</td>
              <td>yuji@gmail.com</td>
              <td>IT</td>
              <td>
                <p className="border py-1 pb-1.5 text-sm rounded-2xl border-green-600 text-green-500">
                  Active
                </p>
              </td>
              <td>
                <img src={editIcon} alt="edit icon" className="w-5 mx-auto" />
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

              <td>Megumi</td>
              <td>megu@gmail.com</td>
              <td>Science</td>
              <td>
                <p className="border py-1 pb-1.5 text-sm rounded-2xl border-orange-600 text-orange-500">
                  Borrowed
                </p>
              </td>
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
  );
}

export default StudentManage;
