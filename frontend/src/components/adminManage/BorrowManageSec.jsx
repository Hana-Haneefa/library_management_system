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
            <tr className="border-t-2 border-white/50">
              <td className="bg-blue-400"></td>
              <td>0012</td>
              <td>St003</td>
              <td>TITLE</td>

              <td>3</td>
              <td className="py-2 flex items-center justify-center">
                <p className="border w-full py-1 pb-1.5 text-sm rounded-2xl border-green-600 text-green-500">
                  Available
                </p>
              </td>
              <td></td>
              <td>
                <img src={editIcon} alt="edit icon" className="w-5 mx-auto" />
              </td>
              <td>
                <img src={eyeIcon} alt="view icon" className="w-5 h-5" />
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
              <td>St552</td>
              <td>TITLE</td>
              <td>3</td>
              <td className="py-2 flex items-center justify-center">
                <p className="border w-full py-1 pb-1.5 text-sm rounded-2xl border-orange-600 text-orange-500">
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
                <img src={eyeIcon} alt="view icon" className="w-5 h-5" />
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

export default BorrowManageSec;
