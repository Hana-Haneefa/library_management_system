import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import axios from "axios";
import bgimg from "../../images/formBg.jpg";
import stimg from "../../images/stform.jpg";

function StudentLogin() {
  const containerRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const navigate = useNavigate();
  const { login } = useAuth();

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
      }, 600);
    });
  }, []);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    //validation
    if (!formData.email.trim()) {
      setError("Email is required");
      setLoading(false);
      return;
    }

    if (!formData.password.trim()) {
      setError("Password is required");
      setLoading(false);
      return;
    }

    //email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      setLoading(false);
      return;
    }
  };

  //run when form submits
  const handleSubmit = async (e) => {
    e.preventDefault(); //prevent page refresh
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post("/api/users/student-login", formData); //send form data to backend

      login(res.data.token, res.data.user); //save token and user together
      navigate("/"); //redirected to home page

      setSuccess("Login successful!"); //show success message

      //clear form data
      setFormData({
        email: "",
        password: "",
      });
    } catch (err) {
      setError(err.response?.data?.error || "Login failed, please try again.");
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
        ref={containerRef}
        className="container flex w-2/3  h-150 bg-white/10 rounded-xl overflow-hidden"
      >
        {/* left side */}
        <div
          ref={leftRef}
          className="left w-1/2 h-full bg-amber-800 rounded-xl bg-cover flex items-center justify-center"
          style={{ backgroundImage: `url(${stimg})` }}
        >
          <div>
            <h2 className="col-span-2 w-full font-bold text-blue-500 text-center font-sans text-2xl">
              Welcome Back!
            </h2>
            <div className="flex gap-4 items-center mt-4 mb-2 opacity-40 line-through">
              <span className="w-4 h-4 rounded-full bg-blue-500 text-white text-sm flex items-center justify-center font-bold">
                1
              </span>
              <p className="text-white">Register the student</p>
            </div>
            <div className="flex gap-4 items-center mt-4 mb-2">
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
            Login
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full ">
            <div className=" w-full py-2">
              {error && <p className="text-red-500 text-center">{error}</p>}
              {success && (
                <p className="text-green-500 text-center">{success}</p>
              )}
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

            <button
              className="bg-blue-500 text-white py-2 px-4 col-span-2 w-full mt-6 rounded-md hover:bg-blue-600"
              type="submit"
              disabled={loading}
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default StudentLogin;
