import { useState, useEffect } from "react";
import api from "../../services/api.js";

import exportIcon from "../../images/icons/export.png";
import plusIcon from "../../images/icons/plus.png";
import editIcon from "../../images/icons/edit.png";
import deleteIcon from "../../images/icons/delete.png";
import filterIcon from "../../images/icons/filter.png";
import sortIcon from "../../images/icons/sort.png";
import registerIcon from "../../images/icons/register.png";
import memberIcon from "../../images/icons/member.png";
import borrowIcon from "../../images/icons/borrow.png";
import bellIcon from "../../images/icons/bell.png";
import eyeIcon from "../../images/icons/eye.png";
// import animation function
import { Animation } from "../../helpingFunctions/AnimateFunction.jsx";

function StudentManage() {
  const studentTab = Animation(500);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null); //for edit and view
  const [isModalOpen, setIsModalOpen] = useState(false); //to control edit modal
  const [stats, setStats] = useState({
    borrowedCount: 0,
    overdueCount: 0,
  });

  //to fetch data from backend when page loads
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);

      // send req to backend : router path is /api/users/all-users
      const res = await api.get("/api/users/all-users");
      if (res.data.success) {
        setStudents(res.data.data);
      }
      
      const borrowsRes = await api.get("/api/borrows/all-borrows");
      if (borrowsRes.data.success) {
        const borrowsList = borrowsRes.data.data || [];
        const uniqueBorrowedStudents = new Set(borrowsList.map(b => b.brStudentId)).size;
        const uniqueOverdueStudents = new Set(
          borrowsList
            .filter(b => b.brStatus === "borrowed" && new Date(b.brReturnDate) < new Date())
            .map(b => b.brStudentId)
        ).size;
        setStats({
          borrowedCount: uniqueBorrowedStudents,
          overdueCount: uniqueOverdueStudents,
        });
      }
    } catch (err) {
      console.error("Error fetching students: ", err);
    } finally {
      setLoading(false);
    }
  };

  // delete operation
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        //backend router path: /api/users/delete-user/:id
        const res = await api.delete(`/api/users/delete-user/${id}`);
        if (res.data.success) {
          alert("Student deleted successfully!");
          fetchStudents(); // call to refresh the table
        }
      } catch (err) {
        console.error("Error deleting student: ", err);
        alert("Failed to delete student");
      }
    }
  };

  //update operation
  const handleEditClick = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put(`/api/users/edit-user/${selectedStudent.uId}`, {
        name: selectedStudent.uName,
        email: selectedStudent.uEmail,
        password: selectedStudent.uPassword,
      });
      if (res.data.success) {
        alert("Student updated successfully!");
        setIsModalOpen(false);
        fetchStudents();
      }
    } catch (err) {
      console.error("Error updating student: ", err);
    }
  };

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
          onClick={() => window.open("/add-student", "_blank")}
          className="px-4 py-2 border-2 border-white/60 text-white font-semibold rounded-lg flex gap-2 items-center justify-center cursor-pointer"
        >
          <span>
            <img src={plusIcon} alt="" className="w-5 h-5" />
          </span>
          <p>Add Student</p>
        </button>
      </div>

      {/* 𝘤𝘢𝘳𝘥𝘴 */}
      <div className="cards w-full h-40 grid grid-cols-4 gap-4 mt-2">
        {[
          { title: "Total Registered Students", value: students.length, icon: registerIcon },
          { title: "Currently Active Students", value: students.length, icon: memberIcon },
          { title: "Total Book Borrowed Students", value: stats.borrowedCount, icon: borrowIcon },
          { title: "Overdue Students", value: stats.overdueCount, icon: bellIcon },
        ].map((card, i) => (
          <div
            key={i}
            className="h-full w-auto bg-white/20 border-t-2 border-r-2 border-r-white/20 border-t-white/30 shadow-lg hover:scale-105 transition-all duration-300 rounded-2xl relative flex justify-start items-center group"
          >
            <div className="icon w-10 h-10 rounded-full absolute top-4 right-4">
              <img
                src={card.icon}
                alt={card.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="content p-4">
              <h2 className="text-xl font-semibold text-white">{card.title}</h2>
              {loading ? (
                <div className="h-8 w-20 bg-white/20 animate-pulse rounded-md mt-1" />
              ) : (
                <p className="text-3xl font-bold text-white mt-1">
                  {card.value.toLocaleString()}
                </p>
              )}
            </div>
            <span className="absolute bottom-2 right-4 text-xs text-white/70">
              Real-time DB Data
            </span>
          </div>
        ))}
      </div>
      <div className="searchSec flex flex-col mt-4 mb-4">
        <input
          type="search"
          placeholder="Search Students by ID, Name, Email or Department"
          className="w-full h-10 bg-white/20 rounded-md px-4 pb-1 text-white border-t-2 border-r-2 border-white/40 mb-2 focus:outline-none"
        />
        <div className="flex gap-2">
          <select
            name="sort"
            id="sort"
            className="w-full h-10 bg-white/20 rounded-md px-4 pb-1 text-white border-t-2 border-r-2 border-white/40 focus:outline-none"
          >
            <option value="allStudents" className="bg-purple-950 ">
              All Students
            </option>
            <option value="borrowed" className="bg-purple-900 ">
              Book Borrowed Students
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
              <th className="py-4 w-20">StId</th>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Status</th>
              <th className="w-40" colSpan={3}>
                Operations
              </th>
            </tr>
          </thead>

          <tbody>
            {students.map((student) => (
              <tr key={student.uId} className="border-t-2 border-white/50">
                <td className="bg-blue-400"></td>
                <td className="w-20">{student.uId}</td>

                <td className="text-start px-10">{student.uName}</td>
                <td className="text-start">{student.uEmail}</td>
                <td>IT</td>
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
                    onClick={() => handleEditClick(student)}
                  />
                </td>
                <td>
                  <img
                    src={eyeIcon}
                    alt="view"
                    className="w-5  mx-auto cursor-pointer"
                  />
                </td>
                <td>
                  <img
                    src={deleteIcon}
                    alt="delete icon"
                    className="w-5 mx-auto cursor-pointer"
                    onClick={() => handleDelete(student.uId)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/*  EDIT STUDENT MODAL (Pop-up Form) */}
      {isModalOpen && selectedStudent && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-purple-950/90 border border-white/20 p-6 rounded-2xl w-96 text-white shadow-2xl relative">
            <h2 className="text-2xl font-bold mb-4 font-serif">Edit Student</h2>

            <form onSubmit={handleUpdate} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm opacity-80 mb-1">Name</label>
                <input
                  type="text"
                  required
                  className="w-full h-10 bg-white/10 rounded-md px-3 text-white border border-white/20 focus:outline-none focus:border-purple-400"
                  value={selectedStudent.uName || ""}
                  onChange={(e) =>
                    setSelectedStudent({
                      ...selectedStudent,
                      uName: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label className="block text-sm opacity-80 mb-1">Email</label>
                <input
                  type="email"
                  required
                  className="w-full h-10 bg-white/10 rounded-md px-3 text-white border border-white/20 focus:outline-none focus:border-purple-400"
                  value={selectedStudent.uEmail || ""}
                  onChange={(e) =>
                    setSelectedStudent({
                      ...selectedStudent,
                      uEmail: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-sm opacity-80 mb-1">
                  New Password (Required)
                </label>
                <input
                  type="password"
                  required
                  className="w-full h-10 bg-white/10 rounded-md px-3 text-white border border-white/20 focus:outline-none focus:border-purple-400"
                  placeholder="Enter new or current password"
                  onChange={(e) =>
                    setSelectedStudent({
                      ...selectedStudent,
                      uPassword: e.target.value,
                    })
                  }
                />
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

export default StudentManage;
