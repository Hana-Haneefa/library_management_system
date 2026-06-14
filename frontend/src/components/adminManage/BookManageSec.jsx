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

function BookManageSec() {
  const [showForm, setShowForm] = useState(false);
  const [coverImg, setCoverImg] = useState(null);
  const [animate, setAnimate] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    isbn: "",
    genre: "",
    publisher: "",
    year: "",
    quantity: "",
  });
  const [loading, setLoading] = useState(false);

  const bookmng = Animation(500);
  const openForm = () => {
    setShowForm(true);
    setTimeout(() => setAnimate(true), 10); //small delay for trigger animation
  };

  const closeForm = () => {
    setShowForm(false);
    setTimeout(() => setAnimate(false), 300); //end transition and remove from dom
  };

  //handle state updates
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //api call
  const handleSubmit = async () => {
    const data = new FormData(); //multer file
    data.append("title", formData.title);
    data.append("author", formData.author);
    data.append("isbn", formData.isbn);
    data.append("genre", formData.genre);
    data.append("publisher", formData.publisher);
    data.append("year", formData.year);
    data.append("quantity", formData.quantity);
    if (coverImg) data.append("coverImg", coverImg); //the file object

    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/books/create-book", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, //my JWT token
        },
        body: data,
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error);

      alert("Book added successfully!");
      closeForm();
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="booksMng" ref={bookmng}>
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

      {/* ⁡⁣⁣⁢model form for adding books⁡ */}
      {showForm && (
        <>
          {/* background blur overlay */}
          <div
            className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40
            transition-opacity duration-300
            ${animate ? "opacity-100" : "opacity-0"}`}
          />

          {/* form box */}
          <div
            className={`fixed top-1/3 left-1/2 -translate-x-1/2 z-50
            bg-white/10 backdrop-blur-md border border-white/30
            rounded-2xl p-8 w-125 text-white shadow-2xl
            transition-all duration-300
            ${
              animate
                ? "-translate-y-1/2 opacity-100"
                : "translate-y-[-40%] opacity-0"
            }`}
          >
            <h2 className="text-2xl font-bold mb-6">Add New Book</h2>

            <div className="flex flex-col gap-4">
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
                className="bg-white/20 rounded-lg px-4 py-2 focus:outline-none border border-white/30"
              />

              <input
                type="text"
                name="author"
                placeholder="Author"
                value={formData.author}
                onChange={handleChange}
                className="bg-white/20 rounded-lg px-4 py-2 focus:outline-none border border-white/30"
              />

              <input
                type="text"
                name="isbn"
                placeholder="ISBN"
                value={formData.isbn}
                onChange={handleChange}
                className="bg-white/20 rounded-lg px-4 py-2 focus:outline-none border border-white/30"
              />

              <select
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                className="bg-white/20 rounded-lg px-4 py-2 focus:outline-none border border-white/30"
              >
                <option className="bg-purple-950">Select Category</option>
                <option className="bg-purple-950">Computer Science</option>
                <option className="bg-purple-950">IT</option>
                <option className="bg-purple-950">History</option>
                <option className="bg-purple-950">Mathamatics</option>
                <option className="bg-purple-950">Machine Learning</option>
              </select>

              <input
                type="text"
                name="publisher"
                placeholder="Publisher"
                value={formData.publisher}
                onChange={handleChange}
                className="bg-white/20 rounded-lg px-4 py-2 focus:outline-none border border-white/30"
              />

              <input
                type="text"
                name="year"
                placeholder="Published Year"
                value={formData.year}
                onChange={handleChange}
                className="bg-white/20 rounded-lg px-4 py-2 focus:outline-none border border-white/30"
              />

              <input
                type="number"
                name="quantity"
                placeholder="Number of Copies"
                value={formData.quantity}
                onChange={handleChange}
                className="bg-white/20 rounded-lg px-4 py-2 focus:outline-none border border-white/30"
              />
            </div>
            {/* ⁡⁣⁣⁢Cover Image Upload⁡ */}
            <div className="flex flex-col gap-2 items-center">
              <label className="text-white/70 text-sm">Cover Image</label>

              <input
                type="file"
                name="coverImg"
                accept="image/*"
                className="hidden"
                id="coverImgInput"
                onChange={(e) => setCoverImg(e.target.files[0])}
              />

              {/* ⁡⁣⁣⁢Custom styled button to hide input and trigger⁡ */}
              <label
                htmlFor="coverImgInput"
                className="flex items-center gap-3 bg-white/20 border border-white/30 
               rounded-lg px-4 py-2 cursor-pointer hover:bg-white/30 transition-all"
              >
                <span>📁</span>
                <span className="text-white/70 text-sm">
                  {coverImg ? coverImg.name : "Choose image from PC..."}
                </span>
              </label>

              {/* ⁡⁣⁣⁢Preview⁡ */}
              {coverImg && (
                <img
                  src={URL.createObjectURL(coverImg)}
                  alt="preview"
                  className="w-24 h-32 object-cover rounded-lg border border-white/30 mt-1"
                />
              )}
            </div>

            {/* ⁡⁣⁣⁢buttons⁡ */}
            <div className="flex gap-3 mt-6 justify-end">
              <button
                onClick={closeForm}
                className="px-4 py-2 rounded-lg border border-white/40 hover:bg-white/10"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 font-semibold"
              >
                {loading ? "Adding..." : "Add Book"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default BookManageSec;
