import { useState, useRef, useEffect } from "react";
import axios from "axios";
import bgimg from "../../images/formBg.jpg";
import stimg from "../../images/stform.jpg";

function AddStudentForm() {
  //animation for the form container
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

        right.style.transition = "opacity 0.5s ease, transform 0.5s ease";
        right.style.opacity = "1";
        right.style.transform = "translateX(0)";
      }, 600); //delay to create a staggered effect
    });
  }, []);

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
  const handleChange = (e) => {
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
    <div
      className="w-full h-screen flex items-center justify-center bg-cover px-20"
      style={{ backgroundImage: `url(${bgimg})` }}
    >
      <div
        className="container flex w-2/3  h-150 bg-white/10 rounded-xl overflow-hidden"
        ref={containerRef}
      >
        {/* left side */}
        <div
          ref={leftRef}
          className="left w-1/2 h-full bg-amber-800 rounded-xl bg-cover flex items-center justify-center"
          style={{ backgroundImage: `url(${stimg})` }}
        >
          <div>
            <h2 className="col-span-2 w-full font-bold text-blue-500 text-center font-sans text-2xl">
              Add New Student
            </h2>
            <div className="flex gap-4 items-center mt-4 mb-2">
              <span className="w-4 h-4 rounded-full bg-blue-500 text-white text-sm flex items-center justify-center font-bold">
                1
              </span>
              <p className="text-white">Register the student</p>
            </div>
            <div className="flex gap-4 items-center mt-4 mb-2 opacity-40">
              <span className="w-4 h-4 rounded-full bg-blue-500 text-white text-sm flex items-center justify-center font-bold">
                2
              </span>
              <p className="text-white">Login with credentials</p>
            </div>
          </div>
        </div>
        {/* right side */}
        <div
          ref={rightRef}
          className="right flex flex-col w-1/2 h-full items-center justify-center px-5 text-white/80"
        >
          <h2 className="col-span-2 w-full font-bold text-blue-500 text-center font-sans text-2xl">
            Sign Up
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full ">
            <div className=" w-full py-2">
              {error && <p className="text-red-500 text-center">{error}</p>}
              {success && (
                <p className="text-green-500 text-center">{success}</p>
              )}
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
