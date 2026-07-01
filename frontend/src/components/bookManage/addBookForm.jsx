import { useState } from "react";
import axios from "axios";
import bgimg from "../../images/formBg.jpg";

function AddBookForm() {
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
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  //run when any input field changes
  const handleChange = async (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value, //update the specific field that changed
    });
  };

  //run when form is submitted
  const handleSubmit = async (e) => {
    e.preventDefault(); //prevent page refresh
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post("/api/books/create-book", formData); //send form data to backend
      setSuccess("Book added successfully!"); //show success message

      //to clear the form after successful submission
      setFormData({
        title: "",
        author: "",
        isbn: "",
        genre: "",
        publisher: "",
        year: "",
        quantity: "",
      });
    } catch (err) {
      setError(
        err.response?.data?.error || "Failed to add book. Please try again.",
      ); //show error message
    } finally {
      setLoading(false); //stop loading
    }
  };

  return (
    <div
      className="container w-full h-screen flex items-center justify-center bg-cover"
      style={{ backgroundImage: `url(${bgimg})` }}
    >
      <div className="w-200 h-160 bg-white/10 border-b-2 border-l-2 border-white/20 rounded-2xl shadow-2xl relative">
        <button className="text-gray-600 font-bold absolute right-4 top-2">
          X
        </button>
        <form
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto p-4 w-full h-full flex flex-col  gap-2 text-white"
        >
          <h2 className="col-span-2 w-full font-bold text-blue-500 text-center font-sans text-2xl">
            Add New Book
          </h2>
          <div className=" w-full py-2">
            {error && <p className="text-red-500 text-center">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
          </div>
          <div>
            <p className="">Title:</p>
            <input
              className="bg-gray-400/40 text-white px-3 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div>
            <p>Author:</p>
            <input
              className="bg-gray-400/40 text-white px-3 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              name="author"
              placeholder="Author"
              value={formData.author}
              onChange={handleChange}
            />
          </div>

          <div>
            <p>Genre:</p>
            <input
              className="bg-gray-400/40 text-white px-3 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              name="genre"
              placeholder="Genre"
              value={formData.genre}
              onChange={handleChange}
            />
          </div>

          <div>
            <p>Publisher:</p>
            <input
              className="bg-gray-400/40 text-white px-3 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              name="publisher"
              placeholder="Publisher"
              value={formData.publisher}
              onChange={handleChange}
            />
          </div>

          <div>
            <p>Publication Year:</p>
            <input
              className="bg-gray-400/40 text-white px-3 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              name="year"
              placeholder="Publication Year"
              value={formData.year}
              onChange={handleChange}
            />
          </div>

          <div>
            <p>Quantity of Books:</p>
            <input
              className="bg-gray-400/40 text-white px-3 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              name="quantity"
              placeholder="Quantity of books"
              value={formData.quantity}
              onChange={handleChange}
            />
          </div>
          <button
            className="bg-blue-500 text-white py-2 px-4 col-span-2 w-full mt-6 rounded-md hover:bg-blue-600"
            type="submit"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddBookForm;
