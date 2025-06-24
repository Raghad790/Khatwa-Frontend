import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // This enables cookie handling
});

// Remove the localStorage token interceptor since we're using cookies
api.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// Enhanced response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && window.location.href !== "/login" ){
      // Optionally attempt token refresh here before redirecting
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
