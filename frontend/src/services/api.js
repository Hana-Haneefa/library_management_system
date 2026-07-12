import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, //my backend url
});

//automatically attack token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  // console.log("Token:", token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

// Add a response interceptor to handle expired tokens
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If the server returns a 401 or 403, the token might be expired or invalid
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      // Optional: Redirect to login or just reload the page to let authContext update
      if (window.location.pathname !== "/student-login" && window.location.pathname !== "/librarian-login" && window.location.pathname !== "/admin-login") {
         window.location.href = "/";
      }
    }
    return Promise.reject(error);
  }
);
