import { useState, useEffect } from "react";
import api from "../../services/api.js";

import exportIcon from "../../images/icons/export.png";
import plusIcon from "../../images/icons/plus.png";
import editIcon from "../../images/icons/edit.png";
import deleteIcon from "../../images/icons/delete.png";
import filterIcon from "../../images/icons/filter.png";
import sortIcon from "../../images/icons/sort.png";
import icon from "../../images/icons/heart.png";
import eyeIcon from "../../images/icons/eye.png";
// import animation function
import { Animation } from "../../helpingFunctions/AnimateFunction.jsx";

function LibrarianManage() {
  const librarianTab = Animation(500);
  const [librarians, setLibrarians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLibrarian, setSelectedLibrarian] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchLibrarians();
  }, []);

  const fetchLibrarians = async () => {
    try {
      setLoading(true);

      //route : /api/headusers/all-headusers
      const res = await api.get("/api/head-users/all-headusers");
      if (res.data.success) {
        setLibrarians(res.data.users);
      }
    } catch (err) {
      console.error("Error fetching headusers: ", err);
    } finally {
      setLoading(false);
    }
  };

  //delete operation
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this headuser?")) {
      try {
        //route : /api/headusers/all-headusers
        const res = await api.delete(`/api/head-users/delete-headuser/${id}`);
        if (res.data.success) {
          alert("Headuser deleted successfully!");
          fetchLibrarians();
        }
      } catch (err) {
        console.error("Error deleting headuser: ", err);
        alert("Failed to delete headuser");
      }
    }
  };

  //edit operation
  const handleEditClick = (headuser) => {
    setSelectedLibrarian(headuser);
    setIsModalOpen(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put(
        `/api/head-users/edit-headuser/${selectedLibrarian.hId}`,
        {
          name: selectedLibrarian.hName,
          email: selectedLibrarian.hEmail,
          password: selectedLibrarian.hPassword,
          role: selectedLibrarian.hRole,
        },
      );
      if (res.data.success) {
        alert("Headuser updated successfully!");
        setIsModalOpen(false);
        fetchLibrarians();
      }
    } catch (err) {
      console.error("Error updating headuser: ", err);
    }
  };

  return (
    <div className="librarianTab" ref={librarianTab}>
      {/* ⁡⁣⁣⁢𝘰𝘱𝘵𝘪𝘰𝘯𝘴 𝘴𝘦𝘤⁡ */}
      <div className="options flex gap-2 justify-end">
        <button className="px-4 py-2 border-2 border-white/60 text-white font-semibold rounded-lg flex gap-2 items-center justify-center cursor-pointer">
          <span>
            <img src={exportIcon} alt="" className="w-5 h-5" />
          </span>
          <p>Import</p>
        </button>
        <button
          onClick={() => window.open("/add-librarian", "_blank")}
          className="px-4 py-2 border-2 border-white/60 text-white font-semibold rounded-lg flex gap-2 items-center justify-center cursor-pointer"
        >
          <span>
            <img src={plusIcon} alt="" className="w-5 h-5" />
          </span>
          <p>Add Librarian</p>
        </button>
      </div>

      {/* 𝘤𝘢𝘳𝘥𝘴 */}
      <div className="cards w-full h-40 grid grid-cols-4 gap-4 mt-2">
        {[
          "Total Registered Librarians",
          "Currently Active Librarians",
          "Librarians Salary Manage",
          "Past Librarians",
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
          placeholder="Search Librarian by ID, Name or Email"
          className="w-full h-10 bg-white/20 rounded-md px-4 pb-1 text-white border-t-2 border-r-2 border-white/40 mb-2 focus:outline-none"
        />
        <div className="flex gap-2">
          <select
            name="sort"
            id="sort"
            className="w-full h-10 bg-white/20 rounded-md px-4 pb-1 text-white border-t-2 border-r-2 border-white/40 focus:outline-none"
          >
            <option value="allLibrarians" className="bg-purple-950 ">
              All Librarians
            </option>
            <option value="active" className="bg-purple-900 ">
              Active Librarians
            </option>
            <option value="paid" className="bg-purple-950 ">
              Paid Librarians
            </option>
            <option value="nonpaid" className="bg-purple-950 ">
              Non-paid Librarians
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
              <th className="py-4 w-20">LibrarianId</th>
              <th>Name</th>
              <th>Email</th>
              <th>Payment Statement</th>
              <th>Status</th>
              <th className="w-40" colSpan={3}>
                Operations
              </th>
            </tr>
          </thead>

          <tbody>
            {librarians.map((librarian) => (
              <tr key={librarian.hId} className="border-t-2 border-white/50">
                <td className="bg-blue-400"></td>
                <td>{librarian.hId}</td>

                <td>{librarian.hName}</td>
                <td>{librarian.hEmail}</td>
                <td>
                  <p className="font-semibold text-green-600 text-sm">Paid</p>
                </td>
                <td className="py-2 flex items-center justify-center">
                  <p className="border py-1 pb-1.5 text-sm rounded-2xl border-green-600 text-green-500 w-2/3">
                    Active
                  </p>
                </td>
                <td>
                  <img
                    src={editIcon}
                    alt="edit icon"
                    className="w-5 mx-auto cursor-pointer"
                    onClick={() => handleEditClick(librarian)}
                  />
                </td>
                <td>
                  <img
                    src={eyeIcon}
                    alt="view"
                    className="w-5 h-auto mx-auto cursor-pointer"
                  />
                </td>
                <td>
                  <img
                    src={deleteIcon}
                    alt="delete icon"
                    className="w-5 mx-auto cursor-pointer"
                    onClick={() => handleDelete(librarian.hId)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LibrarianManage;
