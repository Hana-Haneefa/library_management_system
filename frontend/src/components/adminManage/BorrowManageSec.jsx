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

function BorrowManageSec() {
  const borrowMng = Animation(500);
  const [borrows, setBorrows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBorrow, setSelectedBorrow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchBorrows();
  }, []);

  const fetchBorrows = async () => {
    try {
      setLoading(true);

      //route: /api/borrows/all-borrows
      const res = await api.get("/api/borrows/all-borrows");
      if (res.data.success) {
        setBorrows(res.data.data);
      }
    } catch (err) {
      console.error("Error fetching borrows: ", err);
    } finally {
      setLoading(false);
    }
  };

  //delete operation
  const handleDelete = async (id) => {
    if (
      window.confirm("Are you sure you want to delete this borrow details?")
    ) {
      try {
        //route: /api/borrows/delete-borrow
        const res = await api.delete(`/api/borrows/delete-borrow/${id}`);
        if (res.data.success) {
          alert("Borrow detail deleted successfully!");
          fetchBorrows();
        }
      } catch (err) {
        console.error("Error deleting borrow detail");
        alert("Failed to delete borrow detail");
      }
    }
  };

  //edit operation
  const handleEditClick = (borrow) => {
    setSelectedBorrow(borrow);
    setIsModalOpen(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      //route: /api/borrows/update-borrow/:id
      const res = await api.put(
        `/api/borrows/update-borrow/${selectedBorrow.brId}`,
        {
          status: selectedBorrow.brStatus,
        },
      );
      if (res.data.success) {
        alert("Borrow status updated successfully!");
        setIsModalOpen(false);
        fetchBorrows();
      }
    } catch (err) {
      console.error("Error updating borrow status: ", err);
      alert("Failed to update borrow status");
    }
  };

  return (
    <div className="borrowMng" ref={borrowMng}>
      {/* ⁡⁣⁣⁢𝘰𝘱𝘵𝘪𝘰𝘯𝘴 𝘴𝘦𝘤⁡ */}
      <div className="options flex gap-2 justify-end">
        <button className="px-4 py-2 border-2 border-white/60 text-white font-semibold rounded-lg flex gap-2 items-center justify-center cursor-pointer">
          <span>
            <img src={exportIcon} alt="" className="w-5 h-5" />
          </span>
          <p>Export</p>
        </button>
        <button className="px-4 py-2 border-2 border-white/60 text-white font-semibold rounded-lg flex gap-2 items-center justify-center cursor-pointer">
          <span>
            <img src={plusIcon} alt="" className="w-5 h-5" />
          </span>
          <p>View All Borrows</p>
        </button>
      </div>

      {/* 𝘤𝘢𝘳𝘥𝘴 */}
      <div className="cards w-full grid grid-cols-4 gap-4 mt-2">
        {[
          "Total Borrows",
          "Borrow Analysis",
          "Recent Borrows",
          "Overdue Borrows",
        ].map((title, i) => (
          <div
            key={i}
            className="h-full w-full bg-white/20 border-t-2 border-r-2 border-r-white/20 border-t-white/30 shadow-lg hover:scale-105 transition-all duration-300 rounded-2xl relative flex justify-start items-center group"
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

            <optgroup label="Language & Literature" className="bg-purple-950">
              <option value="sinhalaLiterature">Sinhala Literature</option>
              <option value="englisLliterature">English Literature</option>
              <option value="tamilLiterature">Tamil Literature</option>
              <option value="poetry">Poetry</option>
              <option value="drama">Drama</option>
            </optgroup>

            <optgroup label="Religion & Culture" className="bg-purple-900">
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

            <optgroup label="General / Reference" className="bg-purple-900">
              <option value="encyclopedia">Encyclopedia & Reference</option>
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
              New Borrows
            </option>

            <option value="overdue" className="bg-purple-950 ">
              Overdue
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
              <th className="py-4 w-28">ISBN</th>
              <th className="w-28">StId</th>
              <th className="w-44">Title</th>

              <th>Copies</th>
              <th>Status</th>
              <th>QR</th>
              <th className="w-32" colSpan={3}>
                Operations
              </th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={9} className="py-6 text-white/70">
                  Loading borrows...
                </td>
              </tr>
            ) : borrows.length === 0 ? (
              <tr>
                <td colSpan={9} className="py-6 text-white/70">
                  No borrow records found
                </td>
              </tr>
            ) : (
              borrows.map((borrow) => (
                <tr key={borrow.brId} className="border-t-2 border-white/50">
                  <td
                    className={
                      borrow.brStatus === "returned"
                        ? "bg-green-400 rounded-bl-xl"
                        : "bg-orange-400 rounded-bl-xl"
                    }
                  ></td>
                  <td>{borrow.brId}</td>
                  <td>{borrow.brStudentId}</td>
                  <td>{borrow.brBookId}</td>

                  <td>3</td>
                  <td className="py-2 flex items-center justify-center">
                    <p
                      className={`border w-full py-1 pb-1.5 text-sm rounded-2xl capitalize ${
                        borrow.brStatus === "returned"
                          ? "border-green-500 text-green-400"
                          : "border-orange-600 text-orange-500"
                      }`}
                    >
                      {borrow.brStatus}
                    </p>
                  </td>
                  <td></td>
                  <td>
                    <img
                      src={editIcon}
                      alt="edit icon"
                      className="w-5 mx-auto cursor-pointer"
                      onClick={() => handleEditClick(borrow)}
                    />
                  </td>
                  <td>
                    <img
                      src={eyeIcon}
                      alt="view icon"
                      className="w-5 h-5 cursor-pointer"
                    />
                  </td>
                  <td>
                    <img
                      src={deleteIcon}
                      alt="delete icon"
                      className="w-5 mx-auto cursor-pointer"
                      onClick={() => handleDelete(borrow.brId)}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* EDIT BORROW MODAL (Pop-up Form) */}
      {isModalOpen && selectedBorrow && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-purple-950/90 border border-white/20 p-6 rounded-2xl w-96 text-white shadow-2xl relative">
            <h2 className="text-2xl font-bold mb-1 font-serif">Edit Borrow</h2>
            <p className="text-sm opacity-70 mb-4">
              Borrow #{selectedBorrow.brId} &middot; Student{" "}
              {selectedBorrow.brStudentId}
            </p>

            <form onSubmit={handleUpdate} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm opacity-80 mb-1">Status</label>
                <select
                  required
                  className="w-full h-10 bg-white/10 rounded-md px-3 text-white border border-white/20 focus:outline-none focus:border-purple-400"
                  value={selectedBorrow.brStatus || "borrowed"}
                  onChange={(e) =>
                    setSelectedBorrow({
                      ...selectedBorrow,
                      brStatus: e.target.value,
                    })
                  }
                >
                  <option value="borrowed" className="bg-purple-950">
                    Borrowed
                  </option>
                  <option value="returned" className="bg-purple-950">
                    Returned
                  </option>
                </select>
              </div>

              <div className="flex gap-2 justify-end mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border-2 border-white/40 text-white font-semibold rounded-lg hover:bg-white/10 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-lg cursor-pointer transition-colors duration-300"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default BorrowManageSec;
