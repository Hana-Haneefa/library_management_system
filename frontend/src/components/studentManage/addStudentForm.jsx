import { useState } from "react";
import axios from "axios";

function AddStudentForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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

  //run when form submits
  const handleSubmit = async (e) => {
    e.preventDefault(); //prevent page refresh
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post("/api/users/add-user", formData); //send form data to backend
      setSuccess("Student added successfully!"); //show success message

      //to clear the form after successful submission
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "Failed to add the student, please try again.",
      );
    } finally {
      setLoading(false); //loading
    }
  };
  return (
    <div>
      <div className="main">
        <div className="left"></div>
        <div className="right">
          <form onSubmit={handleSubmit}>
            <h2 className="col-span-2 w-full font-bold text-blue-500 text-center font-sans text-2xl">
              Add New Student
            </h2>
            <div className=" w-full py-2">
              {error && <p className="text-red-500 text-center">{error}</p>}
              {success && <p className="text-green-500">{success}</p>}
            </div>
            <div>
              <p className="">Name:</p>
              <input
                className="bg-gray-400/40 text-white px-3 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div>
              <p>Email Address:</p>
              <input
                className="bg-gray-400/40 text-white px-3 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <p>Password:</p>
              <input
                className="bg-gray-400/40 text-white px-3 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div>
              <p>Confirm Password:</p>
              <input
                className="bg-gray-400/40 text-white px-3 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>

            <button
              className="bg-blue-500 text-white py-2 px-4 col-span-2 w-full mt-6 rounded-md hover:bg-blue-600"
              type="submit"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Student"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddStudentForm;
